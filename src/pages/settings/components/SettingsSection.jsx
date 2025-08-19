import React from "react";
import { Card } from "@/components/ui/card";

const SettingsSection = ({ icon: Icon, title, description, children }) => (
  <Card className="p-6 mb-6">
    <div className="flex items-start space-x-4">
      <div className="p-2 rounded-lg bg-purple-100 dark:bg-purple-900/20">
        <Icon className="size-6 text-purple-600 dark:text-purple-400" />
      </div>
      <div className="flex-1">
        <h3 className="text-lg font-semibold mb-1">{title}</h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        {children}
      </div>
    </div>
  </Card>
);

export default SettingsSection;
