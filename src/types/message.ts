export interface Message {
  id: number;
  channelId: number;
  channel: null;
  userName: string;
  text: string;
  createdAt: string;
}

export interface SentMessage {
  id: number;
  userName: string;
  text: string;
  createdAt: string;
}

export interface SendMessageRequest {
  text: string;
}
