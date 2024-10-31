import { useForm } from "react-hook-form";

function App() {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data: any) => {
    console.log("data", data);
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label>First Name</label>
          <input {...register("firstName")} />
        </div>
        <div>
          <label>Last Name</label>
          <input {...register("lastName")} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" {...register("email")} />
        </div>
        <div>
          <label>Age</label>
          <input type="number" {...register("age")} />
        </div>
        <button type="submit">Log out values</button>
      </form>
    </>
  );
}

export default App;
