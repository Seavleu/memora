"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDropzone } from "react-dropzone";
import { Upload, X, Loader2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function UploadAudio() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const [meetingName, setMeetingName] = useState("");

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: {
      "audio/*": [".mp3", ".wav", ".m4a"],
    },
    maxSize: 524288000, // 500MB
    onDrop: (acceptedFiles) => {
      if (acceptedFiles?.[0]) {
        setFile(acceptedFiles[0]);
      }
    },
  });

  const handleUpload = async () => {
    if (!file || !meetingName.trim()) return;

    setUploading(true);
    
    // Simulate upload progress
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 95) {
          clearInterval(interval);
          return 95;
        }
        return prev + 5;
      });
    }, 300);

    try {
      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 3000));
      
      clearInterval(interval);
      setProgress(100);
      
      setTimeout(() => {
        setOpen(false);
        setUploading(false);
        setProgress(0);
        setFile(null);
        setMeetingName("");
        
        toast.success("Audio uploaded successfully", {
          description: "Your meeting is being processed.",
        });
        
        router.refresh();
      }, 500);
    } catch (error) {
      clearInterval(interval);
      setUploading(false);
      setProgress(0);
      
      toast.error("Upload failed", {
        description: "There was an error uploading your audio file.",
      });
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Upload className="mr-2 h-4 w-4" />
          Upload Audio
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Upload meeting audio</DialogTitle>
          <DialogDescription>
            Upload your meeting recording to transcribe and analyze.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-md p-6 transition-colors ${
              isDragActive
                ? "border-primary bg-primary/5"
                : "border-muted-foreground/25"
            } ${file ? "bg-muted/50" : ""}`}
          >
            <input {...getInputProps()} />
            {file ? (
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="shrink-0 rounded-full bg-muted p-2">
                    <Upload className="h-4 w-4" />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-medium">{file.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {(file.size / 1024 / 1024).toFixed(2)} MB
                    </p>
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={(e) => {
                    e.stopPropagation();
                    setFile(null);
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center space-y-2 text-center">
                <div className="rounded-full bg-muted p-3">
                  <Upload className="h-6 w-6 text-muted-foreground" />
                </div>
                <div className="space-y-1">
                  <p className="text-sm font-medium">
                    Drag & drop your audio file
                  </p>
                  <p className="text-xs text-muted-foreground">
                    MP3, WAV, M4A up to 500MB
                  </p>
                </div>
                <Button variant="secondary" size="sm" className="mt-2">
                  Browse files
                </Button>
              </div>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="meeting-name">Meeting name</Label>
            <Input
              id="meeting-name"
              placeholder="Weekly Team Sync"
              value={meetingName}
              onChange={(e) => setMeetingName(e.target.value)}
              disabled={uploading}
            />
          </div>
          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Uploading...</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} />
            </div>
          )}
        </div>
        <DialogFooter className="flex justify-between sm:justify-between">
          <Button
            variant="outline"
            onClick={() => setOpen(false)}
            disabled={uploading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleUpload}
            disabled={!file || !meetingName.trim() || uploading}
          >
            {uploading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}