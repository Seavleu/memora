import { 
  FileAudio, 
  FileText, 
  Sparkles, 
  Search, 
  Share2, 
  Lock 
} from "lucide-react";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: <FileAudio className="h-10 w-10 text-primary" />,
    title: "Audio Transcription",
    description: "Convert spoken words to text with advanced AI speech recognition technology.",
  },
  {
    icon: <FileText className="h-10 w-10 text-primary" />,
    title: "Intelligent Summarization",
    description: "Generate concise meeting summaries with key points, action items, and decisions.",
  },
  {
    icon: <Sparkles className="h-10 w-10 text-primary" />,
    title: "Topic Extraction",
    description: "Automatically identify and categorize key topics discussed in your meetings.",
  },
  {
    icon: <Search className="h-10 w-10 text-primary" />,
    title: "Semantic Search",
    description: "Find relevant information across all your meetings using natural language queries.",
  },
  {
    icon: <Share2 className="h-10 w-10 text-primary" />,
    title: "Seamless Sharing",
    description: "Share meeting insights with your team through secure, customizable links.",
  },
  {
    icon: <Lock className="h-10 w-10 text-primary" />,
    title: "Enterprise Security",
    description: "End-to-end encryption and compliance with enterprise security standards.",
  },
];

export function FeaturesSection() {
  return (
    <section className="container py-20">
      <div className="text-center mb-16 space-y-4">
        <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Powerful Features for Productive Teams</h2>
        <p className="text-muted-foreground text-lg mx-auto max-w-3xl">
          Memora combines state-of-the-art AI with intuitive design to make your meetings more productive and actionable.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => (
          <Card key={index} className="border bg-card transition-all hover:shadow-md hover:-translate-y-1">
            <CardHeader>
              <div className="mb-4">{feature.icon}</div>
              <CardTitle>{feature.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <CardDescription className="text-base">{feature.description}</CardDescription>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}