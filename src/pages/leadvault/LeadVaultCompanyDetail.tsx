import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Globe, MapPin, Users, DollarSign, Calendar, Plus, Download, Sparkles, Linkedin, Mail } from "lucide-react";

import { mockCompanies, mockContacts } from "@/components/leadvault/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function LeadVaultCompanyDetail() {
  const { id } = useParams();
  
  const company = mockCompanies.find(c => c.id === id) || mockCompanies[0];
  const companyContacts = mockContacts.filter(c => c.company === company.name).slice(0, 5);
  const contacts = companyContacts.length > 0 ? companyContacts : mockContacts.slice(0, 5);

  return (
    <>
      <div className="max-w-5xl space-y-6">
        {/* Header */}
        <div className="flex items-start gap-4">
          <Link to="/leads/companies">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-4 w-4" />
            </Button>
          </Link>
          
          <Avatar className="h-16 w-16 rounded-xl">
            <AvatarImage src={company.logo} />
            <AvatarFallback className="rounded-xl text-xl">{company.name[0]}</AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <h1 className="text-2xl font-semibold">{company.name}</h1>
            <div className="flex items-center gap-4 mt-1 text-muted-foreground">
              <div className="flex items-center gap-1">
                <Globe className="h-4 w-4" />
                <a href={`https://${company.domain}`} target="_blank" rel="noopener noreferrer" className="hover:underline">
                  {company.domain}
                </a>
              </div>
              <div className="flex items-center gap-1">
                <MapPin className="h-4 w-4" />
                {company.location}
              </div>
            </div>
            <Badge variant="outline" className="mt-2">{company.industry}</Badge>
          </div>

          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Add to List
            </Button>
            <Button variant="outline" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Export
            </Button>
            <Button size="sm" className="gap-2" disabled>
              <Sparkles className="h-4 w-4" />
              Enrich
            </Button>
          </div>
        </div>

        <Separator />

        {/* Stats Row */}
        <div className="grid grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">Employees</span>
              </div>
              <p className="text-2xl font-semibold mt-1">{company.employees}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-sm">Revenue</span>
              </div>
              <p className="text-2xl font-semibold mt-1">{company.revenue}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Calendar className="h-4 w-4" />
                <span className="text-sm">Founded</span>
              </div>
              <p className="text-2xl font-semibold mt-1">{company.founded}</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Users className="h-4 w-4" />
                <span className="text-sm">Contacts</span>
              </div>
              <p className="text-2xl font-semibold mt-1">{contacts.length}</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2 space-y-6">
            {/* Overview */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Overview</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground">{company.description}</p>
                
                <div>
                  <h4 className="text-sm font-medium mb-2">Tech Stack</h4>
                  <div className="flex flex-wrap gap-1.5">
                    {company.techStack.map((tech) => (
                      <Badge key={tech} variant="outline">{tech}</Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Contacts */}
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Contacts at {company.name}</CardTitle>
                <Button variant="outline" size="sm">View All</Button>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Name</TableHead>
                      <TableHead>Title</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="w-20"></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contacts.map((contact) => (
                      <TableRow key={contact.id}>
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
                            <span className="text-muted-foreground">{contact.email}</span>
                            <Badge variant={contact.emailStatus === 'verified' ? 'default' : 'secondary'} className="text-xs">
                              {contact.emailStatus}
                            </Badge>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <Linkedin className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Notes */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Notes</CardTitle>
              </CardHeader>
              <CardContent>
                <Textarea 
                  placeholder="Add notes about this company..." 
                  className="min-h-[150px]"
                />
                <Button size="sm" className="mt-3 w-full">Save Notes</Button>
              </CardContent>
            </Card>

            {/* Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Added to "Enterprise Prospects"</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-primary" />
                    <span>Enriched company data</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="h-2 w-2 rounded-full bg-muted-foreground" />
                    <span>Company profile viewed</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
}
