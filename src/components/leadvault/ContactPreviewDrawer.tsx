import { X, Linkedin, Mail, Building2, MapPin, ExternalLink, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Contact } from "./mockData";
import { Link } from "react-router-dom";

interface ContactPreviewDrawerProps {
  contact: Contact | null;
  onClose: () => void;
}

export default function ContactPreviewDrawer({ contact, onClose }: ContactPreviewDrawerProps) {
  if (!contact) return null;

  return (
    <div className="w-80 border-l bg-background flex flex-col h-full animate-in slide-in-from-right-5">
      {/* Header */}
      <div className="p-4 border-b flex items-start justify-between">
        <div className="flex items-center gap-3">
          <Avatar className="h-12 w-12">
            <AvatarImage src={contact.avatar} />
            <AvatarFallback>{contact.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{contact.name}</h3>
            <p className="text-sm text-muted-foreground">{contact.title}</p>
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
            <Mail className="h-4 w-4" />
            Email
          </Button>
          <Button size="sm" variant="outline" className="flex-1 gap-2">
            <Linkedin className="h-4 w-4" />
            LinkedIn
          </Button>
        </div>

        <Separator />

        {/* Contact Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Contact Info</h4>
          
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Mail className="h-4 w-4 text-muted-foreground" />
              <span>{contact.email}</span>
              <Badge variant={
                contact.emailStatus === 'verified' ? 'default' :
                contact.emailStatus === 'guessed' ? 'secondary' : 'outline'
              } className="text-xs ml-auto">
                {contact.emailStatus}
              </Badge>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-muted-foreground" />
              <span>{contact.location}</span>
            </div>
          </div>
        </div>

        <Separator />

        {/* Company Info */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Company</h4>
          
          <div className="p-3 rounded-lg border bg-muted/30">
            <div className="flex items-center gap-3 mb-2">
              <Avatar className="h-8 w-8 rounded-lg">
                <AvatarImage src={contact.companyLogo} />
                <AvatarFallback className="rounded-lg">{contact.company[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium text-sm">{contact.company}</p>
                <p className="text-xs text-muted-foreground">{contact.domain}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-2 text-xs mt-3">
              <div>
                <span className="text-muted-foreground">Industry</span>
                <p className="font-medium">{contact.industry}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Size</span>
                <p className="font-medium">{contact.employees}</p>
              </div>
            </div>
          </div>
        </div>

        <Separator />

        {/* Tags */}
        <div className="space-y-3">
          <h4 className="text-sm font-medium">Tags</h4>
          <div className="flex flex-wrap gap-1.5">
            <Badge variant="outline">{contact.seniority}</Badge>
            <Badge variant="outline">{contact.department}</Badge>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="p-4 border-t space-y-2">
        <Button size="sm" className="w-full gap-2">
          <Plus className="h-4 w-4" />
          Add to List
        </Button>
        <Button variant="outline" size="sm" className="w-full gap-2" asChild>
          <Link to={`/leads/contacts/${contact.id}`}>
            <ExternalLink className="h-4 w-4" />
            View Full Profile
          </Link>
        </Button>
      </div>
    </div>
  );
}
