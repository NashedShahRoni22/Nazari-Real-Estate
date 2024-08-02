import React from "react";

export default function FavouriteListing() {
  const propertyTypes = [
    {
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      listingCount: 25,
      // name: "Houses",
      name:"Baler Hol"
    },
    {
      image: "https://images.pexels.com/photos/210617/pexels-photo-210617.jpeg",
      listingCount: 15,
      // name: "Villas",
      name:'Vuda'
    },
    {
      image: "https://images.pexels.com/photos/208736/pexels-photo-208736.jpeg",
      listingCount: 10,
      name: "Duplexes",
    },
    {
      image:
        "https://images.pexels.com/photos/1105754/pexels-photo-1105754.jpeg",
      listingCount: 20,
      name: "Condos",
    },
  ];

  return (
      <section className="mx-5 md:container md:mx-auto py-10 md:py-20">
        <h1 className="text-xl md:text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-primary to-black text-center">
          Explore the most attractive categories and find your favorite listing
        </h1>
        <div className="mt-10 md:mt-20 flex flex-col md:flex-row  lg:flex-row  gap-5">
          <div className="md:w-1/2 relative group overflow-hidden rounded">
            <div className="absolute bottom-5 right-5 bg-black/50 p-2 flex flex-col items-center z-10">
              <p className="text-xl font-extrabold text-white">Apartments</p>
              <button className="mt-2 bg-primary px-2 text-white rounded-sm">
                4 Listings
              </button>
            </div>
            <img
              src="https://res.cloudinary.com/sentral/image/upload/w_1000,h_1000,q_auto:eco,c_fill/f_auto/v1684782440/miro_hero_building_exterior_2000x1125.jpg"
              alt=""
              srcset=""
              className="rounded-md h-1/2 md:h-full w-full group-hover:scale-110 duration-300 ease-linear"
            />
          </div>

          <div className="md:w-1/2  grid md:grid-cols-2 gap-5">
            {propertyTypes.map((p) => (
              <div className="relative group overflow-hidden rounded">
                <div className="absolute z-10 bottom-2.5 md:bottom-5 right-2.5 md:right-5 bg-black/50 p-2 flex flex-col items-center">
                  <p className="text-sm md:text-xl font-bold text-white">{p.name}</p>
                  <button className="bg-primary px-1 text-white text-xs md:text-base">{p.listingCount} Listings</button>
                </div>
                <img
                  src={p.image}
                  alt=""
                  srcset=""
                  className="rounded h-full group-hover:scale-110 duration-300 ease-linear"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
  );
}
