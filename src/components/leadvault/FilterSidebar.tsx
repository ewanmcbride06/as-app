import { useState } from "react";
import { ChevronDown, X, Users, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { cn } from "@/lib/utils";

interface FilterSectionProps {
  title: string;
  defaultOpen?: boolean;
  children: React.ReactNode;
}

function FilterSection({
  title,
  defaultOpen = true,
  children
}: FilterSectionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);
  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen} className="border-b">
      <CollapsibleTrigger className="flex items-center justify-between w-full py-3 px-4 text-sm font-medium hover:bg-muted/50">
        {title}
        <ChevronDown className={cn("h-4 w-4 transition-transform", isOpen && "rotate-180")} />
      </CollapsibleTrigger>
      <CollapsibleContent className="px-0 py-0 pl-0 pt-0 pr-0 pb-0">
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
    <div className="space-y-2 max-h-40 overflow-y-auto mx-[16px] my-[16px]">
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

interface FilterSidebarProps {
  viewType: 'contacts' | 'companies';
  onViewTypeChange: (type: 'contacts' | 'companies') => void;
  activeFilters: string[];
  onClearFilters: () => void;
}

export default function FilterSidebar({
  viewType,
  onViewTypeChange,
  activeFilters,
  onClearFilters
}: FilterSidebarProps) {
  const [industries, setIndustries] = useState<string[]>([]);
  const [companyTypes, setCompanyTypes] = useState<string[]>([]);
  const [employeeRange, setEmployeeRange] = useState<string[]>([]);
  const [seniority, setSeniority] = useState<string[]>([]);
  const [department, setDepartment] = useState<string[]>([]);
  const [emailStatus, setEmailStatus] = useState<string[]>([]);

  const industryOptions = ['SaaS', 'Fintech', 'Healthcare', 'E-commerce', 'Marketing', 'HR Tech', 'Cybersecurity', 'AI/ML', 'EdTech'];
  const companyTypeOptions = ['Startup', 'SMB', 'Mid-Market', 'Enterprise', 'Agency'];
  const employeeOptions = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
  const seniorityOptions = ['C-level', 'VP', 'Head', 'Director', 'Manager', 'IC'];
  const departmentOptions = ['Sales', 'Marketing', 'RevOps', 'Product', 'Operations', 'Finance', 'HR', 'Engineering'];
  const emailStatusOptions = ['Verified', 'Guessed', 'Unknown'];

  return (
    <div className="w-72 border-r bg-background flex flex-col h-full shrink-0">
      {/* Header with View Type Toggle */}
      <div className="p-4 border-b space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-sm">Filters</h3>
          {activeFilters.length > 0 && (
            <Badge variant="secondary" className="text-xs">
              {activeFilters.length} active
            </Badge>
          )}
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
      <div className="flex-1 overflow-y-auto">
        {/* Company Filters */}
        <div className="border-b">
          <div className="px-4 py-2 bg-muted/50">
            <span className="text-xs font-semibold uppercase text-muted-foreground">Company</span>
          </div>
          
          <FilterSection title="Industry">
            <MultiSelectFilter options={industryOptions} selected={industries} onChange={setIndustries} />
          </FilterSection>

          <FilterSection title="Company Type">
            <MultiSelectFilter options={companyTypeOptions} selected={companyTypes} onChange={setCompanyTypes} />
          </FilterSection>

          <FilterSection title="Employee Range">
            <ChipSelect options={employeeOptions} selected={employeeRange} onChange={setEmployeeRange} />
          </FilterSection>

          <FilterSection title="Location" defaultOpen={false}>
            <div className="px-4 pb-4">
              <Input placeholder="Country or city..." className="h-8 text-sm" />
            </div>
          </FilterSection>

          <FilterSection title="Tech Stack" defaultOpen={false}>
            <div className="px-4 pb-4">
              <Input placeholder="Search technologies..." className="h-8 text-sm" />
            </div>
          </FilterSection>
        </div>

        {/* Contact Filters - Only show for contacts */}
        {viewType === 'contacts' && (
          <div>
            <div className="px-4 py-2 bg-muted/50">
              <span className="text-xs font-semibold uppercase text-muted-foreground">Contact</span>
            </div>

            <FilterSection title="Title">
              <div className="px-4 pb-4">
                <Input placeholder="Contains..." className="h-8 text-sm" />
              </div>
            </FilterSection>

            <FilterSection title="Seniority">
              <ChipSelect options={seniorityOptions} selected={seniority} onChange={setSeniority} />
            </FilterSection>

            <FilterSection title="Department">
              <MultiSelectFilter options={departmentOptions} selected={department} onChange={setDepartment} />
            </FilterSection>

            <FilterSection title="Email Status">
              <MultiSelectFilter options={emailStatusOptions} selected={emailStatus} onChange={setEmailStatus} />
            </FilterSection>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-4 border-t space-y-2">
        <Button variant="outline" size="sm" className="w-full" onClick={onClearFilters}>
          <X className="h-4 w-4 mr-2" />
          Clear All
        </Button>
        <Button size="sm" className="w-full">
          Save Search
        </Button>
      </div>
    </div>
  );
}
