import { useState } from "react";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { 
  Search, Plus, MoreHorizontal, Users, Target, Building2, Briefcase, 
  TrendingUp, Copy, Edit, Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Persona {
  id: string;
  name: string;
  icon: string;
  description: string;
  titles: string[];
  industries: string[];
  companySize: string;
  contactsMatched: number;
  companiesMatched: number;
  avgDealSize: number;
  conversionRate: number;
  lastUpdated: string;
}

const personas: Persona[] = [
  { 
    id: "1", 
    name: "Enterprise CTO", 
    icon: "🎯",
    description: "Technical decision makers at large enterprises",
    titles: ["CTO", "VP Engineering", "Chief Architect"],
    industries: ["SaaS", "Fintech", "Healthcare"],
    companySize: "1000+",
    contactsMatched: 2847,
    companiesMatched: 423,
    avgDealSize: 125000,
    conversionRate: 4.2,
    lastUpdated: "2d ago"
  },
  { 
    id: "2", 
    name: "Startup Founder", 
    icon: "🚀",
    description: "Founders and co-founders at Series A-C startups",
    titles: ["CEO", "Founder", "Co-Founder"],
    industries: ["SaaS", "AI/ML", "E-commerce"],
    companySize: "11-200",
    contactsMatched: 1592,
    companiesMatched: 892,
    avgDealSize: 48000,
    conversionRate: 6.8,
    lastUpdated: "1d ago"
  },
  { 
    id: "3", 
    name: "Marketing Leader", 
    icon: "📊",
    description: "Senior marketing executives driving growth",
    titles: ["CMO", "VP Marketing", "Head of Growth"],
    industries: ["SaaS", "E-commerce", "Media"],
    companySize: "51-500",
    contactsMatched: 3421,
    companiesMatched: 1247,
    avgDealSize: 35000,
    conversionRate: 5.1,
    lastUpdated: "4h ago"
  },
  { 
    id: "4", 
    name: "Sales Director", 
    icon: "💼",
    description: "Sales leaders managing revenue teams",
    titles: ["VP Sales", "Sales Director", "Head of Sales"],
    industries: ["SaaS", "Fintech", "HR Tech"],
    companySize: "201-1000",
    contactsMatched: 2156,
    companiesMatched: 678,
    avgDealSize: 52000,
    conversionRate: 3.9,
    lastUpdated: "6h ago"
  },
  { 
    id: "5", 
    name: "RevOps Manager", 
    icon: "⚙️",
    description: "Revenue operations and enablement professionals",
    titles: ["RevOps Manager", "Sales Ops", "Revenue Operations"],
    industries: ["SaaS", "Fintech", "Healthcare"],
    companySize: "51-500",
    contactsMatched: 1823,
    companiesMatched: 542,
    avgDealSize: 28000,
    conversionRate: 7.2,
    lastUpdated: "3d ago"
  },
];

const Personas = () => {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredPersonas = personas.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalContacts = personas.reduce((sum, p) => sum + p.contactsMatched, 0);
  const totalCompanies = personas.reduce((sum, p) => sum + p.companiesMatched, 0);
  const avgConversion = (personas.reduce((sum, p) => sum + p.conversionRate, 0) / personas.length).toFixed(1);

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 shrink-0">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Personas</h1>
            <p className="text-muted-foreground">Define and manage your ideal customer profiles</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search personas..." 
                className="pl-9 h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create Persona
            </Button>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 min-h-0 overflow-hidden border border-border rounded-[10px]">
          <div className="flex flex-col h-full">
            {/* Stats Toolbar */}
            <div className="border-b p-3 flex items-center gap-6 bg-background shrink-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Total Personas</span>
                <span className="text-sm font-semibold">{personas.length}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Matched Contacts</span>
                <span className="text-sm font-semibold">{totalContacts.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Matched Companies</span>
                <span className="text-sm font-semibold">{totalCompanies.toLocaleString()}</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Avg Conversion</span>
                <span className="text-sm font-semibold">{avgConversion}%</span>
              </div>
            </div>

            {/* Table */}
            <div className="flex-1 overflow-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-background z-10">
                  <TableRow>
                    <TableHead>Persona</TableHead>
                    <TableHead>Titles</TableHead>
                    <TableHead>Industries</TableHead>
                    <TableHead>Company Size</TableHead>
                    <TableHead className="text-right">Contacts</TableHead>
                    <TableHead className="text-right">Companies</TableHead>
                    <TableHead className="text-right">Avg Deal</TableHead>
                    <TableHead className="text-right">Conversion</TableHead>
                    <TableHead>Updated</TableHead>
                    <TableHead className="w-10"></TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredPersonas.map((persona) => (
                    <TableRow key={persona.id} className="hover:bg-muted/50">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="h-9 w-9 rounded-lg bg-muted flex items-center justify-center text-lg">
                            {persona.icon}
                          </div>
                          <div>
                            <p className="font-medium">{persona.name}</p>
                            <p className="text-xs text-muted-foreground">{persona.description}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {persona.titles.slice(0, 2).map((title) => (
                            <Badge key={title} variant="outline" className="text-xs">{title}</Badge>
                          ))}
                          {persona.titles.length > 2 && (
                            <Badge variant="secondary" className="text-xs">+{persona.titles.length - 2}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-wrap gap-1">
                          {persona.industries.slice(0, 2).map((ind) => (
                            <Badge key={ind} variant="outline" className="text-xs">{ind}</Badge>
                          ))}
                          {persona.industries.length > 2 && (
                            <Badge variant="secondary" className="text-xs">+{persona.industries.length - 2}</Badge>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{persona.companySize}</TableCell>
                      <TableCell className="text-right font-medium">{persona.contactsMatched.toLocaleString()}</TableCell>
                      <TableCell className="text-right text-muted-foreground">{persona.companiesMatched.toLocaleString()}</TableCell>
                      <TableCell className="text-right font-medium">${persona.avgDealSize.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <Badge variant="secondary" className="font-mono">{persona.conversionRate}%</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground text-sm">{persona.lastUpdated}</TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="h-7 w-7">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem className="gap-2">
                              <Target className="h-4 w-4" />
                              View Matches
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Edit className="h-4 w-4" />
                              Edit Persona
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2">
                              <Copy className="h-4 w-4" />
                              Duplicate
                            </DropdownMenuItem>
                            <DropdownMenuItem className="gap-2 text-destructive">
                              <Trash2 className="h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Personas;
