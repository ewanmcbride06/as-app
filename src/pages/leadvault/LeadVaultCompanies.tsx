import { useState } from "react";
import { MoreHorizontal, ChevronDown, Columns, Table as TableIcon, LayoutList, Globe, Plus, Search, Upload, Download } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LeadVaultNav from "@/components/leadvault/LeadVaultNav";
import FilterSidebar from "@/components/leadvault/FilterSidebar";
import CompanyPreviewDrawer from "@/components/leadvault/CompanyPreviewDrawer";
import { mockCompanies, Company } from "@/components/leadvault/mockData";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

export default function LeadVaultCompanies() {
  const [selectedCompanies, setSelectedCompanies] = useState<string[]>([]);
  const [previewCompany, setPreviewCompany] = useState<Company | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'compact'>('table');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const companies = mockCompanies;
  const totalCount = 8234;

  const toggleSelectAll = () => {
    if (selectedCompanies.length === companies.length) {
      setSelectedCompanies([]);
    } else {
      setSelectedCompanies(companies.map(c => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedCompanies.includes(id)) {
      setSelectedCompanies(selectedCompanies.filter(c => c !== id));
    } else {
      setSelectedCompanies([...selectedCompanies, id]);
    }
  };

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between py-4">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Leads</h1>
            <p className="text-muted-foreground">Search and manage your contacts and companies</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search leads..." className="pl-9 h-9" />
            </div>
            <Button variant="outline" size="sm" className="gap-2">
              <Upload className="h-4 w-4" />
              Import
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create List
            </Button>
          </div>
        </div>

        {/* LeadVault Navigation */}
        <LeadVaultNav />

        {/* Main Content - fills remaining height */}
        <div className="flex flex-1 min-h-0 overflow-hidden -mx-6 lg:-mx-8 border-t">
          {/* Filter Sidebar */}
          <FilterSidebar 
            type="companies" 
            activeFilters={activeFilters}
            onClearFilters={() => setActiveFilters([])}
          />

          {/* Table Area */}
          <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
            {/* Toolbar */}
            <div className="border-b p-3 flex items-center justify-between bg-background">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Showing <strong className="text-foreground">1–{companies.length}</strong> of <strong className="text-foreground">{totalCount.toLocaleString()}</strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      Sort by: Relevance
                      <ChevronDown className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    <DropdownMenuItem>Relevance</DropdownMenuItem>
                    <DropdownMenuItem>Name A-Z</DropdownMenuItem>
                    <DropdownMenuItem>Employees</DropdownMenuItem>
                    <DropdownMenuItem>Revenue</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>

                <div className="flex border rounded-lg">
                  <Button 
                    variant={viewMode === 'table' ? 'secondary' : 'ghost'} 
                    size="sm"
                    className="rounded-r-none"
                    onClick={() => setViewMode('table')}
                  >
                    <TableIcon className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant={viewMode === 'compact' ? 'secondary' : 'ghost'} 
                    size="sm"
                    className="rounded-l-none"
                    onClick={() => setViewMode('compact')}
                  >
                    <LayoutList className="h-4 w-4" />
                  </Button>
                </div>

                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Columns className="h-4 w-4" />
                      Columns
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-48">
                    <div className="space-y-2">
                      {['Company', 'Domain', 'Industry', 'Employees', 'Revenue', 'Location', 'Tech Stack'].map(col => (
                        <label key={col} className="flex items-center gap-2 text-sm">
                          <Checkbox defaultChecked />
                          {col}
                        </label>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>

                <Button size="sm" className="gap-2">
                  <Plus className="h-4 w-4" />
                  Add to List
                </Button>
              </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedCompanies.length > 0 && (
              <div className="border-b p-3 bg-primary/5 flex items-center gap-3">
                <span className="text-sm font-medium">{selectedCompanies.length} selected</span>
                <Button size="sm" variant="outline">Add to List</Button>
                <Button size="sm" variant="outline">Export CSV</Button>
                <Button size="sm" variant="outline" disabled>Enrich</Button>
                <Button size="sm" variant="ghost" onClick={() => setSelectedCompanies([])}>Clear</Button>
              </div>
            )}

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox 
                        checked={selectedCompanies.length === companies.length}
                        onCheckedChange={toggleSelectAll}
                      />
                    </TableHead>
                    <TableHead>Company</TableHead>
                    <TableHead>Domain</TableHead>
                    <TableHead>Industry</TableHead>
                    <TableHead>Employees</TableHead>
                    <TableHead>Revenue</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Tech Stack</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {companies.map((company) => (
                    <TableRow 
                      key={company.id}
                      className="cursor-pointer hover:bg-muted/50"
                      onClick={() => setPreviewCompany(company)}
                    >
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Checkbox 
                          checked={selectedCompanies.includes(company.id)}
                          onCheckedChange={() => toggleSelect(company.id)}
                        />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-7 w-7 rounded">
                            <AvatarImage src={company.logo} />
                            <AvatarFallback className="rounded text-xs">{company.name[0]}</AvatarFallback>
                          </Avatar>
                          <span className="font-medium">{company.name}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Globe className="h-3 w-3" />
                          {company.domain}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{company.industry}</TableCell>
                      <TableCell className="text-muted-foreground">{company.employees}</TableCell>
                      <TableCell className="text-muted-foreground">{company.revenue}</TableCell>
                      <TableCell className="text-muted-foreground">{company.location}</TableCell>
                      <TableCell>
                        <div className="flex items-center gap-1">
                          {company.techStack.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                          {company.techStack.length > 3 && (
                            <Badge variant="secondary" className="text-xs">
                              +{company.techStack.length - 3}
                            </Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="max-w-[200px]">
                        <p className="text-sm text-muted-foreground truncate">{company.description}</p>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem>View Profile</DropdownMenuItem>
                            <DropdownMenuItem>Add to List</DropdownMenuItem>
                            <DropdownMenuItem>Export</DropdownMenuItem>
                            <DropdownMenuItem>View Contacts</DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Preview Drawer */}
          {previewCompany && (
            <CompanyPreviewDrawer 
              company={previewCompany} 
              onClose={() => setPreviewCompany(null)} 
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
