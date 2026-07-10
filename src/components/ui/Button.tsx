import type { ButtonHTMLAttributes } from "react";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ children, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className="w-full bg-black py-2 text-white transition hover:opacity-90"
    >
      {children}
    </button>
  );
}

export default Button;
