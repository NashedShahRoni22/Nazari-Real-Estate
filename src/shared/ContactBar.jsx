import React from "react";
import { BiPhoneCall } from "react-icons/bi";
import { FaFacebookF, FaYoutube } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";
import { MdEmail } from "react-icons/md";

export default function ContactBar() {
  return (
    <section className="py-2.5 bg-primary text-white">
      <div className="mx-5 md:container md:mx-auto flex justify-between">
        <div className="flex items-center gap-2.5">
          <FaLocationDot className="text-xl" />
          50 Saywell Rd, Macquarie Fields NSW 2564, Australia
        </div>

        <div className="flex items-center gap-4 md:gap-8">
          <a href="tel:+33666100010" className="flex items-center gap-2.5">
            <BiPhoneCall className="text-xl" />
            <span className="hidden lg:block">0416 674 942</span>
          </a>

          {/* <a
            href="mailto:rentals@oneagencyms.com.au"
            className="flex items-center gap-2.5"
          >
            <MdEmail className="text-xl" />
            <span className="hidden lg:block">rentals@oneagencyms.com.au</span>
          </a> */}
          <a
            href="https://youtube.com/@oneagency-z6s?si=_SLA-Is9bF0SHUB5"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5"
          >
            <FaYoutube className="text-xl" />
            <span className="hidden lg:block">YouTube</span>
          </a>

          <a
            href="https://www.facebook.com/profile.php?id=100083045236950&mibextid=LQQJ4d"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2.5"
          >
            <FaFacebookF className="text-xl" />
            <span className="hidden lg:block">Facebook</span>
          </a>
        </div>
      </div>
    </section>
  );
}
