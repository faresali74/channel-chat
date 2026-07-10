import { apiRequest } from "./api";
import type { Channel } from "../types/channel";

export function getChannels(accessToken: string) {
  return apiRequest<Channel[]>("/api/channels", {
    accessToken,
  });
}
