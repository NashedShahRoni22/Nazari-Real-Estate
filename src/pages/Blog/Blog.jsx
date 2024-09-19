import React, { useState } from "react";
import { BiBath, BiBed } from "react-icons/bi";
import { PiGarage } from "react-icons/pi";
import { Link } from "react-router-dom";

export default function Blog() {
  const [type, setType] = useState("buy");

  const properties = [
    {
      type: "buy",
      image: "https://images.unsplash.com/photo-1560185127-6e4b65a1df50",
      location: "New York, NY",
      title: "Modern Apartment",
      price: "$850,000",
      sqMeter: "120",
      bed: 3,
      bath: 2,
      garage: 1,
    },
    {
      type: "rental",
      image: "https://images.unsplash.com/photo-1590003012593-7c8122114f4c",
      location: "Los Angeles, CA",
      title: "Luxury Villa",
      price: "$5,500/month",
      sqMeter: "350",
      bed: 5,
      bath: 4,
      garage: 2,
    },
    {
      type: "sale",
      image: "https://images.unsplash.com/photo-1523755231516-e43fd2e8dca5",
      location: "Chicago, IL",
      title: "Cozy Cottage",
      price: "$320,000",
      sqMeter: "90",
      bed: 2,
      bath: 1,
      garage: 1,
    },
    {
      type: "buy",
      image: "https://images.unsplash.com/photo-1590159492027-980e2b1a9e2b",
      location: "Houston, TX",
      title: "Family House",
      price: "$600,000",
      sqMeter: "200",
      bed: 4,
      bath: 3,
      garage: 2,
    },
    {
      type: "rental",
      image: "https://images.unsplash.com/photo-1570129477492-45c003edd2be",
      location: "Phoenix, AZ",
      title: "Urban Loft",
      price: "$2,200/month",
      sqMeter: "80",
      bed: 1,
      bath: 1,
      garage: 1,
    },
    {
      type: "sale",
      image: "https://images.unsplash.com/photo-1555375771-1964f7a71f7f",
      location: "Philadelphia, PA",
      title: "Spacious Ranch",
      price: "$450,000",
      sqMeter: "180",
      bed: 3,
      bath: 2,
      garage: 2,
    },
    {
      type: "buy",
      image: "https://images.unsplash.com/photo-1580584122186-ac77429b9ecd",
      location: "San Antonio, TX",
      title: "Charming Bungalow",
      price: "$375,000",
      sqMeter: "130",
      bed: 3,
      bath: 2,
      garage: 1,
    },
    {
      type: "rental",
      image: "https://images.unsplash.com/photo-1589308078053-2212e5d81449",
      location: "San Diego, CA",
      title: "Beachfront Condo",
      price: "$4,000/month",
      sqMeter: "100",
      bed: 2,
      bath: 2,
      garage: 1,
    },
    {
      type: "sale",
      image: "https://images.unsplash.com/photo-1572120360610-d971b9e73372",
      location: "Dallas, TX",
      title: "Townhouse",
      price: "$500,000",
      sqMeter: "150",
      bed: 3,
      bath: 2,
      garage: 2,
    },
    {
      type: "buy",
      image: "https://images.unsplash.com/photo-1603570415229-2d98788a16e1",
      location: "San Jose, CA",
      title: "Contemporary Home",
      price: "$950,000",
      sqMeter: "220",
      bed: 4,
      bath: 3,
      garage: 2,
    },
    {
      type: "rental",
      image: "https://images.unsplash.com/photo-1572120360610-d971b9e73372",
      location: "Austin, TX",
      title: "Downtown Studio",
      price: "$1,800/month",
      sqMeter: "60",
      bed: 1,
      bath: 1,
      garage: 0,
    },
    {
      type: "sale",
      image: "https://images.unsplash.com/photo-1564013799919-ab600027ffc6",
      location: "Jacksonville, FL",
      title: "Historic Home",
      price: "$420,000",
      sqMeter: "140",
      bed: 3,
      bath: 2,
      garage: 1,
    },
    {
      type: "buy",
      image: "https://images.unsplash.com/photo-1599423300746-b62533397364",
      location: "San Francisco, CA",
      title: "Luxury Penthouse",
      price: "$2,500,000",
      sqMeter: "300",
      bed: 4,
      bath: 4,
      garage: 2,
    },
    {
      type: "rental",
      image: "https://images.unsplash.com/photo-1502672023488-70e25813eb80",
      location: "Columbus, OH",
      title: "Suburban House",
      price: "$2,000/month",
      sqMeter: "160",
      bed: 3,
      bath: 2,
      garage: 2,
    },
    {
      type: "sale",
      image: "https://images.unsplash.com/photo-1599423300746-b62533397364",
      location: "Fort Worth, TX",
      title: "Elegant Mansion",
      price: "$1,200,000",
      sqMeter: "400",
      bed: 5,
      bath: 4,
      garage: 3,
    },
    {
      type: "buy",
      image: "https://images.unsplash.com/photo-1555375771-1964f7a71f7f",
      location: "Indianapolis, IN",
      title: "Family Cottage",
      price: "$350,000",
      sqMeter: "110",
      bed: 2,
      bath: 1,
      garage: 1,
    },
  ];

  return (
    <section className="py-10 md:py-20 bg-[#F7F7F7]">
      <div className="mx-5 md:container md:mx-auto ">
        <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black text-center">
          Explore One Agency Property Blogs
        </h1>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2.5 md:gap-5 mt-10 md:mt-20">
          {properties.map((p, i) => (
            <div
              key={i}
              className="group bg-white flex md:flex-col shadow hover:shadow-lg hover:shadow-primary md:hover:-translate-y-5 duration-300 ease-linear"
            >
              <img
                src="https://sydneywpresidence.b-cdn.net/wp-content/uploads/2014/05/book-525x328.jpg"
                alt=""
                className="w-1/2 md:w-full"
              />
              <div className="p-4 flex flex-col gap-1.5">
                <h5 className="text-xl md:text-2xl">{p.title}</h5>
                <h5 className="text-primary font-semibold">{p.location}</h5>
                <h5>{p.price}</h5>
                <div className="flex items-center justify-between">
                  <p className="flex items-center gap-1">
                    <BiBed /> {p.bed}
                  </p>
                  <p className="flex items-center gap-1">
                    <BiBath /> {p.bath}
                  </p>
                  <p className="flex items-center gap-1">
                    <PiGarage /> {p.garage}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
