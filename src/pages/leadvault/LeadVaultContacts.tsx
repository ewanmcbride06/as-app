import { useState } from "react";
import { MoreHorizontal, ChevronDown, Columns, Table as TableIcon, LayoutList, Linkedin, Plus, Search, Upload, Download } from "lucide-react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import LeadVaultNav from "@/components/leadvault/LeadVaultNav";
import FilterSidebar from "@/components/leadvault/FilterSidebar";
import ContactPreviewDrawer from "@/components/leadvault/ContactPreviewDrawer";
import { mockContacts, Contact } from "@/components/leadvault/mockData";
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

export default function LeadVaultContacts() {
  const [selectedContacts, setSelectedContacts] = useState<string[]>([]);
  const [previewContact, setPreviewContact] = useState<Contact | null>(null);
  const [viewMode, setViewMode] = useState<'table' | 'compact'>('table');
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  
  const contacts = mockContacts;
  const totalCount = 12493;

  const toggleSelectAll = () => {
    if (selectedContacts.length === contacts.length) {
      setSelectedContacts([]);
    } else {
      setSelectedContacts(contacts.map(c => c.id));
    }
  };

  const toggleSelect = (id: string) => {
    if (selectedContacts.includes(id)) {
      setSelectedContacts(selectedContacts.filter(c => c !== id));
    } else {
      setSelectedContacts([...selectedContacts, id]);
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-4">
        {/* Header */}
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

        {/* LeadVault Navigation */}
        <LeadVaultNav />

        {/* Main Content */}
        <div className="flex gap-0 -mx-6 lg:-mx-8">
          {/* Filter Sidebar */}
          <FilterSidebar 
            type="contacts" 
            activeFilters={activeFilters}
            onClearFilters={() => setActiveFilters([])}
          />

          {/* Table Area */}
          <div className="flex-1 flex flex-col min-w-0">
            {/* Toolbar */}
            <div className="border-b p-3 flex items-center justify-between bg-background">
              <div className="flex items-center gap-3">
                <span className="text-sm text-muted-foreground">
                  Showing <strong className="text-foreground">1–{contacts.length}</strong> of <strong className="text-foreground">{totalCount.toLocaleString()}</strong>
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
                    <DropdownMenuItem>Company A-Z</DropdownMenuItem>
                    <DropdownMenuItem>Last Updated</DropdownMenuItem>
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
                      {['Name', 'Title', 'Company', 'Industry', 'Employees', 'Location', 'Email', 'LinkedIn'].map(col => (
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
            {selectedContacts.length > 0 && (
              <div className="border-b p-3 bg-primary/5 flex items-center gap-3">
                <span className="text-sm font-medium">{selectedContacts.length} selected</span>
                <Button size="sm" variant="outline">Add to List</Button>
                <Button size="sm" variant="outline">Export CSV</Button>
                <Button size="sm" variant="outline" disabled>Enrich</Button>
                <Button size="sm" variant="outline" disabled>Push to CRM</Button>
                <Button size="sm" variant="ghost" onClick={() => setSelectedContacts([])}>Clear</Button>
              </div>
            )}

            {/* Table */}
            <div className="flex-1 overflow-auto max-h-[calc(100vh-320px)]">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead className="w-10">
                      <Checkbox 
                        checked={selectedContacts.length === contacts.length}
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
                          checked={selectedContacts.includes(contact.id)}
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
            </div>
          </div>

          {/* Preview Drawer */}
          {previewContact && (
            <ContactPreviewDrawer 
              contact={previewContact} 
              onClose={() => setPreviewContact(null)} 
            />
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
