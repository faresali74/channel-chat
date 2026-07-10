import type { Message } from "../../types/message";

type Props = {
  message: Message;
  isOwn: boolean;
};

function MessageBubble({ message, isOwn }: Props) {
  return (
    <div className={`flex ${isOwn ? "justify-end" : "justify-start"}`}>
      <div className="max-w-[75%] sm:max-w-[65%]">
        <div
          className={`mb-1.5 flex items-center gap-2 text-xs text-gray-500 ${
            isOwn ? "justify-end" : "justify-start"
          }`}
        >
          {!isOwn && (
            <span className="font-semibold text-gray-700">
              {message.userName}
            </span>
          )}

          <span>
            {new Date(message.createdAt).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </span>

          {isOwn && <span className="font-semibold text-gray-700">You</span>}
        </div>

        <div
          className={`rounded-2xl px-5 py-3 shadow-sm transition ${
            isOwn
              ? "rounded-br-md bg-black text-white"
              : "rounded-bl-md border border-gray-200 bg-white text-black"
          }`}
        >
          <p className="whitespace-pre-wrap wrap-break-word leading-7">
            {message.text}
          </p>
        </div>
      </div>
    </div>
  );
}

export default MessageBubble;
