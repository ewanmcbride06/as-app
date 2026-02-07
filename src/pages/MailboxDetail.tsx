import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "@/components/layout/DashboardLayout";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { infrastructureDomains } from "@/components/infrastructure/mockData";
import gmailLogo from "@/assets/gmail-logo.png";
import outlookLogo from "@/assets/outlook-logo.png";

const MailboxDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  const allMailboxes = infrastructureDomains.flatMap((d) =>
    d.mailboxes.map((m) => ({ ...m, domain: d.domain }))
  );
  const mailbox = allMailboxes.find((m) => m.id === id);

  if (!mailbox) {
    return (
      <DashboardLayout>
        <div className="flex flex-col h-full items-center justify-center">
          <p className="text-muted-foreground">Mailbox not found.</p>
          <Button variant="outline" className="mt-4" onClick={() => navigate("/infrastructure")}>
            Back to Infrastructure
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="flex flex-col h-full overflow-hidden">
        {/* Header */}
        <div className="flex items-center gap-3 pb-4 shrink-0">
          <Button variant="ghost" size="icon" className="h-9 w-9" onClick={() => navigate("/infrastructure")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex items-center gap-2">
            <img
              src={mailbox.provider === "outlook" ? outlookLogo : gmailLogo}
              alt={mailbox.provider}
              className="h-5 w-5 object-contain"
            />
            <h1 className="text-2xl font-semibold tracking-tight">{mailbox.email}</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 shrink-0">
          <div className="stat-card">
            <p className="text-sm font-medium text-muted-foreground">Sending Volume</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">
              {mailbox.sendingVolumeCurrent} / {mailbox.sendingVolumeMax}
            </p>
          </div>
          <div className="stat-card">
            <p className="text-sm font-medium text-muted-foreground">Reply Rate</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{mailbox.replyRate}%</p>
          </div>
          <div className="stat-card">
            <p className="text-sm font-medium text-muted-foreground">Bounce Rate</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{mailbox.bounceRate}%</p>
          </div>
          <div className="stat-card">
            <p className="text-sm font-medium text-muted-foreground">Domain</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{mailbox.domain}</p>
          </div>
          <div className="stat-card">
            <p className="text-sm font-medium text-muted-foreground">Time in Warmup</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{mailbox.warmupDays} Days</p>
          </div>
          <div className="stat-card">
            <p className="text-sm font-medium text-muted-foreground">Warmup Health</p>
            <p className="mt-4 text-3xl font-semibold tracking-tight text-foreground">{mailbox.warmupPercent}%</p>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default MailboxDetail;
