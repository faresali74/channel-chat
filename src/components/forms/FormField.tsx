import type { ChangeEvent } from "react";
import Input from "../ui/Input";

type FormFieldProps = {
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
};

function FormField({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">{label}</label>

      <Input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

export default FormField;
