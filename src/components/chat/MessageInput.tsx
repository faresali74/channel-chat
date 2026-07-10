import { SendHorizontal } from "lucide-react";

type Props = {
  value: string;
  onChange: (value: string) => void;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
};

function MessageInput({ value, onChange, onSubmit }: Props) {
  return (
    <form
      onSubmit={onSubmit}
      className="shrink-0 border-t border-gray-200 bg-white p-4 sm:p-5"
    >
      <div className="flex items-center gap-3 rounded-full border border-gray-300 bg-white px-4 py-2 transition focus-within:border-gray-400 focus-within:shadow-sm">
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 bg-transparent text-sm text-gray-900 outline-none placeholder:text-gray-400"
        />

        <button
          type="submit"
          disabled={!value.trim()}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-black text-white transition hover:scale-105 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:scale-100"
        >
          <SendHorizontal size={18} />
        </button>
      </div>
    </form>
  );
}

export default MessageInput;
