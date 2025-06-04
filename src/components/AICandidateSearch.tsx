
import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Search, X } from 'lucide-react';

interface AICandidateSearchProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  currentQuery?: string;
  onClear: () => void;
}

export const AICandidateSearch: React.FC<AICandidateSearchProps> = ({
  onSearch,
  isSearching,
  currentQuery,
  onClear
}) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const exampleQueries = [
    "Finance manager with SAP experience in Dubai",
    "CPA certified analyst with 5+ years experience",
    "Accounting professional fluent in IFRS",
    "Senior finance role, team leadership skills"
  ];

  return (
    <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-dashed border-blue-200">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">AI Candidate Search</h3>
        </div>
        
        <div className="space-y-4">
          <div className="flex gap-2">
            <Input
              placeholder="Describe your ideal candidate... (e.g., 'Finance manager with 5+ years experience in Dubai with CPA certification')"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={handleSearch}
              disabled={!query.trim() || isSearching}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isSearching ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Searching...
                </>
              ) : (
                <>
                  <Search className="w-4 h-4 mr-2" />
                  Search
                </>
              )}
            </Button>
          </div>

          {currentQuery && (
            <div className="flex items-center gap-2 p-3 bg-blue-100 rounded-lg">
              <span className="text-sm text-blue-800">
                <strong>Active AI Search:</strong> "{currentQuery}"
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={onClear}
                className="text-blue-600 hover:text-blue-800 ml-auto"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          )}

          <div className="space-y-2">
            <p className="text-sm text-gray-600">Try these examples:</p>
            <div className="flex flex-wrap gap-2">
              {exampleQueries.map((example, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="cursor-pointer hover:bg-blue-100 text-xs"
                  onClick={() => setQuery(example)}
                >
                  {example}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
