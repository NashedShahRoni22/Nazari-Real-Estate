import React, { useEffect, useState } from "react";
import { BiUser } from "react-icons/bi";
import { BsClock } from "react-icons/bs";
import { MdArrowOutward } from "react-icons/md";
import { Link } from "react-router-dom";
import Loader from "../../shared/Loader";

export default function Blog() {
  const [loader, setLoader] = useState(false);
  const [blogs, setBlogs] = useState([]);
  const url = `${import.meta.env.VITE_API_ROOT_URL}/public/blogs`;

  useEffect(() => {
    setLoader(true);
    fetch(url)
      .then((res) => res.json())
      .then((data) => {
        setBlogs(data.data);
        setLoader(false);
      });
  }, []);

  return (
    <section className="py-10 md:py-20 bg-[#F7F7F7]">
      <div className="mx-5 md:container md:mx-auto ">
        <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black text-center">
          Explore One Agency Property Blogs
        </h1>
        {loader ? (
          <Loader />
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5 mt-10 md:mt-20">
            {blogs?.map((b, i) => (
              <div key={i} className="shadow rounded">
                <img
                  src={b?.image}
                  alt=""
                  className="rounded-t h-[250px] w-full"
                />
                <div className="p-4 flex flex-col gap-2.5">
                  <div className="flex justify-between">
                    <p className="flex items-center gap-1">
                      <BiUser className="text-xl text-primary" />
                      One Agency
                    </p>
                    <p className="flex items-center gap-1">
                      <BsClock className="text-xl text-primary" />
                      {b?.updated_at?.slice(0, 10)}
                    </p>
                  </div>
                  <p className="text-xl font-semibold">{b?.title}</p>
                  <div
                    dangerouslySetInnerHTML={{
                      __html: b?.content?.slice(0, 60),
                    }}
                  />
                  <Link
                    to={`/blog-details/${b?.id}`}
                    className="px-4 py-2 border border-primary w-fit flex items-center gap-2 hover:bg-primary hover:text-white duration-300 ease-linear group"
                  >
                    <span>Learn More</span>
                    <MdArrowOutward className="text-xl group-hover:rotate-45 duration-300 ease-linear" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
