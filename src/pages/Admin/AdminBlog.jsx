import React, { useState } from "react";
import BlogList from "./BlogList";
import AddBlog from "./AddBlog";

export default function AdminBlog() {
  const [view, setView] = useState(true);
  return (
    <section className="p-6 md:p-12">
      <div className="flex justify-end mb-10">
        {view ? (
          <button
            onClick={() => setView(false)}
            className="px-4 py-2 bg-primary text-white w-fit shadow rounded"
          >
            Add Blog
          </button>
        ) : (
          <button
            onClick={() => setView(true)}
            className="px-4 py-2 bg-primary text-white w-fit shadow rounded"
          >
            Blog List
          </button>
        )}
      </div>
      {view ? <BlogList /> : <AddBlog setView={setView} />}
    </section>
  );
}
