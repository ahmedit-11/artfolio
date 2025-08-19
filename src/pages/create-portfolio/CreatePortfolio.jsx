import React, { useState } from "react";
import { useScrollToTop } from "../../utils/scrollToTop";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Plus, X, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import PageTitle from "@/components/PageTitle";
import Tag from "@/components/ui/tag";
import PortfolioForm from "./components/PortfolioForm";

const CreatePortfolio = () => {
  useScrollToTop();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: null,
    coverPreview: null,
    selectedTags: [],
    customTag: "",
    mediaItems: []
  });

  const handleSubmit = (data) => {
    // TODO: Integrate with API
    console.log("Portfolio data:", data);
    
    // Simulate successful creation
    setTimeout(() => {
      navigate('/profile');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <PageTitle subtitle="Share your creative work with the community">
          Create New Portfolio
        </PageTitle>

        <PortfolioForm 
          initialData={formData}
          onSubmit={handleSubmit}
          onCancel={() => navigate(-1)}
        />
      </div>
    </div>
  );
};

export default CreatePortfolio;
