import Link from "next/link";
import { FileAudio } from "lucide-react";

import { Button } from "@/components/ui/button";

interface EmptyPlaceholderProps {
  title: string;
  description: string;
  buttonText?: string;
  buttonHref?: string;
}

export function EmptyPlaceholder({
  title,
  description,
  buttonText,
  buttonHref,
}: EmptyPlaceholderProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-md border border-dashed p-8 text-center animate-in fade-in-50">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-muted">
        <FileAudio className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="mt-4 text-lg font-semibold">{title}</h3>
      <p className="mt-2 mb-6 text-sm text-muted-foreground max-w-xs">
        {description}
      </p>
      {buttonText && buttonHref && (
        <Button asChild>
          <Link href={buttonHref}>{buttonText}</Link>
        </Button>
      )}
    </div>
  );
}