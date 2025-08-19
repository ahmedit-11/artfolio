import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward, Repeat, Shuffle, Download, Music } from "lucide-react";
import { cn } from "@/lib/utils";

const AudioPlayer = ({ 
  audioUrl, 
  title, 
  artist = "Unknown Artist", 
  cover = null,
  autoPlay = false, 
  showDownload = false 
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const [isRepeat, setIsRepeat] = useState(false);
  const [isShuffle, setIsShuffle] = useState(false);
  const audioRef = useRef(null);

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!audioRef.current) return;
      
      switch (e.key) {
        case ' ':
        case 'k':
          e.preventDefault();
          handlePlayPause();
          break;
        case 'ArrowLeft':
          e.preventDefault();
          skipBackward();
          break;
        case 'ArrowRight':
          e.preventDefault();
          skipForward();
          break;
        case 'ArrowUp':
          e.preventDefault();
          adjustVolume(0.1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          adjustVolume(-0.1);
          break;
        case 'm':
          e.preventDefault();
          handleMute();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (audioRef.current) {
      const newMuted = !isMuted;
      audioRef.current.muted = newMuted;
      setIsMuted(newMuted);
    }
  };

  const adjustVolume = (delta) => {
    if (audioRef.current) {
      const newVolume = Math.max(0, Math.min(1, volume + delta));
      setVolume(newVolume);
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
        audioRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        audioRef.current.muted = false;
      }
    }
  };

  const skipForward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.min(duration, currentTime + 10);
    }
  };

  const skipBackward = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = Math.max(0, currentTime - 10);
    }
  };

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
      
      // Update buffered progress
      const bufferedEnd = audioRef.current.buffered.length > 0 
        ? audioRef.current.buffered.end(audioRef.current.buffered.length - 1)
        : 0;
      setBuffered((bufferedEnd / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setDuration(audioRef.current.duration);
      setIsLoading(false);
      if (autoPlay) {
        audioRef.current.play();
      }
    }
  };

  const handleSeek = (value) => {
    if (audioRef.current) {
      const seekTime = (value[0] / 100) * duration;
      audioRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const downloadAudio = async () => {
    try {
      const response = await fetch(audioUrl);
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${title || 'audio'}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error downloading audio:', error);
    }
  };

  const formatTime = (time) => {
    if (!time || isNaN(time)) return '0:00';
    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);
    
    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="overflow-hidden">
      <div className="p-6">
        {/* Audio element */}
        <audio
          ref={audioRef}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => {
            setIsPlaying(false);
            if (isRepeat) {
              audioRef.current.currentTime = 0;
              audioRef.current.play();
            }
          }}
          onWaiting={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
          loop={isRepeat}
        >
          <source src={audioUrl} type="audio/mpeg" />
          <source src={audioUrl} type="audio/wav" />
          Your browser does not support the audio tag.
        </audio>

        {/* Track Info */}
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            {cover ? (
              <img 
                src={cover} 
                alt={title}
                className="w-16 h-16 rounded-lg object-cover"
              />
            ) : (
              <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center">
                <Music className="size-8 text-white" />
              </div>
            )}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-lg">
                <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
              </div>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{title}</h3>
            <p className="text-sm text-muted-foreground truncate">{artist}</p>
          </div>
          {showDownload && (
            <Button
              variant="ghost"
              size="icon"
              onClick={downloadAudio}
              className="text-muted-foreground hover:text-foreground"
            >
              <Download className="size-4" />
            </Button>
          )}
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <div className="relative mb-2">
            {/* Buffered progress */}
            <div className="absolute inset-0 bg-muted rounded-full h-2">
              <div 
                className="h-full bg-muted-foreground/30 rounded-full transition-all"
                style={{ width: `${buffered}%` }}
              />
            </div>
            {/* Progress slider */}
            <Slider
              value={[duration ? (currentTime / duration) * 100 : 0]}
              onValueChange={handleSeek}
              max={100}
              step={0.1}
              className="relative"
            />
          </div>
          <div className="flex justify-between text-sm text-muted-foreground">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-4 mb-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsShuffle(!isShuffle)}
            className={cn(
              "text-muted-foreground hover:text-foreground",
              isShuffle && "text-purple-600"
            )}
          >
            <Shuffle className="size-4" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={skipBackward}
            className="text-muted-foreground hover:text-foreground"
          >
            <SkipBack className="size-5" />
          </Button>
          
          <Button
            onClick={handlePlayPause}
            className="size-12 rounded-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            {isPlaying ? <Pause className="size-6" /> : <Play className="size-6" />}
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={skipForward}
            className="text-muted-foreground hover:text-foreground"
          >
            <SkipForward className="size-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsRepeat(!isRepeat)}
            className={cn(
              "text-muted-foreground hover:text-foreground",
              isRepeat && "text-purple-600"
            )}
          >
            <Repeat className="size-4" />
          </Button>
        </div>

        {/* Volume Control */}
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="ghost"
            size="icon"
            onClick={handleMute}
            className="text-muted-foreground hover:text-foreground"
          >
            {isMuted || volume === 0 ? <VolumeX className="size-4" /> : <Volume2 className="size-4" />}
          </Button>
          <div className="w-24">
            <Slider
              value={[isMuted ? 0 : volume * 100]}
              onValueChange={(value) => handleVolumeChange([value[0] / 100])}
              max={100}
              step={1}
            />
          </div>
          <span className="text-xs text-muted-foreground w-8 text-center">
            {Math.round((isMuted ? 0 : volume) * 100)}%
          </span>
        </div>
      </div>
    </Card>
  );
};

export default AudioPlayer;
