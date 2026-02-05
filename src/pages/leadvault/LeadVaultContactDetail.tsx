import { useParams, Link } from "react-router-dom";
import { ArrowLeft, MapPin, Mail, Phone, Linkedin, Plus, Download, Sparkles, Building2, Globe } from "lucide-react";
import LeadVaultLayout from "@/components/leadvault/LeadVaultLayout";
import { mockContacts, mockCompanies } from "@/components/leadvault/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";

export default function LeadVaultContactDetail() {
  const { id } = useParams();
  
  const contact = mockContacts.find(c => c.id === id) || mockContacts[0];
  const company = mockCompanies.find(c => c.name === contact.company) || mockCompanies[0];

  return (
    <LeadVaultLayout>
      <div className="h-[calc(100vh-3.5rem)] overflow-auto">
        <div className="max-w-4xl mx-auto p-6 space-y-6">
          {/* Header */}
          <div className="flex items-start gap-4">
            <Link to="/leads">
              <Button variant="ghost" size="icon">
                <ArrowLeft className="h-4 w-4" />
              </Button>
            </Link>
            
            <Avatar className="h-16 w-16">
              <AvatarImage src={contact.avatar} />
              <AvatarFallback className="text-xl">{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
            </Avatar>

            <div className="flex-1">
              <h1 className="text-2xl font-semibold">{contact.name}</h1>
              <p className="text-muted-foreground">{contact.title}</p>
              <div className="flex items-center gap-2 mt-2">
                <Link to={`/leads/companies/${company.id}`} className="flex items-center gap-2 hover:underline">
                  <Avatar className="h-5 w-5 rounded">
                    <AvatarImage src={contact.companyLogo} />
                    <AvatarFallback className="rounded text-xs">{contact.company[0]}</AvatarFallback>
                  </Avatar>
                  <span className="text-sm">{contact.company}</span>
                </Link>
                <Badge variant="outline">{contact.seniority}</Badge>
                <Badge variant="outline">{contact.department}</Badge>
              </div>
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

          <div className="grid grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="col-span-2 space-y-6">
              {/* Contact Info */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <Mail className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Email</p>
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{contact.email}</span>
                          <Badge variant={
                            contact.emailStatus === 'verified' ? 'default' :
                            contact.emailStatus === 'guessed' ? 'secondary' : 'outline'
                          } className="text-xs">
                            {contact.emailStatus}
                          </Badge>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <Phone className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Phone</p>
                        <span className="font-medium text-muted-foreground">Not available</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <Linkedin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">LinkedIn</p>
                        <a href={`https://${contact.linkedIn}`} target="_blank" rel="noopener noreferrer" className="font-medium hover:underline text-primary">
                          View Profile
                        </a>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 p-3 rounded-lg border">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground">Location</p>
                        <span className="font-medium">{contact.location}</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Company Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Company</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 p-4 rounded-lg border bg-muted/30">
                    <Avatar className="h-12 w-12 rounded-lg">
                      <AvatarImage src={company.logo} />
                      <AvatarFallback className="rounded-lg">{company.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <Link to={`/leads/companies/${company.id}`} className="font-semibold hover:underline">
                        {company.name}
                      </Link>
                      <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Globe className="h-3 w-3" />
                          {company.domain}
                        </div>
                        <div className="flex items-center gap-1">
                          <Building2 className="h-3 w-3" />
                          {company.employees} employees
                        </div>
                      </div>
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        <Badge variant="outline">{company.industry}</Badge>
                        {company.techStack.slice(0, 3).map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                        ))}
                      </div>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/leads/companies/${company.id}`}>View Company</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  <Button className="w-full gap-2" variant="outline">
                    <Mail className="h-4 w-4" />
                    Send Email
                  </Button>
                  <Button className="w-full gap-2" variant="outline">
                    <Linkedin className="h-4 w-4" />
                    Connect on LinkedIn
                  </Button>
                  <Button className="w-full gap-2">
                    <Plus className="h-4 w-4" />
                    Add to Sequence
                  </Button>
                </CardContent>
              </Card>

              {/* Notes */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Notes</CardTitle>
                </CardHeader>
                <CardContent>
                  <Textarea 
                    placeholder="Add notes about this contact..." 
                    className="min-h-[120px]"
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
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                      <span>Email opened (2 days ago)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-blue-500" />
                      <span>Added to "Q4 Outreach"</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="h-2 w-2 rounded-full bg-gray-400" />
                      <span>Contact enriched</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </LeadVaultLayout>
  );
}
