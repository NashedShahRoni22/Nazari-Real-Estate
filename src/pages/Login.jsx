import { Button, Input } from "@material-tailwind/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Login() {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const url = `${import.meta.env.VITE_API_ROOT_URL}/login`;
  //handle login
  async function handleSubmit(event) {
    setLoader(true);
    event.preventDefault();
    const email = event.target.email.value;
    const password = event.target.password.value;
    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.success === true) {
        setLoader(false);
        localStorage.setItem("oaAccessToken", data.data.access_token);
        localStorage.setItem("userRole", data.data.user_role);
        if (data.data.user_role === "admin") {
          navigate("/admin");
        }
        else{
          navigate("/admin/property_list");
        }
        toast.success(data.message);
      } else {
        setLoader(false);
        toast.error(data.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }
  return (
    <section className="min-h-screen flex justify-center items-center bg-gray-200">
      <form
        onSubmit={handleSubmit}
        className="w-3/4 md:w-1/2 lg:w-1/3 p-5 shadow rounded bg-white flex flex-col gap-2.5 md:gap-5"
      >
        <h5 className="font-semibold text-xl md:text-3xl mb-5">Admin Login</h5>
        <Input
          variant="static"
          required
          type="email"
          name="email"
          label="Enter Email"
        />
        <Input
          variant="static"
          required
          type="password"
          name="password"
          label="Enter Password"
        />
        <Button type="submit" className="bg-primary" disabled={loader}>
          Log in
        </Button>
      </form>
    </section>
  );
}
