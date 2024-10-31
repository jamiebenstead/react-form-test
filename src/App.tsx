import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import "./custom.scss";

type Person = {
  firstName: string;
  lastName: string;
  email: string;
  age?: number;
};

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    age: yup.number().optional(),
  })
  .required();

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Person>({ resolver: yupResolver(schema) });

  const [persons, setPersons] = useState<Person[]>([]);

  const onSubmit = (data: Person) => {
    setPersons((prevPersons) => [...prevPersons, data]);
    reset();
  };

  const downloadCSV = () => {
    const headers = ["First Name", "Last Name", "Email", "Age"];
    const rows = persons.map(({ firstName, lastName, email, age }) => [
      firstName,
      lastName,
      email,
      age ?? "",
    ]);
    const csvContent = [headers, ...rows]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "persons.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input {...register("firstName")} />
          <p>{errors.firstName?.message}</p>
        </div>
        <div>
          <label>Last Name</label>
          <input {...register("lastName")} />
          <p>{errors.lastName?.message}</p>
        </div>
        <div>
          <label>Email</label>
          <input {...register("email")} />
          <p>{errors.email?.message}</p>
        </div>
        <div>
          <label>Age</label>
          <input type="number" {...register("age")} />
        </div>
        <button type="submit">Add</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody>
          {persons.map((person, index) => (
            <tr key={index}>
              <td>{person.firstName}</td>
              <td>{person.lastName}</td>
              <td>{person.email}</td>
              <td>{person.age}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button onClick={downloadCSV}>Download CSV</button>
    </>
  );
}

export default App;
