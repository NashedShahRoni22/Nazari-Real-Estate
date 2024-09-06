import React from 'react'
import videoBg from "../../assets/video.mp4"

export default function LandingBanner() {
  return (
    <section className='relative'>
        <video className='w-full h-full' src={videoBg} autoPlay loop muted />
        <div className='absolute top-0 left-0 bg-black/60 h-full w-full flex justify-center items-center'>
            {/* <h1 className='text-white text-3xl md:text-6xl font-extrabold'>Nazari Property Group</h1> */}
        </div>
    </section>
  )
}
