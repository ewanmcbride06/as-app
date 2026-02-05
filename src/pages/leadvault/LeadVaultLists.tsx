import { useState } from "react";
import { MoreHorizontal, Plus, Users, Building2, Calendar, User } from "lucide-react";
import { Link } from "react-router-dom";
import LeadVaultLayout from "@/components/leadvault/LeadVaultLayout";
import { mockLists, LeadList } from "@/components/leadvault/mockData";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function LeadVaultLists() {
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const lists = mockLists;

  return (
    <LeadVaultLayout>
      <div className="h-[calc(100vh-3.5rem)] flex flex-col">
        {/* Header */}
        <div className="border-b p-4 flex items-center justify-between bg-background">
          <div>
            <h1 className="text-xl font-semibold">Lists</h1>
            <p className="text-sm text-muted-foreground">Organize your leads and companies into lists</p>
          </div>

          <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
            <DialogTrigger asChild>
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                Create List
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Create New List</DialogTitle>
                <DialogDescription>
                  Create a list to organize your contacts and companies.
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">List Name</Label>
                  <Input id="name" placeholder="e.g., Q4 Enterprise Prospects" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="description">Description</Label>
                  <Textarea id="description" placeholder="What is this list for?" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">List Type</Label>
                  <Select defaultValue="mixed">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="contacts">Contacts Only</SelectItem>
                      <SelectItem value="companies">Companies Only</SelectItem>
                      <SelectItem value="mixed">Mixed (Both)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsCreateOpen(false)}>Cancel</Button>
                <Button onClick={() => setIsCreateOpen(false)}>Create List</Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>

        {/* Table */}
        <div className="flex-1 overflow-auto p-4">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>List Name</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Companies</TableHead>
                <TableHead>Contacts</TableHead>
                <TableHead>Created</TableHead>
                <TableHead>Owner</TableHead>
                <TableHead className="w-10"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {lists.map((list) => (
                <TableRow key={list.id} className="cursor-pointer hover:bg-muted/50">
                  <TableCell>
                    <Link to={`/leads/lists/${list.id}`} className="font-medium hover:underline">
                      {list.name}
                    </Link>
                    <Badge variant="outline" className="ml-2 text-xs">
                      {list.type}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground max-w-[300px]">
                    <p className="truncate">{list.description}</p>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      {list.companiesCount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Users className="h-4 w-4" />
                      {list.contactsCount.toLocaleString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground text-sm">
                      <Calendar className="h-4 w-4" />
                      {new Date(list.createdDate).toLocaleDateString()}
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <User className="h-4 w-4" />
                      {list.owner}
                    </div>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-7 w-7">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>Open</DropdownMenuItem>
                        <DropdownMenuItem>Rename</DropdownMenuItem>
                        <DropdownMenuItem>Export</DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive">Delete</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </LeadVaultLayout>
  );
}
