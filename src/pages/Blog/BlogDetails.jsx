import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../shared/Loader";
import { BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";

export default function BlogDetails() {
  const { id } = useParams();
  const [loader, setLoader] = useState(false);
  const [blog, setBlog] = useState([]);
  const url = `${import.meta.env.VITE_API_ROOT_URL}/public/blog/details/${id}`;

  useEffect(() => {
    setLoader(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBlog(data.data);
        setLoader(false);
      });
  }, []);
  return (
    <section className="mx-5 md:container lg:w-1/2 md:mx-auto flex flex-col my-5 md:my-10">
      {loader ? (
        <Loader />
      ) : (
        <div className="">
          <img
            src={blog?.image}
            alt=""
            className="rounded-t h-[400px] w-full"
          />
          <div className="p-4 flex flex-col gap-5">
            <div className="flex justify-between">
              <p className="flex items-center gap-1">
                <BiUser className="text-xl text-primary" />
                One Agency
              </p>
              <p className="flex items-center gap-1">
                <BsClock className="text-xl text-primary" />
                {blog?.updated_at?.slice(0, 10)}
              </p>
            </div>
            <p className="text-xl font-semibold">{blog?.title}</p>
            <div
              dangerouslySetInnerHTML={{
                __html: blog?.content?.slice(0, 60),
              }}
            />
          </div>
        </div>
      )}
    </section>
  );
}
