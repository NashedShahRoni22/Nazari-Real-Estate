import { Input, Textarea } from "@material-tailwind/react";
import React, { useState } from "react";
import { MdOutlineArrowOutward } from "react-icons/md";

export default function Contact() {
  const [loader, setLoader] = useState(false);
  const handleContact = async (e) => {
    setLoader(true);
    e.preventDefault();
    const form = e.target;
    const name = form.name.value;
    const email = form.email.value;
    const phone = form.phone.value;
    const address = form.address.value;
    const message = form.message.value;
    const postData = {
      name,
      email,
      phone,
      address,
      message,
    };
    const formData = new FormData();

    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("email", email);
    formData.append("address", address);
    formData.append("message", message);
    try {
      const response = await fetch(
        "https://api.talukderhomes.com.au/api/contact/store",
        {
          method: "POST",
          body: formData,
          headers: {
            // Add any necessary headers, such as authorization
          },
        }
      );
      const data = await response.json();
      if (data.status === true) {
        window.alert(data.msg);
        form.reset();
        setLoader(false);
      }
    } catch (error) {
      console.log("Error:", error);
      setLoader(false);
    }
  };
  return (
    <section className="mx-5 md:container md:mx-auto flex flex-col my-5 md:my-10 gap-5 md:gap-10">
      <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        Contact Us
      </h1>
      <div>
        <form onSubmit="" className="flex flex-col gap-8 md:gap-16">
          <p className="text-gray-500">
            For more information and how we can meet your needs, please fill out
            the form <br /> below and someone from our team will be in touch.
          </p>
          <div className="flex flex-col gap-5 md:gap-10 lg:flex-row-reverse">
            <div
              className="lg:w-1/2 p-8 md:p-16 shadow"
              data-aos="fade-right"
              data-aos-easing="linear"
              data-aos-duration="1500"
            >
              <div className="grid md:grid-cols-2 gap-10">
                <Input
                  required
                  variant="static"
                  label="Name"
                  name="name"
                  placeholder="Name"
                />
                <Input
                  required
                  variant="static"
                  label="Phone Number"
                  name="phone"
                  placeholder="Phone Number"
                />
                <Input
                  required
                  variant="static"
                  label="Email"
                  name="email"
                  placeholder="Email"
                />
                <Input
                  required
                  variant="static"
                  label="Address"
                  name="address"
                  placeholder="Address"
                />
              </div>
              <div className="mt-10">
                <Textarea
                  required
                  variant="static"
                  label="Message"
                  name="message"
                  placeholder="Say something..."
                />
              </div>

              <button
                type="submit"
                className="mt-10 px-8 py-2 bg-black shadow-xl shadow-primary md:hover:translate-x-5 text-white font-semibold rounded w-fit duration-300 ease-linear"
              >
                Contact
              </button>
            </div>
  
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.0962136829494!2d150.81180317571716!3d-34.06704777315129!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12ef46d57c77eb%3A0x2624dd0830930b73!2sNazari%20Property%20Group!5e0!3m2!1sen!2sbd!4v1722434451922!5m2!1sen!2sbd"
              width="100%"
              height="500"
              allowfullscreen=""
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
              className="lg:w-1/2"
              data-aos="fade-left"
              data-aos-easing="linear"
              data-aos-duration="1500"
            ></iframe>
          </div>
        </form>
      </div>
    </section>
  );
}
