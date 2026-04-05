"use client";

import { useCallback, useEffect, useState } from "react";
import { Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";

export interface SearchFilters {
  query: string;
  category?: string;
  minRating?: number;
}

interface EventSearchProps {
  onSearch: (filters: SearchFilters) => void;
  loading?: boolean;
}

export function EventSearch({ onSearch, loading = false }: EventSearchProps) {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);
      onSearch({ query: value });
    },
    [onSearch]
  );

  const handleClear = () => {
    setQuery("");
    onSearch({ query: "" });
  };

  return (
    <div className="relative">
      <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[var(--muted-foreground)]" />
      <Input
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        placeholder="Search events, organizers, venues..."
        className="pl-10"
        disabled={loading}
      />
      {query && (
        <button
          onClick={handleClear}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--muted-foreground)] hover:text-[var(--foreground)]"
          aria-label="Clear search"
        >
          <X className="h-5 w-5" />
        </button>
      )}
    </div>
  );
}
