import { createContext, useContext, useState, ReactNode } from "react";
import { Meeting } from "@/components/pipeline/types";

interface ConversationPanelContextType {
  meeting: Meeting | null;
  openConversation: (meeting: Meeting) => void;
  closeConversation: () => void;
  isOpen: boolean;
}

const ConversationPanelContext = createContext<ConversationPanelContextType>({
  meeting: null,
  openConversation: () => {},
  closeConversation: () => {},
  isOpen: false,
});

export function ConversationPanelProvider({ children }: { children: ReactNode }) {
  const [meeting, setMeeting] = useState<Meeting | null>(null);

  return (
    <ConversationPanelContext.Provider
      value={{
        meeting,
        openConversation: setMeeting,
        closeConversation: () => setMeeting(null),
        isOpen: !!meeting,
      }}
    >
      {children}
    </ConversationPanelContext.Provider>
  );
}

export function useConversationPanel() {
  return useContext(ConversationPanelContext);
}
