import React from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";

// import required modules
import {
  Autoplay,
  EffectCoverflow,
  Pagination,
  Navigation,
} from "swiper/modules";
import {
  BsArrowLeft,
  BsArrowRight,
  BsStarFill,
  BsStarHalf,
} from "react-icons/bs";

export default function Testimonials() {
  const testimonials = [
    {
      reviewText:
        "One Agency made the process of selling our home seamless and stress-free. Their team is professional, attentive, and exceeded our expectations with the results.",
      reviewerName: "Emily Clark",
      reviewProfession: "Homeowner, Sydney",
      reviewerImage: "https://randomuser.me/api/portraits/women/50.jpg",
    },
    {
      reviewText:
        "From property search to finalizing the deal, One Agency provided excellent support. Their market knowledge and responsiveness made a huge difference.",
      reviewerName: "John Davis",
      reviewProfession: "Investor, Melbourne",
      reviewerImage: "https://randomuser.me/api/portraits/men/51.jpg",
    },
    {
      reviewText:
        "Renting through One Agency was a breeze. They helped us find the perfect property, and the process was transparent and straightforward.",
      reviewerName: "Sarah Thompson",
      reviewProfession: "Tenant, Brisbane",
      reviewerImage: "https://randomuser.me/api/portraits/women/52.jpg",
    },
    {
      reviewText:
        "The One Agency team delivered exceptional service when we bought our investment property. Their insights and expertise gave us confidence in every step.",
      reviewerName: "Michael Lee",
      reviewProfession: "Property Investor, Perth",
      reviewerImage: "https://randomuser.me/api/portraits/men/53.jpg",
    },
    {
      reviewText:
        "One Agency's agents helped us secure a great rental property. Their attention to detail and prompt communication made all the difference.",
      reviewerName: "Olivia Martinez",
      reviewProfession: "Renter, Gold Coast",
      reviewerImage: "https://randomuser.me/api/portraits/women/54.jpg",
    },
    {
      reviewText:
        "Selling our house with One Agency was a great experience. The team was proactive and gave us the confidence we needed throughout the process.",
      reviewerName: "Daniel Green",
      reviewProfession: "Seller, Adelaide",
      reviewerImage: "https://randomuser.me/api/portraits/men/55.jpg",
    },
    {
      reviewText:
        "I highly recommend One Agency for anyone looking to buy property. Their agents went above and beyond to ensure we found the right home for our family.",
      reviewerName: "Laura Wilson",
      reviewProfession: "Buyer, Canberra",
      reviewerImage: "https://randomuser.me/api/portraits/women/56.jpg",
    },
    {
      reviewText:
        "The property management service from One Agency has been fantastic. They handle everything with care, keeping both tenants and landlords happy.",
      reviewerName: "James Brown",
      reviewProfession: "Landlord, Hobart",
      reviewerImage: "https://randomuser.me/api/portraits/men/57.jpg",
    },
  ];

  return (
    <section className="mx-5 md:container md:mx-auto py-10 md:py-20">
      <h2 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black text-center">
        Hear what our users have to say about us.
      </h2>

      <div className="mt-10 md:mt-20">
        <Swiper
          id="categorySwiper"
          effect={"coverflow"}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={"auto"}
          coverflowEffect={{
            rotate: 50,
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          navigation={{
            nextEl: "#categorySwiper-next",
            prevEl: "#categorySwiper-prev",
          }}
          breakpoints={{
            768: {
              slidesPerView: 1,
            },
            1024: {
              slidesPerView: 2,
            },
          }}
          modules={[EffectCoverflow, Pagination, Autoplay, Navigation]}
          className="mySwiper"
        >
          {testimonials.map((testimonial, i) => (
            <SwiperSlide key={i}>
              <div className="flex flex-col gap-5 border-2 border-primary p-8 rounded-xl shadow-xl">
                <div className="flex gap-1.5">
                  <BsStarFill className="text-orange-600" />
                  <BsStarFill className="text-orange-600" />
                  <BsStarFill className="text-orange-600" />
                  <BsStarFill className="text-orange-600" />
                  <BsStarHalf className="text-orange-600" />
                </div>
                <p className="md:text-xl">{testimonial.reviewText}</p>
                <div className="flex flex-col gap-2.5">
                  <img
                    className="h-16 w-16 rounded-full"
                    src={testimonial.reviewerImage}
                    alt=""
                  />
                  <div>
                    <h5 className="text-xl font-semibold">
                      {testimonial.reviewerName}
                    </h5>
                    <h5>{testimonial.reviewProfession}</h5>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Custom navigation buttons */}
        <div className="flex justify-center gap-2 mt-10 md:mt-20">
          <button
            id="categorySwiper-prev"
            className="swiper-button-prev-custom p-2 border-2 border-primary bg-primary text-white hover:bg-white hover:text-primary duration-300 ease-linear shadow-xl rounded-full"
          >
            <BsArrowLeft className="text-xl md:text-3xl" />
          </button>
          <button
            id="categorySwiper-next"
            className="swiper-button-next-custom p-2 border-2 border-primary bg-primary text-white hover:bg-white hover:text-primary duration-300 ease-linear shadow-xl rounded-full"
          >
            <BsArrowRight className="text-xl md:text-3xl" />
          </button>
        </div>
      </div>
    </section>
  );
}
