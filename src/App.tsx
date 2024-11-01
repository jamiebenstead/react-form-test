import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import "./custom.scss";
import PersonTable from "./components/PersonTable";
import PersonForm from "./components/PersonForm";

import { Person } from "./types/Person";
import { formSchema } from "./schemas/FormSchema";

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Person>({
    resolver: yupResolver(formSchema),
    // Without setting the default value cannot submit empty age
    defaultValues: { age: null },
  });

  const [persons, setPersons] = useState<Person[]>([]);

  const onSubmit = (data: Person) => {
    setPersons((prevPersons) => [...prevPersons, data]);
    reset();
  };

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <PersonForm
        onSubmit={onSubmit}
        handleSubmit={handleSubmit}
        register={register}
        errors={errors}
      />
      <PersonTable persons={persons} />
    </div>
  );
}

export default App;
