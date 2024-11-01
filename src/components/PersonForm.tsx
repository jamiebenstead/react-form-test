import { Button } from "@carbon/react";
import {
  UseFormRegister,
  FieldErrors,
  SubmitHandler,
  UseFormHandleSubmit,
} from "react-hook-form";

import FormInput from "./FormInput";

import { Person } from "../types/Person";

interface PersonFormProps {
  onSubmit: SubmitHandler<Person>;
  register: UseFormRegister<Person>;
  handleSubmit: UseFormHandleSubmit<Person>;
  errors: FieldErrors<Person>;
}

const PersonForm = ({
  onSubmit,
  register,
  handleSubmit,
  errors,
}: PersonFormProps) => {
  return (
    <form onSubmit={handleSubmit(onSubmit)} style={{ paddingBottom: "20px" }}>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        <FormInput
          id="firstName"
          labelText="First Name"
          register={register}
          errors={errors}
        />
        <FormInput
          id="lastName"
          labelText="Last Name"
          register={register}
          errors={errors}
        />
        <FormInput
          id="email"
          labelText="Email"
          register={register}
          errors={errors}
        />
        <FormInput
          id="age"
          labelText="Age"
          register={register}
          errors={errors}
          type="number"
        />
      </div>
      <Button
        type="submit"
        style={{
          padding: "0 1rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Add to List
      </Button>
    </form>
  );
};

export default PersonForm;
