export type LeadStatus = "Potential" | "Qualified" | "Not Qualified" | "Won" | "Lost - Not Interest" | "Lost - Failed To Close";
export type CallStatus = "Booked" | "Rescheduled" | "No Show" | "Completed" | "Cancelled";
export type TakenStatus = "Upcoming" | "Shown" | "Not Shown";
export type BillingStatus = "Not Billed" | "Billed" | "Pending" | "Refunded";

export interface Meeting {
  id: string;
  // Invitee info
  inviteeName: string;
  inviteeEmail: string;
  company: string;
  // Meeting time
  meetingDate: Date;
  meetingTime: string;
  // Booking info
  bookedBy: string;
  bookedAt: Date;
  calendar: string;
  closer: string;
  rescheduleCount: number;
  callStage: string;
  // Statuses
  leadStatus: LeadStatus;
  callStatus: CallStatus;
  takenStatus: TakenStatus;
  billingStatus: BillingStatus;
  // Conversation
  conversation: ConversationMessage[];
}

export interface ConversationMessage {
  id: string;
  sender: "us" | "them";
  message: string;
  timestamp: Date;
}

// Use solid background colors for the status dots
export const leadStatusColors: Record<LeadStatus, string> = {
  "Potential": "bg-blue-400",
  "Qualified": "bg-green-500",
  "Not Qualified": "bg-muted-foreground",
  "Won": "bg-yellow-500",
  "Lost - Not Interest": "bg-red-500",
  "Lost - Failed To Close": "bg-red-500",
};

export const takenStatusColors: Record<TakenStatus, string> = {
  "Upcoming": "bg-muted-foreground",
  "Shown": "bg-green-500",
  "Not Shown": "bg-red-500",
};

export const callStatusColors: Record<CallStatus, string> = {
  "Booked": "bg-green-500",
  "Rescheduled": "bg-yellow-500",
  "No Show": "bg-red-500",
  "Completed": "bg-blue-500",
  "Cancelled": "bg-muted-foreground",
};

export const billingStatusColors: Record<BillingStatus, string> = {
  "Not Billed": "bg-red-500",
  "Billed": "bg-green-500",
  "Pending": "bg-yellow-500",
  "Refunded": "bg-muted-foreground",
};
