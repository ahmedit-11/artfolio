import React, { useState } from "react";
import { X, Flag, AlertTriangle, Circle, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { toast } from "react-toastify";
import { createReportThunk } from "@/store/reportt/thunk/createReport";
import { useDispatch } from "react-redux";
const ReportModal = ({ isOpen, onClose, portfolioId, portfolioTitle }) => {
  const [selectedReason, setSelectedReason] = useState("");
  const [customReason, setCustomReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const dispatch = useDispatch()
  const reportReasons = [
    { id: "inappropriate", label: "Inappropriate Content", description: "Contains offensive or inappropriate material" },
    { id: "copyright", label: "Copyright Violation", description: "Uses copyrighted material without permission" },
    { id: "spam", label: "Spam or Misleading", description: "Spam content or misleading information" },
    { id: "harassment", label: "Harassment or Bullying", description: "Contains harassing or bullying content" },
    { id: "violence", label: "Violence or Harmful Content", description: "Promotes violence or harmful activities" },
    { id: "adult", label: "Adult Content", description: "Contains adult or explicit material" },
    { id: "fake", label: "Fake or Stolen Work", description: "Claiming someone else's work as their own" },
    { id: "other", label: "Other", description: "Other reason not listed above" }
  ];

  const handleSubmit = async () => {
    if (!selectedReason) return;

    const reason = selectedReason === "other" ? customReason : 
                  reportReasons.find(r => r.id === selectedReason)?.label;

    if (!reason.trim()) return;

    setIsSubmitting(true);
    try {
      await dispatch(createReportThunk({
        reportable_id: portfolioId,
        reason: reason.trim(),
        reasonType: selectedReason,
        reportable_type:"project"
      }));
      toast.success("Report submitted successfully!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
      handleClose();
    } catch (error) {
      console.error("Failed to submit report:", error);
      toast.error("Failed to submit report. Please try again.", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSelectedReason("");
    setCustomReason("");
    setIsSubmitting(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start  justify-center p-5">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={handleClose}
      />
      
      {/* Modal */}
      <Card className="relative w-full max-w-md mx-4 p-6 bg-background border shadow-lg">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 dark:bg-red-900/20 rounded-full">
              <Flag className="size-5 text-red-600" />
            </div>
            <div>
              <h2 className="text-lg font-semibold">Report Portfolio</h2>
              <p className="text-sm text-muted-foreground">
                Help us keep the community safe
              </p>
            </div>
          </div>
          <button
                               onClick={handleClose}
                               className="text-muted-foreground hover:text-foreground"
                             >
                               <CircleX className="size-5 hover:text-primary" />
                             </button>
        </div>

        {/* Portfolio Info */}
        <div className="mb-6 p-3 bg-muted/50 rounded-lg">
          <p className="text-sm font-medium truncate">{portfolioTitle}</p>
          {/* <p className="text-xs text-muted-foreground">Portfolio ID: {portfolioId}</p> */}
        </div>

        {/* Reason Selection */}
        <div className="space-y-3 mb-6">
          <label className="text-sm font-medium">Why are you reporting this portfolio?</label>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {reportReasons.map((reason) => (
              <div
                key={reason.id}
                className={cn(
                  "p-3 border rounded-lg cursor-pointer transition-all hover:bg-muted/50",
                  selectedReason === reason.id 
                    ? "border-red-500 bg-red-50 dark:bg-red-900/10" 
                    : "border-border"
                )}
                onClick={() => setSelectedReason(reason.id)}
              >
                <div className="flex items-start gap-3">
                  <div className={cn(
                    "w-4 h-4 rounded-full border-2 mt-0.5 transition-colors",
                    selectedReason === reason.id
                      ? "border-red-500 bg-red-500"
                      : "border-muted-foreground"
                  )}>
                    {selectedReason === reason.id && (
                      <div className="w-full h-full rounded-full bg-white scale-50" />
                    )}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium text-sm">{reason.label}</p>
                    <p className="text-xs text-muted-foreground">{reason.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Custom Reason Input */}
        {selectedReason === "other" && (
          <div className="mb-6">
            <label className="text-sm font-medium mb-2 block">
              Please specify the reason:
            </label>
            <textarea
              value={customReason}
              onChange={(e) => setCustomReason(e.target.value)}
              placeholder="Describe why you're reporting this portfolio..."
              className="w-full p-3 border text-muted border-border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-transparent"
              rows={3}
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {customReason.length}/500 characters
            </p>
          </div>
        )}

        {/* Warning */}
        <div className="flex items-start gap-3 p-3 bg-amber-50 dark:bg-amber-900/10 border border-amber-200 dark:border-amber-800 rounded-lg mb-6">
          <AlertTriangle className="size-4 text-amber-600 mt-0.5 flex-shrink-0" />
          <div className="text-xs text-amber-800 dark:text-amber-200">
            <p className="font-medium mb-1">Please report responsibly</p>
            <p>False reports may result in action against your account. Make sure your report is accurate and follows our community guidelines.</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            className="flex-1"
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedReason || (selectedReason === "other" && !customReason.trim()) || isSubmitting}
            className="flex-1 bg-red-600 hover:bg-red-700 text-white"
          >
            {isSubmitting ? "Submitting..." : "Submit Report"}
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default ReportModal;
