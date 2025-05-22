"use client";

import { useState } from "react";
import { Search as SearchIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

export function Search() {
  const [search, setSearch] = useState("");

  return (
    <div className="relative mb-6">
      <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
      <Input
        placeholder="Search meetings by title, content, or speakers..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="pl-10"
      />
    </div>
  );
}