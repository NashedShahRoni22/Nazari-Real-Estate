import React from "react";

export default function PropertyDetails() {
  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20 min-h-[80vh] flex flex-col gap-8 justify-center items-center">
      <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black">
        Property Details
      </h1>
      <p className="text-3xl font-extrabold text-red-500 ">This action is unauthorized.(403 || Forbidden)</p>
    </section>
  );
}
