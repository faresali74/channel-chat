import { LogOut } from "lucide-react";
import Card from "../components/ui/Card";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getChannels } from "../services/channelApi";
import { useAuth } from "../Context/AuthContext";
import type { Channel } from "../types/channel";

export default function ChannelSelectPage() {
  const navigate = useNavigate();

  const { accessToken, displayName, logout } = useAuth();

  const [channels, setChannels] = useState<Channel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadChannels() {
      if (!accessToken) return;

      try {
        const data = await getChannels(accessToken);
        setChannels(data);
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("Failed to load channels.");
        }
      } finally {
        setLoading(false);
      }
    }

    loadChannels();
  }, [accessToken]);

  async function handleLogout() {
    await logout();
    navigate("/login");
  }

  return (
    <main className="min-h-screen bg-gray-100 px-4 py-12">
      <div className="mx-auto max-w-xl">
        <Card className="rounded-2xl border-0 p-8 shadow-xl">
          <div className="space-y-6">
            <div className="flex items-center justify-between border-b border-gray-200 pb-5">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Select a Channel
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                  Welcome,{" "}
                  <span className="font-medium text-gray-700">
                    {displayName}
                  </span>
                </p>
              </div>

              <button
                onClick={handleLogout}
                type="button"
                aria-label="Logout"
                title="Logout"
                className="rounded-full p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
              >
                <LogOut size={22} />
              </button>
            </div>

            {loading && (
              <p className="py-6 text-center text-sm text-gray-500">
                Loading channels...
              </p>
            )}

            {error && (
              <p className="rounded-md bg-red-50 p-3 text-center text-sm text-red-600">
                {error}
              </p>
            )}

            {!loading && !error && channels.length === 0 && (
              <p className="py-6 text-center text-sm text-gray-500">
                No channels available yet.
              </p>
            )}

            {!loading && !error && channels.length > 0 && (
              <div className="space-y-3">
                {channels.map((channel) => (
                  <button
                    key={channel.id}
                    onClick={() => navigate(`/chat/${channel.id}`)}
                    className="group flex w-full items-center justify-between rounded-xl border border-gray-200 bg-white p-4 text-left transition-all hover:border-black hover:shadow-md"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
                        {channel.name?.charAt(0)?.toUpperCase() || "#"}
                      </div>

                      <div>
                        <h2 className="text-base font-semibold text-gray-900">
                          {channel.name}
                        </h2>

                        <p className="text-xs text-gray-500">
                          Channel #{channel.id}
                        </p>
                      </div>
                    </div>

                    <span className="text-xl text-gray-400 transition-transform group-hover:translate-x-1 group-hover:text-black">
                      →
                    </span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </Card>
      </div>
    </main>
  );
}
