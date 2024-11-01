import {
  Button,
  DataTable,
  Table,
  TableHead,
  TableRow,
  TableHeader,
  TableBody,
  TableCell,
} from "@carbon/react";

import { Person } from "../types/Person";

type PersonTableProps = {
  persons: Person[];
};

const PersonTable = ({ persons }: PersonTableProps) => {
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
          {({ rows, headers, getTableProps, getHeaderProps, getRowProps }) => (
            <Table {...getTableProps()}>
              <TableHead>
                <TableRow>
                  {headers.map((header) => {
                    const { key, ...headerProps } = getHeaderProps({ header });
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
                  <TableRow {...getRowProps({ row })} key={row.id}>
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
  );
};

export default PersonTable;
