import { Button, Input } from "@material-tailwind/react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const loginEmail = "admin@oneagencyms.com.au";
  const loginPassword = "@oataccess2024";
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    const form = e.target;
    const email = form.email.value;
    const password = form.password.value;
    if (email === loginEmail && password === loginPassword) {
      localStorage.setItem("oatAccessToken", "@oataccess2024")
      navigate("/admin");
    } else {
      window.alert("Enter valid email & password");
    }
  };
  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-200">
      <form
        onSubmit={handleLogin}
        className="w-3/4 md:w-1/2 lg:w-1/3 p-5 shadow rounded bg-white flex flex-col gap-2.5 md:gap-5"
      >
        <h5 className="font-semibold text-xl md:text-3xl">Login</h5>
        <Input type="email" name="email" label="Enter Email" />
        <Input type="password" name="password" label="Enter Password" />
        <Button type="submit" className="bg-primary">Login</Button>
      </form>
    </section>
  );
}
