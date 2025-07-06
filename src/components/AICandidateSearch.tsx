
import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  Sparkles, 
  Loader2, 
  X, 
  Target,
  Settings,
  FileText
} from "lucide-react";

interface AICandidateSearchProps {
  onSearch: (query: string) => void;
  onClear: () => void;
  currentQuery: string;
  isSearching: boolean;
  onFindMyMatch: () => void;
  onAdvancedFeatures: () => void;
}

export const AICandidateSearch: React.FC<AICandidateSearchProps> = ({
  onSearch,
  onClear,
  currentQuery,
  isSearching,
  onFindMyMatch,
  onAdvancedFeatures
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const handleClear = () => {
    setSearchQuery('');
    onClear();
  };

  const suggestedSearches = [
    'Senior Finance Manager with SAP experience',
    'CPA certified with 5+ years in banking',
    'Financial Analyst with Python skills',
    'Budget Manager in healthcare industry'
  ];

  return (
    <Card className="w-full">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* AI Talent Search */}
          <div className="space-y-3">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="font-medium text-sm">AI Talent Search</span>
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  placeholder="Describe your ideal candidate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyPress={handleKeyPress}
                  className="pl-10 pr-10"
                  disabled={isSearching}
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                )}
              </div>
              <Button 
                onClick={handleSearch}
                disabled={!searchQuery.trim() || isSearching}
                className="bg-purple-600 hover:bg-purple-700"
              >
                {isSearching ? (
                  <Loader2 className="w-4 h-4 animate-spin" />
                ) : (
                  <Search className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          {/* Additional Search Options */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {/* From Job Post */}
            <Button
              onClick={onFindMyMatch}
              variant="outline"
              className="justify-start text-left h-12 border-2 border-dashed hover:border-blue-500 hover:bg-blue-50"
            >
              <FileText className="w-4 h-4 mr-2 text-blue-500" />
              <div className="text-left">
                <div className="font-medium text-sm">From Job Post</div>
                <div className="text-xs text-gray-500">Match from Job Description</div>
              </div>
            </Button>

            {/* Advanced Features */}
            <Button
              onClick={onAdvancedFeatures}
              variant="outline"
              className="justify-start text-left h-12 border-2 border-dashed hover:border-green-500 hover:bg-green-50"
            >
              <Settings className="w-4 h-4 mr-2 text-green-500" />
              <div className="text-left">
                <div className="font-medium text-sm">Advanced Features</div>
                <div className="text-xs text-gray-500">Open Advanced Filters</div>
              </div>
            </Button>
          </div>

          {/* Current Search Display */}
          {currentQuery && (
            <div className="flex items-center gap-2 p-3 bg-purple-50 rounded-lg border border-purple-200">
              <Sparkles className="w-4 h-4 text-purple-500" />
              <span className="text-sm text-purple-700">
                Active AI search: <strong>"{currentQuery}"</strong>
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleClear}
                className="ml-auto text-purple-600 hover:text-purple-700 hover:bg-purple-100"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          {/* Suggested Searches */}
          {!currentQuery && (
            <div className="space-y-2">
              <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                Try these searches:
              </span>
              <div className="flex flex-wrap gap-2">
                {suggestedSearches.map((suggestion, index) => (
                  <Badge
                    key={index}
                    variant="secondary"
                    className="cursor-pointer hover:bg-purple-100 hover:text-purple-700 transition-colors"
                    onClick={() => {
                      setSearchQuery(suggestion);
                      onSearch(suggestion);
                    }}
                  >
                    {suggestion}
                  </Badge>
                ))}
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
