export interface ContactFormData {
  firstName: string;
  lastName?: string;
  workEmail: string;
  companyName: string;
  phone?: string;
  website?: string;
  businessType: string;
  monthlyLeadsVolume?: string;
  missedCallHandling?: string;
  message?: string;
}

export interface ContactApiResponse {
  success: boolean;
  message: string;
  submissionId?: string;
  errors?: Record<string, string>;
  details?: {
    emailConfigured: boolean;
    provider?: string;
  };
}

export interface ChatMessage {
  id: string;
  sender: 'agent' | 'user' | 'system';
  text: string;
  timestamp: string;
  status?: 'sending' | 'sent' | 'delivered';
  quickReplies?: string[];
  actionLink?: {
    label: string;
    action: 'book_call' | 'jump_contact' | 'open_url';
    url?: string;
  };
}

export interface ChatInitiatePayload {
  sessionId: string;
  initialMessage: string;
  visitorName?: string;
  visitorEmail?: string;
  visitorPhone?: string;
  transcript?: Array<{ sender: string; text: string; timestamp: string }>;
  pageUrl?: string;
}

export interface ChatApiResponse {
  success: boolean;
  message: string;
  sessionId: string;
  automatedReply?: string;
  notificationSent?: boolean;
}
