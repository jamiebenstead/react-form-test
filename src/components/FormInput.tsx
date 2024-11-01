import { TextInput } from "@carbon/react";
import {
  UseFormRegister,
  FieldErrors,
  Path,
  FieldValues,
} from "react-hook-form";

type FormInputProps<T extends FieldValues> = {
  id: Path<T>;
  labelText: string;
  register: UseFormRegister<T>;
  errors: FieldErrors<T>;
  type?: string;
};

const FormInput = <T extends FieldValues>({
  id,
  labelText,
  register,
  errors,
  type = "text",
}: FormInputProps<T>) => {
  const errorMessage = errors[id]?.message;

  return (
    <TextInput
      id={String(id)}
      labelText={labelText}
      type={type}
      {...register(id, {
        // Need this to solve an issue where clicking on and off the age field will show an error
        setValueAs: (value) => (value === "" ? null : value),
      })}
      invalid={!!errorMessage}
      invalidText={typeof errorMessage === "string" ? errorMessage : undefined}
    />
  );
};

export default FormInput;
