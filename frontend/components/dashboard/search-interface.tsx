"use client";

import { useState } from "react";
import { Search, Clock, AlertCircle } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { EmptyPlaceholder } from "@/components/dashboard/empty-placeholder";

// Mock search results
const MOCK_SEARCH_RESULTS = [
  {
    id: "1",
    meetingTitle: "Weekly Team Sync",
    date: "2 days ago",
    context: "...we need to <mark>resolve</mark> the authentication issues by Friday...",
    meetingId: "1",
  },
  {
    id: "2",
    meetingTitle: "Product Planning Session",
    date: "3 days ago",
    context: "...let's <mark>resolve</mark> the prioritization based on customer feedback...",
    meetingId: "2",
  },
  {
    id: "3",
    meetingTitle: "Client Onboarding: Acme Corp",
    date: "4 days ago",
    context: "...the migration tool will help <mark>resolve</mark> any data transfer issues...",
    meetingId: "3",
  },
];

export function SearchInterface() {
  const [query, setQuery] = useState("");
  const [searchResults, setSearchResults] = useState<typeof MOCK_SEARCH_RESULTS | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [recentSearches, setRecentSearches] = useState<string[]>(["authentication", "deadline", "marketing plan"]);

  const handleSearch = () => {
    if (!query.trim()) return;
    
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      setIsSearching(false);
      
      if (query.toLowerCase().includes("resolve")) {
        setSearchResults(MOCK_SEARCH_RESULTS);
      } else {
        setSearchResults([]);
      }
      
      // Add to recent searches
      if (!recentSearches.includes(query)) {
        setRecentSearches([query, ...recentSearches].slice(0, 5));
      }
    }, 1000);
  };

  const handleRecentSearch = (term: string) => {
    setQuery(term);
    // Auto-trigger search
    setTimeout(() => {
      if (term.toLowerCase().includes("resolve")) {
        setSearchResults(MOCK_SEARCH_RESULTS);
      } else {
        setSearchResults([]);
      }
    }, 500);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search by keyword, topic, or speaker..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-10"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button onClick={handleSearch} disabled={isSearching || !query.trim()}>
          {isSearching ? "Searching..." : "Search"}
        </Button>
      </div>

      {!searchResults && (
        <div className="space-y-6">
          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Recent Searches</h3>
              {recentSearches.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {recentSearches.map((term, i) => (
                    <Badge
                      key={i}
                      variant="outline"
                      className="cursor-pointer hover:bg-accent"
                      onClick={() => handleRecentSearch(term)}
                    >
                      <Clock className="mr-1 h-3 w-3" />
                      {term}
                    </Badge>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">No recent searches</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <h3 className="text-lg font-medium mb-4">Search Tips</h3>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-medium">•</span>
                  <span>Use quotes for exact phrases: <code className="text-xs bg-muted p-1 rounded">"quarterly review"</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-medium">•</span>
                  <span>Search by speaker: <code className="text-xs bg-muted p-1 rounded">speaker:John</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-medium">•</span>
                  <span>Filter by date: <code className="text-xs bg-muted p-1 rounded">date:last-week</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-medium">•</span>
                  <span>Combine filters: <code className="text-xs bg-muted p-1 rounded">speaker:Jane "action items" date:last-month</code></span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>
      )}

      {searchResults && (
        <Tabs defaultValue="all" className="space-y-4">
          <TabsList>
            <TabsTrigger value="all">All Results ({searchResults.length})</TabsTrigger>
            <TabsTrigger value="transcripts">Transcripts ({searchResults.length})</TabsTrigger>
            <TabsTrigger value="summaries">Summaries (0)</TabsTrigger>
          </TabsList>
          <TabsContent value="all" className="space-y-4">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <Card key={result.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <h3 className="font-medium">
                        <a 
                          href={`/dashboard/meetings/${result.meetingId}`}
                          className="hover:underline text-primary"
                        >
                          {result.meetingTitle}
                        </a>
                      </h3>
                      <p className="text-xs text-muted-foreground">{result.date}</p>
                    </div>
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: result.context }} />
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <AlertCircle className="h-8 w-8 text-muted-foreground mb-4" />
                <h3 className="font-medium">No results found</h3>
                <p className="text-sm text-muted-foreground mt-2 max-w-md">
                  Try adjusting your search terms or using different keywords.
                </p>
              </div>
            )}
          </TabsContent>
          <TabsContent value="transcripts">
            {searchResults.length > 0 ? (
              searchResults.map((result) => (
                <Card key={result.id} className="overflow-hidden">
                  <CardContent className="p-6">
                    <div className="mb-2">
                      <h3 className="font-medium">
                        <a 
                          href={`/dashboard/meetings/${result.meetingId}`}
                          className="hover:underline text-primary"
                        >
                          {result.meetingTitle}
                        </a>
                      </h3>
                      <p className="text-xs text-muted-foreground">{result.date}</p>
                    </div>
                    <p className="text-sm" dangerouslySetInnerHTML={{ __html: result.context }} />
                  </CardContent>
                </Card>
              ))
            ) : (
              <EmptyPlaceholder
                title="No transcripts found"
                description="Try adjusting your search terms or using different keywords."
              />
            )}
          </TabsContent>
          <TabsContent value="summaries">
            <EmptyPlaceholder
              title="No summaries found"
              description="Try adjusting your search terms or using different keywords."
            />
          </TabsContent>
        </Tabs>
      )}
    </div>
  );
}