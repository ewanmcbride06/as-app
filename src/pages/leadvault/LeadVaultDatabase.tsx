import { useState, useMemo } from "react";
import { MoreHorizontal, Columns, Linkedin, Globe, Plus, Search, Download, Maximize2, Minimize2 } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LeadVaultNav from "@/components/leadvault/LeadVaultNav";
import FilterSidebar from "@/components/leadvault/FilterSidebar";
import { FilterState, emptyFilterState } from "@/components/leadvault/FilterSidebar";
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
  const [filters, setFilters] = useState<FilterState>(emptyFilterState);
  const [isExpanded, setIsExpanded] = useState(false);
  const [tableSearch, setTableSearch] = useState("");

  const contacts = mockContacts;
  const companies = mockCompanies;
  const totalContacts = 12493;
  const totalCompanies = 8234;

  // Apply filters to contacts
  const filteredContacts = useMemo(() => {
    let result = contacts;
    const q = tableSearch.toLowerCase().trim();

    if (q) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.email.toLowerCase().includes(q) ||
        c.company.toLowerCase().includes(q) ||
        c.title.toLowerCase().includes(q)
      );
    }
    if (filters.industries.length) {
      result = result.filter(c => filters.industries.includes(c.industry));
    }
    if (filters.employeeSize.length) {
      result = result.filter(c => filters.employeeSize.includes(c.employees));
    }
    if (filters.companyLocation.length) {
      result = result.filter(c =>
        filters.companyLocation.some(country => c.location.toLowerCase().includes(country.toLowerCase()))
      );
    }
    if (filters.emailStatus.length) {
      const statuses = filters.emailStatus.map(s => s.toLowerCase());
      result = result.filter(c => statuses.includes(c.emailStatus));
    }
    if (filters.jobTitle.trim()) {
      const titleQ = filters.jobTitle.toLowerCase();
      if (filters.jobTitleMode === 'exact') {
        result = result.filter(c => c.title.toLowerCase() === titleQ);
      } else {
        result = result.filter(c => c.title.toLowerCase().includes(titleQ));
      }
    }
    if (filters.peopleLocation.length) {
      result = result.filter(c =>
        filters.peopleLocation.some(country => c.location.toLowerCase().includes(country.toLowerCase()))
      );
    }

    return result;
  }, [contacts, filters, tableSearch]);

  // Apply filters to companies
  const filteredCompanies = useMemo(() => {
    let result = companies;
    const q = tableSearch.toLowerCase().trim();

    if (q) {
      result = result.filter(c =>
        c.name.toLowerCase().includes(q) ||
        c.domain.toLowerCase().includes(q) ||
        c.industry.toLowerCase().includes(q)
      );
    }
    if (filters.industries.length) {
      result = result.filter(c => filters.industries.includes(c.industry));
    }
    if (filters.employeeSize.length) {
      result = result.filter(c => filters.employeeSize.includes(c.employees));
    }
    if (filters.companyLocation.length) {
      result = result.filter(c =>
        filters.companyLocation.some(country => c.location.toLowerCase().includes(country.toLowerCase()))
      );
    }

    return result;
  }, [companies, filters, tableSearch]);

  const items = viewType === 'contacts' ? filteredContacts : filteredCompanies;
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

  const handleClearFilters = () => {
    setFilters(emptyFilterState);
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
            filters={filters}
            onFiltersChange={setFilters}
            onClearFilters={handleClearFilters}
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
                <div className="relative w-52">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder={`Search ${viewType}...`}
                    value={tableSearch}
                    onChange={(e) => setTableSearch(e.target.value)}
                    className="pl-9 h-9"
                  />
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

                <Button 
                  size="sm" 
                  className="gap-2"
                >
                  <Download className="h-4 w-4" />
                  Export
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
            <div className="flex-1 overflow-auto scrollbar-hide">
              {viewType === 'contacts' ? (
                viewMode === 'table' ? (
                  <Table>
                    <TableHeader className="sticky top-0 bg-background z-10 shadow-[inset_0_-1px_0_0_hsl(var(--border))]">
                      <TableRow>
                        <TableHead className="w-10">
                          <Checkbox 
                            checked={selectedItems.length === filteredContacts.length && filteredContacts.length > 0}
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
                      {filteredContacts.map((contact) => (
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
                  /* Compact view for contacts */
                  <div className="divide-y">
                    {filteredContacts.map((contact) => (
                      <div
                        key={contact.id}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 cursor-pointer"
                        onClick={() => setPreviewContact(contact)}
                      >
                        <Checkbox
                          checked={selectedItems.includes(contact.id)}
                          onCheckedChange={() => toggleSelect(contact.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={contact.avatar} />
                          <AvatarFallback className="text-xs">{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium w-40 truncate">{contact.name}</span>
                        <span className="text-xs text-muted-foreground w-36 truncate">{contact.title}</span>
                        <span className="text-xs text-muted-foreground w-28 truncate">{contact.company}</span>
                        <span className="text-xs text-muted-foreground w-24 truncate">{contact.industry}</span>
                        <span className="text-xs text-muted-foreground w-28 truncate">{contact.location}</span>
                        <span className="text-xs text-muted-foreground flex-1 truncate">{contact.email}</span>
                        <Badge variant={
                          contact.emailStatus === 'verified' ? 'default' :
                          contact.emailStatus === 'guessed' ? 'secondary' : 'outline'
                        } className="text-xs shrink-0">
                          {contact.emailStatus}
                        </Badge>
                      </div>
                    ))}
                  </div>
                )
              ) : (
                viewMode === 'table' ? (
                  <Table>
                    <TableHeader className="sticky top-0 bg-background z-10 shadow-[inset_0_-1px_0_0_hsl(var(--border))]">
                      <TableRow>
                        <TableHead className="w-10">
                          <Checkbox 
                            checked={selectedItems.length === filteredCompanies.length && filteredCompanies.length > 0}
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
                      {filteredCompanies.map((company) => (
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
                                <DropdownMenuItem>Export</DropdownMenuItem>
                                <DropdownMenuItem>View Contacts</DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                ) : (
                  /* Compact view for companies */
                  <div className="divide-y">
                    {filteredCompanies.map((company) => (
                      <div
                        key={company.id}
                        className="flex items-center gap-3 px-4 py-2.5 hover:bg-muted/50 cursor-pointer"
                        onClick={() => setPreviewCompany(company)}
                      >
                        <Checkbox
                          checked={selectedItems.includes(company.id)}
                          onCheckedChange={() => toggleSelect(company.id)}
                          onClick={(e) => e.stopPropagation()}
                        />
                        <Avatar className="h-6 w-6 rounded">
                          <AvatarImage src={company.logo} />
                          <AvatarFallback className="rounded text-xs">{company.name[0]}</AvatarFallback>
                        </Avatar>
                        <span className="text-sm font-medium w-36 truncate">{company.name}</span>
                        <span className="text-xs text-muted-foreground w-32 truncate">{company.domain}</span>
                        <span className="text-xs text-muted-foreground w-24 truncate">{company.industry}</span>
                        <span className="text-xs text-muted-foreground w-20 truncate">{company.employees}</span>
                        <span className="text-xs text-muted-foreground w-24 truncate">{company.revenue}</span>
                        <span className="text-xs text-muted-foreground w-28 truncate">{company.location}</span>
                        <div className="flex items-center gap-1 flex-1">
                          {company.techStack.slice(0, 3).map((tech) => (
                            <Badge key={tech} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )
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
