import { useState } from "react";
import { MoreHorizontal, ChevronDown, Columns, Table as TableIcon, LayoutList, Linkedin, Globe, Plus, Search, Upload, Download, Maximize2, Minimize2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LeadVaultNav from "@/components/leadvault/LeadVaultNav";
import FilterSidebar from "@/components/leadvault/FilterSidebar";
import ContactPreviewDrawer from "@/components/leadvault/ContactPreviewDrawer";
import CompanyPreviewDrawer from "@/components/leadvault/CompanyPreviewDrawer";
import { mockContacts, mockCompanies, Contact, Company } from "@/components/leadvault/mockData";
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
import { cn } from "@/lib/utils";

export default function LeadVaultDatabase() {
  const [viewType, setViewType] = useState<'contacts' | 'companies'>('contacts');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [previewContact, setPreviewContact] = useState<Contact | null>(null);
  const [previewCompany, setPreviewCompany] = useState<Company | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'compact'>('table');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  
  const contacts = mockContacts;
  const companies = mockCompanies;
  const totalContacts = 12493;
  const totalCompanies = 8234;

  const items = viewType === 'contacts' ? contacts : companies;
  const totalCount = viewType === 'contacts' ? totalContacts : totalCompanies;

  const toggleSelectAll = () => {
    if (selectedItems.length === items.length) {
      setSelectedItems([]);
    } else {
      setSelectedItems(items.map(item => item.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedItems.includes(id)) {
      setSelectedItems(selectedItems.filter(i => i !== id));
    } else {
      setSelectedItems([...selectedItems, id]);
    }
  };

  const handleViewTypeChange = (type: 'contacts' | 'companies') => {
    setViewType(type);
    setSelectedItems([]);
    setPreviewContact(null);
    setPreviewCompany(null);
  };

  const contactColumns = ['Name', 'Title', 'Company', 'Industry', 'Employees', 'Location', 'Email', 'LinkedIn'];
  const companyColumns = ['Company', 'Domain', 'Industry', 'Employees', 'Revenue', 'Location', 'Tech Stack'];

  return (
    <DashboardLayout isExpanded={isExpanded}>
      <div className={cn(
        "flex flex-col h-full overflow-hidden transition-all duration-300 ease-out"
      )}>
        {/* Header - animated slide up when expanded */}
        <div className={cn(
          "transition-all duration-300 ease-out overflow-hidden",
          isExpanded ? "max-h-0 opacity-0 py-0" : "max-h-24 opacity-100 pb-4"
        )}>
          <div className="flex items-center justify-between">
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
        </div>

        {/* LeadVault Navigation - animated slide up when expanded */}
        <div className={cn(
          "transition-all duration-300 ease-out overflow-hidden",
          isExpanded ? "max-h-0 opacity-0" : "max-h-12 opacity-100"
        )}>
          <LeadVaultNav />
        </div>

        {/* Main Content - fills remaining height with animation */}
        <div className={cn(
          "flex flex-1 min-h-0 overflow-hidden transition-all duration-300 ease-out",
          isExpanded ? "border-0 rounded-none" : "border border-border rounded-[10px] mt-[10px]"
        )}>
          {/* Filter Sidebar */}
          <FilterSidebar 
            viewType={viewType}
            onViewTypeChange={handleViewTypeChange}
            activeFilters={activeFilters}
            onClearFilters={() => setActiveFilters([])}
          />

          {/* Table Area */}
          <div className="flex-1 flex flex-col min-w-0 min-h-0 overflow-hidden">
            {/* Toolbar */}
            <div className="border-b p-3 flex items-center justify-between bg-background">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Showing <strong className="text-foreground">1–{items.length}</strong> of <strong className="text-foreground">{totalCount.toLocaleString()}</strong> {viewType}
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
                    <DropdownMenuItem>{viewType === 'contacts' ? 'Company A-Z' : 'Employees'}</DropdownMenuItem>
                    <DropdownMenuItem>{viewType === 'contacts' ? 'Last Updated' : 'Revenue'}</DropdownMenuItem>
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
                      {(viewType === 'contacts' ? contactColumns : companyColumns).map(col => (
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

                <div className="w-px h-5 bg-border" />

                <Button 
                  variant="outline" 
                  size="sm" 
                  className="gap-2"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
                  {isExpanded ? 'Collapse' : 'Expand'}
                </Button>
              </div>
            </div>

            {/* Bulk Actions Bar */}
            {selectedItems.length > 0 && (
              <div className="border-b p-3 bg-primary/5 flex items-center gap-3">
                <span className="text-sm font-medium">{selectedItems.length} selected</span>
                <Button size="sm" variant="outline">Add to List</Button>
                <Button size="sm" variant="outline">Export CSV</Button>
                <Button size="sm" variant="outline" disabled>Enrich</Button>
                {viewType === 'contacts' && <Button size="sm" variant="outline" disabled>Push to CRM</Button>}
                <Button size="sm" variant="ghost" onClick={() => setSelectedItems([])}>Clear</Button>
              </div>
            )}

            {/* Table */}
            <div className="flex-1 overflow-auto">
              {viewType === 'contacts' ? (
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead className="w-10">
                        <Checkbox 
                          checked={selectedItems.length === contacts.length}
                          onCheckedChange={toggleSelectAll}
                        />
                      </TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Company</TableHead>
                      <TableHead>Industry</TableHead>
                      <TableHead>Employees</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="w-10"></TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead className="w-10"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow 
                        key={contact.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setPreviewContact(contact)}
                      >
                        <TableCell onClick={(e) => e.stopPropagation()}>
                          <Checkbox 
                            checked={selectedItems.includes(contact.id)}
                            onCheckedChange={() => toggleSelect(contact.id)}
                          />
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-7 w-7">
                              <AvatarImage src={contact.avatar} />
                              <AvatarFallback className="text-xs">{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                            <span className="font-medium">{contact.name}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{contact.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Avatar className="h-5 w-5 rounded">
                              <AvatarImage src={contact.companyLogo} />
                              <AvatarFallback className="rounded text-xs">{contact.company[0]}</AvatarFallback>
                            </Avatar>
                            <span>{contact.company}</span>
                          </div>
                        </TableCell>
                        <TableCell className="text-muted-foreground">{contact.industry}</TableCell>
                        <TableCell className="text-muted-foreground">{contact.employees}</TableCell>
                        <TableCell className="text-muted-foreground">{contact.location}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground">{contact.email}</span>
                            <Badge variant={
                              contact.emailStatus === 'verified' ? 'default' :
                              contact.emailStatus === 'guessed' ? 'secondary' : 'outline'
                            } className="text-xs">
                              {contact.emailStatus}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <Linkedin className="h-4 w-4 text-muted-foreground" />
                          </Button>
                        </TableCell>
                        <TableCell className="text-muted-foreground text-sm">{contact.lastUpdated}</TableCell>
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
                              <DropdownMenuItem>Copy Email</DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <Table>
                  <TableHeader className="sticky top-0 bg-background z-10">
                    <TableRow>
                      <TableHead className="w-10">
                        <Checkbox 
                          checked={selectedItems.length === companies.length}
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
                            checked={selectedItems.includes(company.id)}
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
              )}
            </div>
          </div>

          {/* Preview Drawers */}
          {previewContact && (
            <ContactPreviewDrawer 
              contact={previewContact} 
              onClose={() => setPreviewContact(null)} 
            />
          )}
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
