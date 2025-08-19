import React, { useState, useEffect, useRef, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ChevronLeft, ChevronRight, Maximize2, X, Download, ZoomIn, ZoomOut, RotateCcw, Move } from "lucide-react";
import { cn } from "@/lib/utils";

const ImageGallery = ({ 
  images = [], 
  title = "", 
  className = "",
  showThumbnails = true,
  showControls = true,
  showFullscreenButton = true,
  showDownloadButton = false,
  aspectRatio = "aspect-video" // aspect-video, aspect-square, aspect-[4/3], etc.
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [fullscreenLoading, setFullscreenLoading] = useState(false);
  
  // Zoom and pan state
  const [zoom, setZoom] = useState(1);
  const [panX, setPanX] = useState(1);
  const [panY, setPanY] = useState(1);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [showThumbnailStrip, setShowThumbnailStrip] = useState(false);
  
  // Refs
  const fullscreenImageRef = useRef(null);
  const touchStartRef = useRef({ x: 0, y: 0, time: 0 });
  const lastTouchDistance = useRef(0);

  // Enhanced keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isFullscreen) return;
      
      switch (e.key) {
        case "ArrowLeft":
          e.preventDefault();
          prevImage();
          break;
        case "ArrowRight":
          e.preventDefault();
          nextImage();
          break;
        case "Escape":
          e.preventDefault();
          closeFullscreen();
          break;
        case " ": // Spacebar
          e.preventDefault();
          nextImage();
          break;
        case "Home":
          e.preventDefault();
          setCurrentIndex(0);
          break;
        case "End":
          e.preventDefault();
          setCurrentIndex(images.length - 1);
          break;
        case "+":
        case "=":
          e.preventDefault();
          zoomIn();
          break;
        case "-":
          e.preventDefault();
          zoomOut();
          break;
        case "0":
          e.preventDefault();
          resetZoom();
          break;
        case "t":
        case "T":
          e.preventDefault();
          setShowThumbnailStrip(!showThumbnailStrip);
          break;
        case "d":
        case "D":
         


          break;
        default:
          // Number keys for direct navigation
          if (e.key >= "1" && e.key <= "9") {
            const index = parseInt(e.key) - 1;
            if (index < images.length) {
              e.preventDefault();
              setCurrentIndex(index);
            }
          }
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isFullscreen, currentIndex, showThumbnailStrip, zoom, showDownloadButton]);

  // Prevent body scroll when fullscreen
  useEffect(() => {
    if (isFullscreen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isFullscreen]);

  const nextImage = useCallback(() => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      resetZoom();
    }
  }, [images.length]);

  const prevImage = useCallback(() => {
    if (images.length > 1) {
      setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      resetZoom();
    }
  }, [images.length]);

  const openFullscreen = () => {
    setIsFullscreen(true);
    setFullscreenLoading(true);
  };

  const closeFullscreen = () => {
    setIsFullscreen(false);
    resetZoom();
    setShowThumbnailStrip(false);
  };

  // Zoom functions
  const zoomIn = () => {
    setZoom(prev => Math.min(prev * 1.5, 5));
  };

  const zoomOut = () => {
    setZoom(prev => Math.max(prev / 1.5, 0.5));
  };

  const resetZoom = () => {
    setZoom(1);
    setPanX(0);
    setPanY(0);
  };

  // Mouse wheel zoom
  const handleWheel = useCallback((e) => {
    if (!isFullscreen) return;
    e.preventDefault();
    
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setZoom(prev => Math.min(Math.max(prev * delta, 0.5), 5));
  }, [isFullscreen]);

  // Mouse drag for panning
  const handleMouseDown = (e) => {
    // if (zoom <= 1) return;
    setIsDragging(true);
    setDragStart({ x: e.clientX - panX, y: e.clientY - panY });
  };

  const handleMouseMove = useCallback((e) => {
    // if (!isDragging || zoom <= 1) return;
    if (!isDragging) return;
    setPanX(e.clientX - dragStart.x);
    setPanY(e.clientY - dragStart.y);
  }, [isDragging, dragStart]);

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Touch gestures
  const handleTouchStart = (e) => {
    const touch = e.touches[0];
    touchStartRef.current = {
      x: touch.clientX,
      y: touch.clientY,
      time: Date.now()
    };

    if (e.touches.length === 2) {
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      lastTouchDistance.current = distance;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 2) {
      // Pinch to zoom
      e.preventDefault();
      const touch1 = e.touches[0];
      const touch2 = e.touches[1];
      const distance = Math.sqrt(
        Math.pow(touch2.clientX - touch1.clientX, 2) +
        Math.pow(touch2.clientY - touch1.clientY, 2)
      );
      
      const scale = distance / lastTouchDistance.current;
      setZoom(prev => Math.min(Math.max(prev * scale, 0.5), 5));
      lastTouchDistance.current = distance;
    }  else if (e.touches.length === 1) {
      // Pan when zoomed
      const touch = e.touches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      setPanX(prev => prev + deltaX * 0.5);
      setPanY(prev => prev + deltaY * 0.5);
      touchStartRef.current = { x: touch.clientX, y: touch.clientY, time: touchStartRef.current.time };
    }
  };

  const handleTouchEnd = (e) => {
    if (e.changedTouches.length === 1 && zoom <= 1) {
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartRef.current.x;
      const deltaY = touch.clientY - touchStartRef.current.y;
      const deltaTime = Date.now() - touchStartRef.current.time;
      
      // Swipe detection
      if (Math.abs(deltaX) > 50 && deltaTime < 300) {
        if (deltaX > 0) {
          prevImage();
        } else {
          nextImage();
        }
      }
      
      // Tap to toggle thumbnail strip
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10 && deltaTime < 200) {
        setShowThumbnailStrip(!showThumbnailStrip);
      }
    }
  };

  const handleImageLoad = () => {
    setIsLoading(false);
  };

  const handleImageError = () => {
    setIsLoading(false);
  };

  const handleFullscreenImageLoad = () => {
    setFullscreenLoading(false);
  };

  const handleFullscreenImageError = () => {
    setFullscreenLoading(false);
  };

  // const downloadImage = async () => {
  //   try {
  //     const response = await fetch(images[currentIndex]);
  //     const blob = await response.blob();
  //     const url = window.URL.createObjectURL(blob);
  //     const link = document.createElement('a');
  //     link.href = url;
  //     link.download = `${title || 'image'}-${currentIndex + 1}.jpg`;
  //     document.body.appendChild(link);
  //     link.click();
  //     document.body.removeChild(link);
  //     window.URL.revokeObjectURL(url);
  //   } catch (error) {
  //     console.error('Error downloading image:', error);
  //   }
  // };

  if (!images.length) {
    return (
      <div className={cn("flex items-center justify-center bg-muted rounded-lg", aspectRatio, className)}>
        <p className="text-muted-foreground">No images available</p>
      </div>
    );
  }

  return (
    <>
      {/* Main Gallery */}
      <div className={cn("relative", className)}>
        <Card className="overflow-hidden">
          <div className={cn("relative bg-muted", aspectRatio)}>
            {/* Loading State */}
            {isLoading && (
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-purple-600"></div>
              </div>
            )}

            {/* Main Image */}
            <img
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="w-full h-full object-cover cursor-pointer"
              onClick={openFullscreen}
              onLoad={handleImageLoad}
              onError={handleImageError}
            />

            {/* Navigation Controls */}
            {showControls && images.length > 1 && (
              <>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
                  onClick={prevImage}
                >
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 opacity-80 hover:opacity-100"
                  onClick={nextImage}
                >
                  <ChevronRight className="size-4" />
                </Button>
              </>
            )}

            {/* Action Buttons */}
            <div className="absolute top-4 right-4 flex gap-2">
              {/* {showDownloadButton && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="opacity-80 hover:opacity-100"
                  onClick={downloadImage}
                >
                  <Download className="size-4" />
                </Button>
              )} */}
              {showFullscreenButton && (
                <Button
                  variant="secondary"
                  size="sm"
                  className="opacity-80 hover:opacity-100"
                  onClick={openFullscreen}
                >
                  <Maximize2 className="size-4" />
                </Button>
              )}
            </div>

            {/* Image Counter */}
            {images.length > 1 && (
              <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                {currentIndex + 1} / {images.length}
              </div>
            )}
          </div>
        </Card>

        {/* Thumbnail Navigation */}
        {showThumbnails && images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                className={cn(
                  "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all",
                  index === currentIndex 
                    ? "border-purple-600 ring-2 ring-purple-200" 
                    : "border-transparent hover:border-gray-300"
                )}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}

        {/* Dot Indicators (alternative to thumbnails) */}
        {!showThumbnails && images.length > 1 && (
          <div className="flex justify-center mt-4 space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={cn(
                  "w-2 h-2 rounded-full transition-colors",
                  index === currentIndex ? "bg-purple-600" : "bg-muted hover:bg-muted-foreground/50"
                )}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Enhanced Fullscreen Modal */}
      {isFullscreen && (
        <div 
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center overflow-hidden"
          onWheel={handleWheel}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Loading State */}
          {fullscreenLoading && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
            </div>
          )}

          {/* Top Controls */}
          <div className="absolute top-4 left-4 right-4 flex justify-between items-center z-10">
            <div className="flex items-center gap-2">
              {/* Zoom Controls */}
              <div className="flex items-center gap-1 bg-black/50 rounded-lg p-1">
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  onClick={zoomOut}
                  disabled={zoom <= 0.5}
                >
                  <ZoomOut className="size-4" />
                </Button>
                <span className="text-white text-sm px-2 min-w-[3rem] text-center">
                  {Math.round(zoom * 100)}%
                </span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  onClick={zoomIn}
                  disabled={zoom >= 5}
                >
                  <ZoomIn className="size-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20 h-8 w-8 p-0"
                  onClick={resetZoom}
                  disabled={zoom === 1 && panX === 0 && panY === 0}
                >
                  <RotateCcw className="size-4" />
                </Button>
              </div>

              {/* Pan Indicator */}
              {zoom > 1 && (
                <div className="flex items-center gap-1 bg-black/50 rounded-lg px-2 py-1">
                  <Move className="size-4 text-white" />
                  <span className="text-white text-sm">Drag to pan</span>
                </div>
              )}
            </div>

            <div className="flex items-center gap-2">
              {/* Download Button */}
              {/* {showDownloadButton && (
                <Button
                  variant="ghost"
                  size="sm"
                  className="text-white hover:bg-white/20"
                  onClick={downloadImage}
                >
                  <Download className="size-5" />
                </Button>
              )} */}

              {/* Close Button */}
              <Button
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white/20"
                onClick={closeFullscreen}
              >
                <X className="size-6" />
              </Button>
            </div>
          </div>

          {/* Navigation in Fullscreen */}
          {images.length > 1 && (
            <>
              <Button
                variant="ghost"
                size="sm"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
                onClick={prevImage}
              >
                <ChevronLeft className="size-8" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:bg-white/20 z-10"
                onClick={nextImage}
              >
                <ChevronRight className="size-8" />
              </Button>
            </>
          )}

          {/* Fullscreen Image Container */}
          <div 
            className="relative flex items-center justify-center w-full h-full"
            style={{
             cursor: isDragging ? 'grabbing' : 'grab'
            }}
          >
            <img
              ref={fullscreenImageRef}
              src={images[currentIndex]}
              alt={`${title} - Image ${currentIndex + 1}`}
              className="max-w-full max-h-full object-contain transition-transform duration-200 ease-out"
              style={{
                transform: `scale(${zoom}) translate(${panX / zoom}px, ${panY / zoom}px)`,
                transformOrigin: 'center center'
              }}
              onLoad={handleFullscreenImageLoad}
              onError={handleFullscreenImageError}
              onMouseDown={handleMouseDown}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
              draggable={false}
            />
          </div>

          {/* Thumbnail Strip */}
          {showThumbnailStrip && images.length > 1 && (
            <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-10">
              <div className="flex items-center gap-2 bg-black/70 rounded-lg p-2 max-w-screen-lg overflow-x-auto">
                {images.map((image, index) => (
                  <button
                    key={index}
                    className={cn(
                      "flex-shrink-0 w-12 h-12 rounded overflow-hidden border-2 transition-all",
                      index === currentIndex 
                        ? "border-white ring-2 ring-white/50" 
                        : "border-transparent hover:border-white/50"
                    )}
                    onClick={() => {
                      setCurrentIndex(index);
                      resetZoom();
                    }}
                  >
                    <img
                      src={image}
                      alt={`Thumbnail ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Image Info and Controls */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center z-10">
            <div className="bg-black/50 rounded-lg px-4 py-2">
              <p className="text-lg font-medium">{title}</p>
              <div className="flex items-center justify-center gap-4 mt-1">
                {images.length > 1 && (
                  <p className="text-sm opacity-80">
                    {currentIndex + 1} of {images.length}
                  </p>
                )}
                <button
                  onClick={() => setShowThumbnailStrip(!showThumbnailStrip)}
                  className="text-sm opacity-80 hover:opacity-100 underline"
                >
                  {showThumbnailStrip ? 'Hide' : 'Show'} thumbnails (T)
                </button>
              </div>
              <div className="text-xs opacity-60 mt-1">
                Use arrow keys, mouse wheel to zoom, or swipe on mobile
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ImageGallery;