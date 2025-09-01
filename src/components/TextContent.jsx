import React, { useState } from "react";
import { createPortal } from "react-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Type, Palette, Eye, Download, Contrast } from "lucide-react";
import { cn } from "@/lib/utils";

const TextContent = ({ content, title, estimatedReadTime = "5 min read" }) => {
  const [fontSize, setFontSize] = useState("medium");
  const [theme, setTheme] = useState("default");
  const [isReaderMode, setIsReaderMode] = useState(false);

  const fontSizeClasses = {
    small: "text-sm leading-relaxed",
    medium: "text-base leading-relaxed",
    large: "text-lg leading-relaxed",
    xlarge: "text-xl leading-relaxed"
  };

  const themeClasses = {
    default: "prose-gray dark:prose-invert",
    // sepia: "prose-amber bg-amber-50 dark:bg-amber-950/20",
    night: "prose-slate bg-slate-900 text-slate-100",
    high_contrast: "prose-stone bg-white text-black dark:bg-black dark:text-white"
  };

  // const downloadAsText = () => {
  //   const textContent = content.replace(/<[^>]*>/g, '').replace(/\s+/g, ' ').trim();
  //   const blob = new Blob([textContent], { type: 'text/plain' });
  //   const url = window.URL.createObjectURL(blob);
  //   const link = document.createElement('a');
  //   link.href = url;
  //   link.download = `${title || 'content'}.txt`;
  //   document.body.appendChild(link);
  //   link.click();
  //   document.body.removeChild(link);
  //   window.URL.revokeObjectURL(url);
  // };

  return (
    <div className="space-y-4">
      {/* Reading Controls */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <BookOpen className="size-4" />
            <span>{estimatedReadTime}</span>
          </div> */}
          
          <div className="flex items-center gap-2">
            {/* Font Size Control */}
            <div className="flex items-center gap-1 border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize("small")}
                className={cn(
                  "px-2 py-1 text-xs",
                  fontSize === "small" && "bg-accent"
                )}
              >
                A
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize("medium")}
                className={cn(
                  "px-2 py-1 text-sm",
                  fontSize === "medium" && "bg-accent"
                )}
              >
                A
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize("large")}
                className={cn(
                  "px-2 py-1",
                  fontSize === "large" && "bg-accent"
                )}
              >
                A
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setFontSize("xlarge")}
                className={cn(
                  "px-2 py-1 text-lg",
                  fontSize === "xlarge" && "bg-accent"
                )}
              >
                A
              </Button>
            </div>

            {/* Theme Control */}
            <div className="flex items-center gap-1 border rounded-md">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme("default")}
                className={cn(
                  "px-2 py-1",
                  theme === "default" && "bg-accent"
                )}
                title="Default"
              >
                <Type className="size-4" />
              </Button>
            
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme("night")}
                className={cn(
                  "px-2 py-1 text-blue-600",
                  theme === "night" && "bg-accent"
                )}
                title="Night Mode"
              >
                <Eye className="size-4 " />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setTheme("high_contrast")}
                className={cn(
                  "px-2 py-1",
                  theme === "high_contrast" && "bg-accent"
                )}
                title="High Contrast"
              >
                <Contrast className="size-4" />
              </Button>
            </div>

            {/* Reader Mode Toggle */}
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsReaderMode(!isReaderMode)}
              className={cn(
                "px-3 py-1",
                isReaderMode && "bg-accent"
              )}
              title="Reader Mode"
            >
              <BookOpen className="size-4 mr-1" />
              Reader
            </Button>

            {/* Download Button */}
            {/* <Button
              variant="ghost"
              size="sm"
              onClick={downloadAsText}
              className="px-3 py-1"
              title="Download as Text"
            >
              <Download className="size-4" />
            </Button> */}
          </div>
        </div>
      </Card>

      {/* Content */}
      {isReaderMode ? 
        createPortal(
          <div className="fixed inset-0 z-[9999] bg-background overflow-y-auto" style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}>
            <div className="min-h-screen w-full flex flex-col">
              {/* Fullscreen Controls (sticky) */}
              <div className="w-full sticky top-0 z-[10000] p-4 bg-background border-b shadow-sm">
              <Card className="p-4">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  {/* <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <BookOpen className="size-4" />
                    <span>{estimatedReadTime}</span>
                  </div> */}

                  <div className="flex items-center gap-2">
                    {/* Font Size Control */}
                    <div className="flex items-center gap-1 border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFontSize("small")}
                        className={cn(
                          "px-2 py-1 text-xs",
                          fontSize === "small" && "bg-accent"
                        )}
                      >
                        A
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFontSize("medium")}
                        className={cn(
                          "px-2 py-1 text-sm",
                          fontSize === "medium" && "bg-accent"
                        )}
                      >
                        A
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFontSize("large")}
                        className={cn(
                          "px-2 py-1",
                          fontSize === "large" && "bg-accent"
                        )}
                      >
                        A
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFontSize("xlarge")}
                        className={cn(
                          "px-2 py-1 text-lg",
                          fontSize === "xlarge" && "bg-accent"
                        )}
                      >
                        A
                      </Button>
                    </div>

                    {/* Theme Control */}
                    <div className="flex items-center gap-1 border rounded-md">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme("default")}
                        className={cn(
                          "px-2 py-1",
                          theme === "default" && "bg-accent"
                        )}
                        title="Default"
                      >
                        <Type className="size-4" />
                      </Button>
                    
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme("night")}
                        className={cn(
                          "px-2 py-1 text-blue-600",
                          theme === "night" && "bg-accent"
                        )}
                        title="Night Mode"
                      >
                        <Eye className="size-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setTheme("high_contrast")}
                        className={cn(
                          "px-2 py-1",
                          theme === "high_contrast" && "bg-accent"
                        )}
                        title="High Contrast"
                      >
                        <Contrast className="size-4" />
                      </Button>
                    </div>

                    {/* Exit Reader */}
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsReaderMode(false)}
                      className="px-3 py-1"
                    >
                      Exit Reader
                    </Button>

                    {/* Download Button */}
                    {/* <Button
                      variant="ghost"
                      size="sm"
                      onClick={downloadAsText}
                      className="px-3 py-1"
                      title="Download as Text"
                    >
                      <Download className="size-4" />
                    </Button> */}
                  </div>
                </div>
              </Card>
            </div>
            <div className="flex-1 flex justify-center px-4 py-6">
              <Card className={cn(
                "relative w-full max-w-4xl",
                themeClasses[theme]
              )}>
                <div className={cn(
                  "p-8 md:px-12 md:py-12"
                )}>
                  <div 
                    className={cn(
                      "prose max-w-none",
                      fontSizeClasses[fontSize],
                      themeClasses[theme],
                      "prose-lg leading-loose",
                      // Enhanced typography
                      "prose-headings:font-bold prose-headings:tracking-tight",
                      "prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-0",
                      "prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-8",
                      "prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6",
                      "prose-p:mb-6 prose-p:leading-relaxed",
                      "prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-6 prose-blockquote:italic",
                      "prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm",
                      "prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg",
                      "prose-ul:mb-6 prose-ol:mb-6",
                      "prose-li:mb-2",
                      "prose-strong:font-semibold prose-strong:text-foreground",
                      "prose-em:italic prose-em:text-muted-foreground"
                    )}
                    dangerouslySetInnerHTML={{ __html: content }}
                  />
                </div>
              </Card>
            </div>
          </div>
        </div>,
        document.body
      ) : (
        <Card className={cn(
          "transition-all duration-300 relative w-full",
          themeClasses[theme]
        )}>
          <div className={cn(
            "p-8",
            isReaderMode && "px-12 py-12"
          )}>
            <div 
              className={cn(
                "prose max-w-none",
                fontSizeClasses[fontSize],
                themeClasses[theme],
                // Enhanced typography
                "prose-headings:font-bold prose-headings:tracking-tight",
                "prose-h1:text-3xl prose-h1:mb-8 prose-h1:mt-0",
                "prose-h2:text-2xl prose-h2:mb-6 prose-h2:mt-8",
                "prose-h3:text-xl prose-h3:mb-4 prose-h3:mt-6",
                "prose-p:mb-6 prose-p:leading-relaxed",
                "prose-blockquote:border-l-4 prose-blockquote:border-purple-500 prose-blockquote:pl-6 prose-blockquote:italic",
                "prose-code:bg-muted prose-code:px-2 prose-code:py-1 prose-code:rounded prose-code:text-sm",
                "prose-pre:bg-muted prose-pre:border prose-pre:rounded-lg",
                "prose-ul:mb-6 prose-ol:mb-6",
                "prose-li:mb-2",
                "prose-strong:font-semibold prose-strong:text-foreground",
                "prose-em:italic prose-em:text-muted-foreground"
              )}
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </div>
        </Card>
      )}
    </div>
  );
};

export default TextContent; 