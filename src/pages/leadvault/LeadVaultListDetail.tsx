import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MoreHorizontal, Download, Users, Building2, Linkedin, Plus, Activity } from "lucide-react";
import LeadVaultLayout from "@/components/leadvault/LeadVaultLayout";
import { mockLists, mockContacts, mockCompanies } from "@/components/leadvault/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

export default function LeadVaultListDetail() {
  const { id } = useParams();
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  
  const list = mockLists.find(l => l.id === id) || mockLists[0];
  const contacts = mockContacts.slice(0, 20);
  const companies = mockCompanies.slice(0, 10);

  const activityItems = [
    { action: "Added 50 contacts", time: "2 hours ago", user: "Sarah Johnson" },
    { action: "Exported CSV", time: "1 day ago", user: "Michael Chen" },
    { action: "Added 12 companies", time: "2 days ago", user: "Sarah Johnson" },
    { action: "List created", time: "1 week ago", user: "Sarah Johnson" },
  ];

  return (
    <LeadVaultLayout>
      <div className="h-[calc(100vh-3.5rem)] flex flex-col">
        {/* Header */}
        <div className="border-b p-4 bg-background">
          <div className="flex items-center gap-3 mb-4">
            <Link to="/leads/lists">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-semibold">{list.name}</h1>
                <Badge variant="outline">{list.type}</Badge>
              </div>
              <p className="text-sm text-muted-foreground">{list.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                Export
              </Button>
              <Button size="sm" className="gap-2">
                <Plus className="h-4 w-4" />
                Add Items
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="flex gap-6">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm"><strong>{list.contactsCount.toLocaleString()}</strong> contacts</span>
            </div>
            <div className="flex items-center gap-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm"><strong>{list.companiesCount.toLocaleString()}</strong> companies</span>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="contacts" className="flex-1 flex flex-col overflow-hidden">
          <div className="border-b px-4">
            <TabsList className="h-12">
              <TabsTrigger value="contacts" className="gap-2">
                <Users className="h-4 w-4" />
                Contacts
              </TabsTrigger>
              <TabsTrigger value="companies" className="gap-2">
                <Building2 className="h-4 w-4" />
                Companies
              </TabsTrigger>
              <TabsTrigger value="activity" className="gap-2">
                <Activity className="h-4 w-4" />
                Activity
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="contacts" className="flex-1 overflow-auto m-0 p-4">
            {/* Bulk Actions */}
            {selectedItems.length > 0 && (
              <div className="mb-4 p-3 bg-primary/5 rounded-lg flex items-center gap-3">
                <span className="text-sm font-medium">{selectedItems.length} selected</span>
                <Button size="sm" variant="outline">Remove from List</Button>
                <Button size="sm" variant="outline">Export CSV</Button>
                <Button size="sm" variant="ghost" onClick={() => setSelectedItems([])}>Clear</Button>
              </div>
            )}

            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead className="w-10"></TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {contacts.map((contact) => (
                  <TableRow key={contact.id}>
                    <TableCell>
                      <Checkbox />
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
                    <TableCell>{contact.company}</TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <span className="text-muted-foreground">{contact.email}</span>
                        <Badge variant={contact.emailStatus === 'verified' ? 'default' : 'secondary'} className="text-xs">
                          {contact.emailStatus}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon" className="h-7 w-7">
                        <Linkedin className="h-4 w-4" />
                      </Button>
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Copy Email</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="companies" className="flex-1 overflow-auto m-0 p-4">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-10">
                    <Checkbox />
                  </TableHead>
                  <TableHead>Company</TableHead>
                  <TableHead>Industry</TableHead>
                  <TableHead>Employees</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="w-10"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {companies.map((company) => (
                  <TableRow key={company.id}>
                    <TableCell>
                      <Checkbox />
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
                    <TableCell className="text-muted-foreground">{company.industry}</TableCell>
                    <TableCell className="text-muted-foreground">{company.employees}</TableCell>
                    <TableCell className="text-muted-foreground">{company.location}</TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon" className="h-7 w-7">
                            <MoreHorizontal className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>View Contacts</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Remove</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="activity" className="flex-1 overflow-auto m-0 p-4">
            <div className="space-y-4">
              {activityItems.map((item, index) => (
                <div key={index} className="flex items-start gap-3 p-3 rounded-lg border">
                  <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                    <Activity className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">{item.action}</p>
                    <p className="text-xs text-muted-foreground">by {item.user} • {item.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </LeadVaultLayout>
  );
}
