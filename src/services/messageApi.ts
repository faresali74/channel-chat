import { apiRequest } from "./api";

import type {
  Message,
  SendMessageRequest,
  SentMessage,
} from "../types/message";

export function getMessages(channelId: number, accessToken: string) {
  return apiRequest<Message[]>(`/api/channels/${channelId}/messages`, {
    accessToken,
  });
}

export function sendMessage(
  channelId: number,
  body: SendMessageRequest,
  accessToken: string,
) {
  return apiRequest<SentMessage>(`/api/channels/${channelId}/messages`, {
    method: "POST",
    body,
    accessToken,
  });
}
