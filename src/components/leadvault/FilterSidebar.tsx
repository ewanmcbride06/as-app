import { useState } from "react";
import { ChevronDown, X, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";
import CountryMultiSelect from "./CountryMultiSelect";
import SearchableMultiSelect from "./SearchableMultiSelect";

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  activeCount?: number;
  onClear?: () => void;
  children: React.ReactNode;
}

function FilterSection({
  title,
  defaultOpen = true,
  activeCount = 0,
  onClear,
  children
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 text-sm font-medium hover:bg-muted/50">
        {title}
        <div className="flex items-center gap-2">
          {activeCount > 0 && (
            <span
              role="button"
              onClick={(e) => {
                e.stopPropagation();
                onClear?.();
              }}
              className="inline-flex items-center gap-1 rounded bg-primary text-primary-foreground text-[11px] font-semibold px-1.5 py-0.5 leading-none hover:bg-primary/80 transition-colors"
            >
              <X className="h-3 w-3" />
              {activeCount}
            </span>
          )}
          <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
        </div>
      </CollapsibleTrigger>
      <CollapsibleContent>
        {children}
      </CollapsibleContent>
    </Collapsible>
  );
}

interface MultiSelectFilterProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function MultiSelectFilter({
  options,
  selected,
  onChange
}: MultiSelectFilterProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };
  return (
    <div className="space-y-2 max-h-40 overflow-y-auto mx-4 my-4">
      {options.map(option => (
        <label key={option} className="flex items-center gap-2 text-sm cursor-pointer">
          <Checkbox checked={selected.includes(option)} onCheckedChange={() => toggleOption(option)} />
          {option}
        </label>
      ))}
    </div>
  );
}

interface ChipSelectProps {
  options: string[];
  selected: string[];
  onChange: (selected: string[]) => void;
}

function ChipSelect({
  options,
  selected,
  onChange
}: ChipSelectProps) {
  const toggleOption = (option: string) => {
    if (selected.includes(option)) {
      onChange(selected.filter(s => s !== option));
    } else {
      onChange([...selected, option]);
    }
  };
  return (
    <div className="flex flex-wrap gap-1.5 mx-4 my-4">
      {options.map(option => (
        <Badge 
          key={option} 
          variant={selected.includes(option) ? "default" : "outline"} 
          className="cursor-pointer text-xs" 
          onClick={() => toggleOption(option)}
        >
          {option}
        </Badge>
      ))}
    </div>
  );
}

export interface FilterState {
  // Company
  industries: string[];
  employeeSize: string[];
  associatedMembersMin: string;
  associatedMembersMax: string;
  companyLocation: string[];
  // People
  jobTitle: string;
  jobTitleMode: 'contains' | 'exact';
  peopleLocation: string[];
  emailStatus: string[];
}

export const emptyFilterState: FilterState = {
  industries: [],
  employeeSize: [],
  associatedMembersMin: "",
  associatedMembersMax: "",
  companyLocation: [],
  jobTitle: "",
  jobTitleMode: "contains",
  peopleLocation: [],
  emailStatus: [],
};

export function getActiveFilterCount(filters: FilterState): number {
  let count = 0;
  if (filters.industries.length) count++;
  if (filters.employeeSize.length) count++;
  if (filters.associatedMembersMin.trim() || filters.associatedMembersMax.trim()) count++;
  if (filters.companyLocation.length) count++;
  if (filters.jobTitle.trim()) count++;
  if (filters.peopleLocation.length) count++;
  if (filters.emailStatus.length) count++;
  return count;
}

interface FilterSidebarProps {
  viewType: 'contacts' | 'companies';
  onViewTypeChange: (type: 'contacts' | 'companies') => void;
  filters: FilterState;
  onFiltersChange: (filters: FilterState) => void;
  onClearFilters: () => void;
}

export default function FilterSidebar({
  viewType,
  onViewTypeChange,
  filters,
  onFiltersChange,
  onClearFilters
}: FilterSidebarProps) {
  const industryOptions = ['SaaS', 'Fintech', 'Healthcare', 'E-commerce', 'Marketing', 'HR Tech', 'Cybersecurity', 'AI/ML', 'EdTech', 'Real Estate', 'Logistics', 'Manufacturing'];
  const employeeSizeOptions = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
  const emailStatusOptions = ['Verified', 'Old', 'Not Verified', 'Unknown'];

  const activeCount = getActiveFilterCount(filters);

  const updateFilter = <K extends keyof FilterState>(key: K, value: FilterState[K]) => {
    onFiltersChange({ ...filters, [key]: value });
  };

  const associatedMembersCount = (filters.associatedMembersMin.trim() || filters.associatedMembersMax.trim()) ? 1 : 0;

  return (
    <div className="w-72 border-r bg-background flex flex-col h-full shrink-0">
      {/* Header with View Type Toggle */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Filters</h3>
          <Badge variant="secondary" className={cn("text-xs", activeCount === 0 && "invisible")}>
            {activeCount} active
          </Badge>
        </div>
        
        {/* View Type Toggle */}
        <div className="flex rounded-[10px] border p-1 bg-muted/30">
          <button
            onClick={() => onViewTypeChange('contacts')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-[8px] text-sm font-medium transition-all",
              viewType === 'contacts' 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Users className="h-3.5 w-3.5" />
            Contacts
          </button>
          <button
            onClick={() => onViewTypeChange('companies')}
            className={cn(
              "flex-1 flex items-center justify-center gap-2 py-1.5 px-3 rounded-[8px] text-sm font-medium transition-all",
              viewType === 'companies' 
                ? "bg-background text-foreground shadow-sm" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <Building2 className="h-3.5 w-3.5" />
            Companies
          </button>
        </div>
      </div>

      {/* Scrollable Filter Content */}
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {/* Company Filters */}
        <div className="border-b">
          <div className="px-4 py-2 bg-muted/50">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Company</span>
          </div>
          
          <FilterSection title="Industry" activeCount={filters.industries.length} onClear={() => updateFilter('industries', [])}>
            <SearchableMultiSelect options={industryOptions} selected={filters.industries} onChange={(v) => updateFilter('industries', v)} placeholder="Search industries..." />
          </FilterSection>

          <FilterSection title="Employee Size" activeCount={filters.employeeSize.length} onClear={() => updateFilter('employeeSize', [])}>
            <ChipSelect options={employeeSizeOptions} selected={filters.employeeSize} onChange={(v) => updateFilter('employeeSize', v)} />
          </FilterSection>

          <FilterSection
            title="Associated Members"
            activeCount={associatedMembersCount}
            onClear={() => {
              onFiltersChange({ ...filters, associatedMembersMin: "", associatedMembersMax: "" });
            }}
          >
            <div className="px-4 pb-4 flex items-center gap-2">
              <Input
                type="number"
                placeholder="Min"
                className="h-8 text-sm w-full"
                min={0}
                value={filters.associatedMembersMin}
                onChange={(e) => updateFilter('associatedMembersMin', e.target.value)}
              />
              <span className="text-muted-foreground text-xs shrink-0">to</span>
              <Input
                type="number"
                placeholder="Max"
                className="h-8 text-sm w-full"
                min={0}
                value={filters.associatedMembersMax}
                onChange={(e) => updateFilter('associatedMembersMax', e.target.value)}
              />
            </div>
          </FilterSection>

          <FilterSection title="Location" activeCount={filters.companyLocation.length} onClear={() => updateFilter('companyLocation', [])}>
            <CountryMultiSelect selected={filters.companyLocation} onChange={(v) => updateFilter('companyLocation', v)} />
          </FilterSection>
        </div>

        {/* People Filters - Only show for contacts */}
        {viewType === 'contacts' && (
          <div>
            <div className="px-4 py-2 bg-muted/50">
              <span className="text-xs font-semibold uppercase text-muted-foreground">People</span>
            </div>

            <FilterSection title="Job Title" activeCount={filters.jobTitle.trim() ? 1 : 0} onClear={() => onFiltersChange({ ...filters, jobTitle: "", jobTitleMode: "contains" })}>
              <div className="px-4 pb-4 space-y-2">
                <div className="flex rounded-md border p-0.5 bg-muted/30">
                  <button
                    onClick={() => updateFilter('jobTitleMode', 'contains')}
                    className={cn(
                      "flex-1 py-1 px-2 rounded text-xs font-medium transition-all",
                      filters.jobTitleMode === 'contains'
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Contains
                  </button>
                  <button
                    onClick={() => updateFilter('jobTitleMode', 'exact')}
                    className={cn(
                      "flex-1 py-1 px-2 rounded text-xs font-medium transition-all",
                      filters.jobTitleMode === 'exact'
                        ? "bg-background text-foreground shadow-sm"
                        : "text-muted-foreground hover:text-foreground"
                    )}
                  >
                    Is Exactly
                  </button>
                </div>
                <Input
                  placeholder={filters.jobTitleMode === 'contains' ? "e.g. VP, Director..." : "e.g. VP of Sales"}
                  className="h-8 text-sm"
                  value={filters.jobTitle}
                  onChange={(e) => updateFilter('jobTitle', e.target.value)}
                />
              </div>
            </FilterSection>

            <FilterSection title="Location" activeCount={filters.peopleLocation.length} onClear={() => updateFilter('peopleLocation', [])}>
              <CountryMultiSelect selected={filters.peopleLocation} onChange={(v) => updateFilter('peopleLocation', v)} />
            </FilterSection>

            <FilterSection title="Email Status" activeCount={filters.emailStatus.length} onClear={() => updateFilter('emailStatus', [])}>
              <MultiSelectFilter options={emailStatusOptions} selected={filters.emailStatus} onChange={(v) => updateFilter('emailStatus', v)} />
            </FilterSection>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t">
        <Button variant="outline" size="sm" className="w-full" onClick={onClearFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear All
        </Button>
      </div>
    </div>
  );
}
