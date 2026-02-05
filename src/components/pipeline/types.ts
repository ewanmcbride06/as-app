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

export const leadStatusColors: Record<LeadStatus, string> = {
  "Potential": "border-blue-400 text-blue-600",
  "Qualified": "border-green-400 text-green-600",
  "Not Qualified": "border-muted-foreground text-muted-foreground",
  "Won": "border-yellow-400 text-yellow-600",
  "Lost - Not Interest": "border-red-400 text-red-600",
  "Lost - Failed To Close": "border-red-400 text-red-600",
};

export const takenStatusColors: Record<TakenStatus, string> = {
  "Upcoming": "border-muted-foreground text-muted-foreground",
  "Shown": "border-green-400 text-green-600",
  "Not Shown": "border-red-400 text-red-600",
};

export const callStatusColors: Record<CallStatus, string> = {
  "Booked": "border-green-400 text-green-600",
  "Rescheduled": "border-yellow-400 text-yellow-600",
  "No Show": "border-red-400 text-red-600",
  "Completed": "border-blue-400 text-blue-600",
  "Cancelled": "border-muted-foreground text-muted-foreground",
};

export const billingStatusColors: Record<BillingStatus, string> = {
  "Not Billed": "border-red-400 text-red-600",
  "Billed": "border-green-400 text-green-600",
  "Pending": "border-yellow-400 text-yellow-600",
  "Refunded": "border-muted-foreground text-muted-foreground",
};
