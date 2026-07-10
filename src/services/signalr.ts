import {
  HubConnection,
  HubConnectionBuilder,
  HubConnectionState,
  LogLevel,
} from "@microsoft/signalr";

import type { Message } from "../types/message";

const HUB_URL = "https://enexabitwebsocket.runasp.net/channelHub";

class SignalRService {
  private connection: HubConnection | null = null;

  async connect(
    accessToken: string,
    onJoinedChannel: (messages: Message[]) => void,
    onNewMessage: (message: Message) => void,
    onUserJoined?: (user: string) => void,
    onUserLeft?: (user: string) => void,
    onError?: (message: string) => void,
  ) {
    if (this.connection?.state === HubConnectionState.Connected) {
      return;
    }

    this.connection = new HubConnectionBuilder()
      .withUrl(HUB_URL, {
        accessTokenFactory: () => accessToken,
      })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Information)
      .build();

    this.connection.on("JoinedChannel", onJoinedChannel);

    this.connection.on("NewMessage", onNewMessage);

    this.connection.on("UserJoined", (user: string) => {
      console.log("User joined:", user);
      onUserJoined?.(user);
    });

    this.connection.on("UserLeft", (user: string) => {
      console.log("User left:", user);
      onUserLeft?.(user);
    });

    this.connection.on("Error", (message: string) => {
      console.error(message);
      onError?.(message);
    });

    await this.connection.start();

    console.log("SignalR Connected");
  }

  async joinChannel(channelId: number) {
    await this.connection?.invoke("JoinChannel", channelId);
  }

  async sendMessage(channelId: number, text: string) {
    await this.connection?.invoke("SendMessage", channelId, text);
  }

  async disconnect() {
    if (!this.connection) return;

    this.connection.off("JoinedChannel");
    this.connection.off("NewMessage");
    this.connection.off("UserJoined");
    this.connection.off("UserLeft");
    this.connection.off("Error");

    try {
      if (this.connection.state !== HubConnectionState.Disconnected) {
        await this.connection.stop();
      }
    } finally {
      this.connection = null;
    }
  }

  get state() {
    return this.connection?.state;
  }
}

export const signalR = new SignalRService();
