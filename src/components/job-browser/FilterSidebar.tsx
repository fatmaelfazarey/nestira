
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { X, Search } from "lucide-react";

interface FilterSidebarProps {
  filters: {
    location: string[];
    careerLevel: string[];
    workMode: string[];
    jobType: string[];
    industry: string[];
    country: string[];
  };
  onFiltersChange: (filters: any) => void;
  onClose?: () => void;
}

const filterOptions = {
  country: ["UAE", "KSA", "Qatar", "Kuwait", "Bahrain", "Egypt"],
  location: ["Dubai, UAE", "Riyadh, Saudi Arabia", "Doha, Qatar", "Kuwait City, Kuwait", "Manama, Bahrain", "Cairo, Egypt"],
  careerLevel: ["Entry Level", "Junior Level", "Mid Level", "Senior Level", "Executive Level", "Director Level"],
  workMode: ["Remote", "Hybrid", "On-site"],
  jobType: ["Full-time", "Part-time", "Contract", "Internship"],
  industry: ["Investment Banking", "Asset Management", "Corporate Finance", "Risk Management", "Trading", "Insurance", "Islamic Finance"]
};

export function FilterSidebar({ filters, onFiltersChange, onClose }: FilterSidebarProps) {
  const handleFilterToggle = (category: string, value: string) => {
    const currentFilters = filters[category as keyof typeof filters] || [];
    const newFilters = currentFilters.includes(value)
      ? currentFilters.filter(item => item !== value)
      : [...currentFilters, value];
    
    onFiltersChange({
      ...filters,
      [category]: newFilters
    });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      location: [],
      careerLevel: [],
      workMode: [],
      jobType: [],
      industry: [],
      country: []
    });
  };

  const totalActiveFilters = Object.values(filters).flat().length;

  return (
    <div className="w-80 bg-card border-r border-border-c h-full overflow-y-auto">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">Filters</h2>
          <div className="flex items-center gap-2">
            {totalActiveFilters > 0 && (
              <Badge variant="secondary-c" className="bg-secondary-c/20 text-secondary-c">
                {totalActiveFilters}
              </Badge>
            )}
            {onClose && (
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {totalActiveFilters > 0 && (
          <Button
            variant="outline"
            size="sm"
            onClick={clearAllFilters}
            className="w-full mb-4 hover:bg-destructive/10 hover:text-destructive hover:border-destructive/50"
          >
            Clear All Filters
          </Button>
        )}

        <div className="space-y-6">
          {/* Country filter first */}
          <div>
            <Label className="text-sm font-medium text-foreground capitalize mb-3 block">
              Country
            </Label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.country.map((option) => {
                const isSelected = filters.country?.includes(option);
                return (
                  <Badge
                    key={option}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isSelected 
                        ? 'bg-primary-c text-primary-c-foreground hover:bg-primary-c/80' 
                        : 'hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50'
                    }`}
                    onClick={() => handleFilterToggle('country', option)}
                  >
                    {option}
                  </Badge>
                );
              })}
            </div>
            <Separator className="mt-4" />
          </div>

          {/* Location */}
          <div>
            <Label className="text-sm font-medium text-foreground capitalize mb-3 block">
              Location
            </Label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.location.map((option) => {
                const isSelected = filters.location?.includes(option);
                return (
                  <Badge
                    key={option}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isSelected 
                        ? 'bg-primary-c text-primary-c-foreground hover:bg-primary-c/80' 
                        : 'hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50'
                    }`}
                    onClick={() => handleFilterToggle('location', option)}
                  >
                    {option}
                  </Badge>
                );
              })}
            </div>
            <Separator className="mt-4" />
          </div>

          {/* Career Level */}
          <div>
            <Label className="text-sm font-medium text-foreground capitalize mb-3 block">
              Career Level
            </Label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.careerLevel.map((option) => {
                const isSelected = filters.careerLevel?.includes(option);
                return (
                  <Badge
                    key={option}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isSelected 
                        ? 'bg-primary-c text-primary-c-foreground hover:bg-primary-c/80' 
                        : 'hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50'
                    }`}
                    onClick={() => handleFilterToggle('careerLevel', option)}
                  >
                    {option}
                  </Badge>
                );
              })}
            </div>
            <Separator className="mt-4" />
          </div>

          {/* Work Mode */}
          <div>
            <Label className="text-sm font-medium text-foreground capitalize mb-3 block">
              Work Mode
            </Label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.workMode.map((option) => {
                const isSelected = filters.workMode?.includes(option);
                return (
                  <Badge
                    key={option}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isSelected 
                        ? 'bg-primary-c text-primary-c-foreground hover:bg-primary-c/80' 
                        : 'hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50'
                    }`}
                    onClick={() => handleFilterToggle('workMode', option)}
                  >
                    {option}
                  </Badge>
                );
              })}
            </div>
            <Separator className="mt-4" />
          </div>

          {/* Job Type */}
          <div>
            <Label className="text-sm font-medium text-foreground capitalize mb-3 block">
              Job Type
            </Label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.jobType.map((option) => {
                const isSelected = filters.jobType?.includes(option);
                return (
                  <Badge
                    key={option}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isSelected 
                        ? 'bg-primary-c text-primary-c-foreground hover:bg-primary-c/80' 
                        : 'hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50'
                    }`}
                    onClick={() => handleFilterToggle('jobType', option)}
                  >
                    {option}
                  </Badge>
                );
              })}
            </div>
            <Separator className="mt-4" />
          </div>

          {/* Industry */}
          <div>
            <Label className="text-sm font-medium text-foreground capitalize mb-3 block">
              Industry
            </Label>
            <div className="flex flex-wrap gap-2">
              {filterOptions.industry.map((option) => {
                const isSelected = filters.industry?.includes(option);
                return (
                  <Badge
                    key={option}
                    variant={isSelected ? "default" : "outline"}
                    className={`cursor-pointer transition-all duration-200 hover:scale-105 ${
                      isSelected 
                        ? 'bg-primary-c text-primary-c-foreground hover:bg-primary-c/80' 
                        : 'hover:bg-primary-c/10 hover:text-primary-c hover:border-primary-c/50'
                    }`}
                    onClick={() => handleFilterToggle('industry', option)}
                  >
                    {option}
                  </Badge>
                );
              })}
            </div>
            <Separator className="mt-4" />
          </div>
        </div>
      </div>
    </div>
  );
}
