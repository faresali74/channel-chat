import type { InputHTMLAttributes } from "react";

type InputProps = InputHTMLAttributes<HTMLInputElement>;

function Input(props: InputProps) {
  return (
    <input
      {...props}
      className="w-full border border-gray-300 px-3 py-2 outline-none focus:border-black"
    />
  );
}

export default Input;
