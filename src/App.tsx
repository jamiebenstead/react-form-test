import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useState } from "react";
import {
  TextInput,
  Button,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";
import "./custom.scss";

type Person = {
  firstName: string;
  lastName: string;
  email: string;
  age: number | null;
};

const schema = yup
  .object({
    firstName: yup.string().required("First name is required"),
    lastName: yup.string().required("Last name is required"),
    email: yup
      .string()
      .email("Invalid email format")
      .required("Email is required"),
    age: yup.number().nullable().defined(),
  })
  .required();

function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Person>({
    resolver: yupResolver(schema),
    defaultValues: { age: null },
  });

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

  const headers = [
    { key: "firstName", header: "First Name" },
    { key: "lastName", header: "Last Name" },
    { key: "email", header: "Email" },
    { key: "age", header: "Age" },
  ];

  return (
    <div style={{ padding: "20px", maxWidth: "600px", margin: "0 auto" }}>
      <form onSubmit={handleSubmit(onSubmit)} style={{ paddingBottom: "20px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
          <TextInput
            id="firstName"
            labelText="First Name"
            {...register("firstName")}
            invalid={!!errors.firstName}
            invalidText={errors.firstName?.message}
          />
          <TextInput
            id="lastName"
            labelText="Last Name"
            {...register("lastName")}
            invalid={!!errors.lastName}
            invalidText={errors.lastName?.message}
          />
          <TextInput
            id="email"
            labelText="Email"
            {...register("email")}
            invalid={!!errors.email}
            invalidText={errors.email?.message}
          />
          <TextInput
            id="age"
            labelText="Age"
            type="number"
            {...register("age")}
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

      <div style={{ position: "relative" }}>
        <Button
          onClick={downloadCSV}
          style={{
            position: "absolute",
            top: 0,
            right: 0,
            padding: "0 1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          Download CSV
        </Button>
        <div style={{ paddingTop: "48px" }}>
          <DataTable
            rows={persons.map((person, index) => ({
              id: String(index),
              firstName: person.firstName,
              lastName: person.lastName,
              email: person.email,
              age: person.age,
            }))}
            headers={headers}
          >
            {({
              rows,
              headers,
              getTableProps,
              getHeaderProps,
              getRowProps,
            }) => (
              <Table {...getTableProps()}>
                <TableHead>
                  <TableRow>
                    {headers.map((header) => {
                      const { key, ...headerProps } = getHeaderProps({
                        header,
                      });
                      return (
                        <TableHeader key={key} {...headerProps}>
                          {header.header}
                        </TableHeader>
                      );
                    })}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow {...getRowProps({ row })}>
                      {row.cells.map((cell) => (
                        <TableCell key={cell.id}>{cell.value}</TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </DataTable>
        </div>
      </div>
    </div>
  );
}

export default App;
