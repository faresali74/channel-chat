import { ArrowLeft, LogOut } from "lucide-react";
import { Link } from "react-router-dom";

type ChatHeaderProps = {
  channelName: string;
  displayName: string;
  onLogout: () => void;
};

function ChatHeader({ channelName, displayName, onLogout }: ChatHeaderProps) {
  const initial = displayName?.charAt(0)?.toUpperCase() || "?";

  return (
    <header className="flex shrink-0 items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
      <div className="flex items-center gap-3">
        <Link
          to="/channels"
          className="rounded-full p-2 text-gray-600 transition hover:bg-gray-100 hover:text-gray-900"
        >
          <ArrowLeft size={20} />
        </Link>

        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-sm font-semibold text-white">
            {initial}
          </div>

          <div>
            <h1 className="text-lg font-bold leading-tight text-gray-900">
              {channelName}
            </h1>
            <p className="text-xs text-gray-500">
              Logged in as{" "}
              <span className="font-semibold text-gray-700">{displayName}</span>
            </p>
          </div>
        </div>
      </div>

      <button
        onClick={onLogout}
        className="rounded-full p-2 text-red-500 transition hover:bg-red-50 hover:text-red-600"
        aria-label="Logout"
      >
        <LogOut size={20} />
      </button>
    </header>
  );
}

export default ChatHeader;
