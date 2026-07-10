import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { useAuth } from "../Context/AuthContext";

import type { Message } from "../types/message";

import { signalR } from "../services/signalr";

import Card from "../components/ui/Card";
import ChatHeader from "../components/chat/ChatHeader";
import MessageBubble from "../components/chat/MessageBubble";
import MessageInput from "../components/chat/MessageInput";
import {
  requestNotificationPermission,
  showNotification,
} from "../services/notification";

function ChatPage() {
  const { channelId } = useParams();

  const { accessToken, displayName, logout } = useAuth();

  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    requestNotificationPermission();

    if (!accessToken || !channelId) return;
    async function connect() {
      try {
        await signalR.connect(
          accessToken!,

          (history) => {
            console.log("JoinedChannel", history);
            setMessages(history);
            setLoading(false);
          },

          (message) => {
            console.log("NewMessage", message);

            setMessages((prev) => [...prev, message]);

            if (message.userName !== displayName) {
              showNotification(message.userName, message.text);
            }
          },

          (user) => {
            console.log("User Joined:", user);
          },

          (user) => {
            console.log("User Left:", user);
          },

          (error) => {
            console.error(error);
          },
        );

        await signalR.joinChannel(Number(channelId));
      } catch (err) {
        console.error(err);
      }
    }

    connect();

    return () => {
      signalR.disconnect();
    };
  }, [accessToken, channelId]);

  async function handleSend(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!text.trim() || !channelId) return;

    try {
      await signalR.sendMessage(Number(channelId), text);

      setText("");
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="flex h-screen items-center justify-center bg-gray-100 p-4 sm:p-6">
      <Card className="flex h-[90vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl shadow-xl">
        <ChatHeader
          channelName={`Channel #${channelId}`}
          displayName={displayName ?? ""}
          onLogout={logout}
        />

        <div className="flex-1 overflow-y-auto bg-[#f7f7f8] px-6 py-8">
          {loading ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-500">Loading...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {messages.map((message) => (
                <MessageBubble
                  key={message.id}
                  message={message}
                  isOwn={message.userName === displayName}
                />
              ))}
            </div>
          )}
        </div>

        <MessageInput value={text} onChange={setText} onSubmit={handleSend} />
      </Card>
    </main>
  );
}

export default ChatPage;
