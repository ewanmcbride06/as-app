import { X, Globe, MapPin, Users, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Company } from "./mockData";
import { Link } from "react-router-dom";

interface CompanyPreviewDrawerProps {
  company: Company | null;
  onClose: () => void;
}

export default function CompanyPreviewDrawer({ company, onClose }: CompanyPreviewDrawerProps) {
  if (!company) return null;

  return (
    <div className="w-80 border-l bg-background flex flex-col h-full animate-in slide-in-from-right-5">
      {/* Header */}
      <div className="p-4 border-b flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12 rounded-lg">
            <AvatarImage src={company.logo} />
            <AvatarFallback className="rounded-lg">{company.name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{company.name}</h3>
            <p className="text-sm text-muted-foreground">{company.domain}</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X className="h-4 w-4" />
        </Button>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Quick Actions */}
        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 gap-2">
            <Globe className="h-4 w-4" />
            Website
          </Button>
          <Button size="sm" variant="outline" className="flex-1 gap-2">
            <Users className="h-4 w-4" />
            Contacts
          </Button>
        </div>

        <Separator />

        {/* Company Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Company Info</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{company.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span>{company.employees} employees</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Details */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Details</h4>
          
          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground text-xs">Industry</span>
              <p className="font-medium">{company.industry}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Revenue</span>
              <p className="font-medium">{company.revenue}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-xs">Founded</span>
              <p className="font-medium">{company.founded}</p>
            </div>
          </div>
        </div>

        <Separator />

        {/* Tech Stack */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Tech Stack</h4>
          <div className="flex flex-wrap gap-1.5">
            {company.techStack.slice(0, 6).map((tech) => (
              <Badge key={tech} variant="outline" className="text-xs">
                {tech}
              </Badge>
            ))}
            {company.techStack.length > 6 && (
              <Badge variant="secondary" className="text-xs">
                +{company.techStack.length - 6}
              </Badge>
            )}
          </div>
        </div>

        <Separator />

        {/* Description */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Description</h4>
          <p className="text-sm text-muted-foreground">{company.description}</p>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        <Button size="sm" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add to List
        </Button>
        <Button variant="outline" size="sm" className="w-full gap-2" asChild>
          <Link to={`/leads/companies/${company.id}`}>
            <ExternalLink className="h-4 w-4" />
            View Full Profile
          </Link>
        </Button>
      </div>
    </div>
  );
}
