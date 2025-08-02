import React from "react";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TextContent = ({ content }) => {
  // Parse HTML content and render it safely
  const createMarkup = (htmlContent) => {
    return { __html: htmlContent };
  };

  return (
    <div className="space-y-6">
      <Card className="p-6 prose dark:prose-invert max-w-none">
        <div 
          className="text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={createMarkup(content)}
        />
      </Card>
    </div>
  );
};

export default TextContent; 