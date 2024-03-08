import { FieldValues, UseFormRegister } from "react-hook-form";

interface InputProps<T extends FieldValues> {
  label: string;
  type: string;
  name: keyof T;
  id: string;
  placeholder: string;
  className: string;
  register: UseFormRegister<T>;
}

const Input = <T extends Record<string, any>>({
  label,
  type,
  name,
  id,
  placeholder,
  className,
  register,
}: InputProps<T>) => {
  return (
    <div>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        {...register(name)}
        type={type}
        name={name as string}
        id={id}
        placeholder={placeholder}
        className={className}
      />
    </div>
  );
};

export default Input;
