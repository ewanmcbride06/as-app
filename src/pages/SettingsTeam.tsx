import SettingsLayout from "@/components/layout/SettingsLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { UserPlus, Mail, MoreHorizontal } from "lucide-react";

const teamMembers = [
  { id: 1, name: "Benjamin Loki", email: "benjamin@acmecorp.com", role: "Owner", status: "Active" },
  { id: 2, name: "Sarah Chen", email: "sarah@acmecorp.com", role: "Admin", status: "Active" },
  { id: 3, name: "Mike Johnson", email: "mike@acmecorp.com", role: "Member", status: "Active" },
  { id: 4, name: "pending@example.com", email: "pending@example.com", role: "Member", status: "Pending" },
];

const SettingsTeam = () => {
  return (
    <SettingsLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Team</h1>
          <p className="text-muted-foreground mt-1">
            Invite and manage your team members.
          </p>
        </div>

        <Separator />

        {/* Invite Section */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Invite Team Member</h2>
          
          <div className="flex gap-3">
            <div className="flex-1">
              <Input 
                type="email" 
                placeholder="Enter email address" 
                className="rounded-[10px]"
              />
            </div>
            <Button className="rounded-[10px]">
              <UserPlus className="h-4 w-4 mr-2" />
              Send Invite
            </Button>
          </div>
        </div>

        <Separator />

        {/* Team Members List */}
        <div className="space-y-4">
          <h2 className="text-lg font-medium">Team Members</h2>
          
          <div className="rounded-[10px] border border-border overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-muted/50">
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Member
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Role
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                  <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-muted-foreground">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {teamMembers.map((member) => (
                  <tr key={member.id} className="hover:bg-muted/30 transition-colors">
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-[10px] bg-foreground flex items-center justify-center text-xs font-medium text-background">
                          {member.status === "Pending" ? (
                            <Mail className="h-4 w-4" />
                          ) : (
                            member.name.split(" ").map(n => n[0]).join("")
                          )}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">{member.name}</p>
                          <p className="text-xs text-muted-foreground">{member.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className="text-sm text-foreground">{member.role}</span>
                    </td>
                    <td className="px-4 py-3">
                      <Badge 
                        variant={member.status === "Active" ? "default" : "secondary"}
                        className="rounded-[6px]"
                      >
                        {member.status}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button variant="ghost" size="icon" className="h-8 w-8 rounded-[6px]">
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </SettingsLayout>
  );
};

export default SettingsTeam;
