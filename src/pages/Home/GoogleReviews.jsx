import React, { useEffect } from "react";

export default function GoogleReviews() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://static.elfsight.com/platform/platform.js";
    script.setAttribute("data-use-service-core", "");
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);
  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20">
      <div
        className="elfsight-app-ed11464a-4c5f-4ac4-b65e-583f21e9584e"
        data-elfsight-app-lazy
      ></div>
    </section>
  );
}
