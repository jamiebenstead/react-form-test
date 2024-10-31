import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const onSubmit = (data: Person) => {
    console.log("data", data);
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
    </>
  );
}

export default App;
