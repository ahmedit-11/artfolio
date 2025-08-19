import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2, SkipBack, SkipForward, Settings, Download } from "lucide-react";
import { cn } from "@/lib/utils";

const VideoPlayer = ({ videoUrl, title, autoPlay = false, showDownload = false }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [showSpeedMenu, setShowSpeedMenu] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const [buffered, setBuffered] = useState(0);
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const controlsTimeoutRef = useRef(null);

  // Auto-hide controls
  const resetControlsTimeout = () => {
    if (controlsTimeoutRef.current) {
      clearTimeout(controlsTimeoutRef.current);
    }
    setShowControls(true);
    if (isPlaying) {
      controlsTimeoutRef.current = setTimeout(() => {
        setShowControls(false);
      }, 3000);
    }
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!videoRef.current) return;
      
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
        case 'f':
          e.preventDefault();
          handleFullscreen();
          break;
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
      resetControlsTimeout();
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      const newMuted = !isMuted;
      videoRef.current.muted = newMuted;
      setIsMuted(newMuted);
      resetControlsTimeout();
    }
  };

  const adjustVolume = (delta) => {
    if (videoRef.current) {
      const newVolume = Math.max(0, Math.min(1, volume + delta));
      setVolume(newVolume);
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleVolumeChange = (value) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
      if (newVolume === 0) {
        setIsMuted(true);
        videoRef.current.muted = true;
      } else if (isMuted) {
        setIsMuted(false);
        videoRef.current.muted = false;
      }
    }
  };

  const handleFullscreen = () => {
    if (containerRef.current) {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          containerRef.current.webkitRequestFullscreen();
        } else if (containerRef.current.msRequestFullscreen) {
          containerRef.current.msRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
          document.msExitFullscreen();
        }
      }
    }
  };

  const skipForward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.min(duration, currentTime + 10);
      resetControlsTimeout();
    }
  };

  const skipBackward = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = Math.max(0, currentTime - 10);
      resetControlsTimeout();
    }
  };

  const changePlaybackRate = (rate) => {
    if (videoRef.current) {
      videoRef.current.playbackRate = rate;
      setPlaybackRate(rate);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
      
      // Update buffered progress
      const bufferedEnd = videoRef.current.buffered.length > 0 
        ? videoRef.current.buffered.end(videoRef.current.buffered.length - 1)
        : 0;
      setBuffered((bufferedEnd / duration) * 100);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
      setIsLoading(false);
      if (autoPlay) {
        videoRef.current.play();
      }
    }
  };

  const handleSeek = (value) => {
    if (videoRef.current) {
      const seekTime = (value[0] / 100) * duration;
      videoRef.current.currentTime = seekTime;
      setCurrentTime(seekTime);
    }
  };

  const handleMouseMove = () => {
    resetControlsTimeout();
  };

  // const downloadVideo = async () => {
  //   try {
  //     const response = await fetch(videoUrl);
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = `${title || 'video'}.mp4`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Error downloading video:', error);
  //   }
  // };

  // Fullscreen change listener
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    document.addEventListener('fullscreenchange', handleFullscreenChange);
    document.addEventListener('webkitfullscreenchange', handleFullscreenChange);
    document.addEventListener('msfullscreenchange', handleFullscreenChange);
    
    return () => {
      document.removeEventListener('fullscreenchange', handleFullscreenChange);
      document.removeEventListener('webkitfullscreenchange', handleFullscreenChange);
      document.removeEventListener('msfullscreenchange', handleFullscreenChange);
    };
  }, []);

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
      <div 
        ref={containerRef}
        className="relative aspect-video bg-black group"
        onMouseMove={handleMouseMove}
        onMouseLeave={() => isPlaying && setShowControls(false)}
      >
        {/* Loading Spinner */}
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black/50">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
          </div>
        )}

        <video
          ref={videoRef}
          className="w-full h-full object-cover pointer-events-none"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => { setIsPlaying(true); resetControlsTimeout(); }}
          onPause={() => { setIsPlaying(false); setShowControls(true); }}
          onEnded={() => { setIsPlaying(false); setShowControls(true); }}
          onWaiting={() => setIsLoading(true)}
          onCanPlay={() => setIsLoading(false)}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls Overlay */}
        <div 
          className={cn(
            "absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/30 transition-opacity duration-300",
            showControls ? "opacity-100" : "opacity-0"
          )}
          onClick={handlePlayPause}
        >
          {/* Top controls */}
          <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
            <div className="text-white">
              <h3 className="font-medium truncate">{title}</h3>
            </div>
            <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
              {/* {showDownload && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={downloadVideo}
                  className="text-white hover:bg-white/20"
                >
                  <Download className="size-5" />
                </Button>
              )} */}
              <div className="relative z-50">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setShowSpeedMenu(!showSpeedMenu);
                  }}
                  className="text-white hover:bg-white/20"
                >
                  <Settings className="size-5" />
                </Button>
                {/* Playback speed menu */}
                {showSpeedMenu && (
                  <div className="absolute top-full right-0 mt-2 bg-black/90 rounded-lg p-2 z-50">
                    {[0.5, 0.75, 1, 1.25, 1.5, 2].map(rate => (
                      <button
                        key={rate}
                        onClick={() => {
                          changePlaybackRate(rate);
                          setShowSpeedMenu(false);
                        }}
                        className={cn(
                          "block w-full text-left px-3 py-1 text-sm text-white hover:bg-white/20 rounded",
                          playbackRate === rate && "bg-white/20"
                        )}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Center play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="size-20 rounded-full bg-black/50 text-white hover:bg-black/70 transition-all"
            >
              {isPlaying ? <Pause className="size-10" /> : <Play className="size-10" />}
            </Button>
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-4 left-4 right-4">
            {/* Progress bar */}
            <div className="mb-4">
              <div className="relative">
                {/* Buffered progress */}
                <div className="absolute inset-0 bg-white/30 rounded-full h-1">
                  <div 
                    className="h-full bg-white/50 rounded-full transition-all"
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
            </div>

            {/* Controls bar */}
            <div className="flex items-center justify-between text-white">
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={skipBackward}
                  className="text-white hover:bg-white/20"
                >
                  <SkipBack className="size-5" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayPause}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="size-5" /> : <Play className="size-5" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={skipForward}
                  className="text-white hover:bg-white/20"
                >
                  <SkipForward className="size-5" />
                </Button>
                
                {/* Volume control */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={handleMute}
                    className="text-white hover:bg-white/20"
                  >
                    {isMuted || volume === 0 ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
                  </Button>
                  <div className="w-20">
                    <Slider
                      value={[isMuted ? 0 : volume * 100]}
                      onValueChange={(value) => handleVolumeChange([value[0] / 100])}
                      max={100}
                      step={1}
                    />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-sm font-mono">
                  {formatTime(currentTime)} / {formatTime(duration)}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handleFullscreen}
                  className="text-white hover:bg-white/20"
                >
                  {isFullscreen ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default VideoPlayer;