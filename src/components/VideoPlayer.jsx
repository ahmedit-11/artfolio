import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Play, Pause, Volume2, VolumeX, Maximize2, Minimize2 } from "lucide-react";
import { cn } from "@/lib/utils";

const VideoPlayer = ({ videoUrl, title }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const videoRef = useRef(null);

  const handlePlayPause = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted;
      setIsMuted(!isMuted);
    }
  };

  const handleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        if (videoRef.current.requestFullscreen) {
          videoRef.current.requestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          document.exitFullscreen();
        }
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const handleTimeUpdate = () => {
    if (videoRef.current) {
      setCurrentTime(videoRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (videoRef.current) {
      setDuration(videoRef.current.duration);
    }
  };

  const handleSeek = (e) => {
    if (videoRef.current) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const width = rect.width;
      const seekTime = (clickX / width) * duration;
      videoRef.current.currentTime = seekTime;
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video bg-black">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onPlay={() => setIsPlaying(true)}
          onPause={() => setIsPlaying(false)}
          onEnded={() => setIsPlaying(false)}
        >
          <source src={videoUrl} type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        {/* Video Controls Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity">
          {/* Top controls */}
          <div className="absolute top-4 right-4 flex items-center gap-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleMute}
              className="text-white hover:bg-white/20"
            >
              {isMuted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleFullscreen}
              className="text-white hover:bg-white/20"
            >
              {isFullscreen ? <Minimize2 className="size-5" /> : <Maximize2 className="size-5" />}
            </Button>
          </div>

          {/* Center play button */}
          <div className="absolute inset-0 flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePlayPause}
              className="size-16 rounded-full bg-black/50 text-white hover:bg-black/70"
            >
              {isPlaying ? <Pause className="size-8" /> : <Play className="size-8" />}
            </Button>
          </div>

          {/* Bottom controls */}
          <div className="absolute bottom-4 left-4 right-4">
            {/* Progress bar */}
            <div
              className="w-full h-1 bg-white/30 rounded-full cursor-pointer mb-2"
              onClick={handleSeek}
            >
              <div
                className="h-full bg-white rounded-full transition-all"
                style={{ width: `${(currentTime / duration) * 100}%` }}
              />
            </div>

            {/* Time and controls */}
            <div className="flex items-center justify-between text-white text-sm">
              <span>{formatTime(currentTime)} / {formatTime(duration)}</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={handlePlayPause}
                  className="text-white hover:bg-white/20"
                >
                  {isPlaying ? <Pause className="size-4" /> : <Play className="size-4" />}
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