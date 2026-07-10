import type { ReactNode } from "react";

type CardProps = {
  children: ReactNode;
  className?: string;
};

function Card({ children, className = "" }: CardProps) {
  return (
    <div
      className={`w-full max-w-md rounded border border-gray-200 bg-white ${className}`}
    >
      {children}
    </div>
  );
}

export default Card;
