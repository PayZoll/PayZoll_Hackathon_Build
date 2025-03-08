import React from 'react';

export default function Hero() {
  return (
    <section id="home" className="flex flex-col items-center text-center py-16 px-6">
      {/* Heading */}
      <h1 className="text-3xl md:text-7xl font-bold text-gray-100 leading-tight max-w-4xl mt-20">
        Payroll made easy, <br />
        effortless and seamless.
        <span className="relative inline-block">
          <span className="absolute bottom-1 left-0 w-full h-2 bg-yellow-400 -z-10"></span>
        </span>
      </h1>

      {/* Subtitle */}
      <p className="text-gray-500 text-md max-w-2xl mt-6">
        Experience the future of payroll with blockchain-powered instant global payments, zero-knowledge privacy, and complete automation.
      </p>

      {/* Buttons */}
      <div className="mt-6 flex flex-col md:flex-row gap-4">
        <button className="bg-yellow-500 text-black font-semibold px-6 py-3 rounded-md shadow-md hover:bg-yellow-600 transition">
          Try Free Trial
        </button>
        <button className="border border-gray-200 text-gray-200 font-semibold px-6 py-3 rounded-md hover:bg-gray-100 hover:text-gray-900 transition">
          Request Demo
        </button>
      </div>

      {/* Image Container - Hidden on Mobile 
      <div className="hidden md:grid grid-cols-3 gap-6  mt-12">
        <div className="bg-gray-50 w-50 h-100 rounded-lg overflow-hidden">
          <img src="/images/dashboard.png" alt="Image 1" className="w-full h-full object-cover" />
        </div>
        <div className="bg-gray-400 w-500 h-500 rounded-lg overflow-hidden">
          <img src="/images/dashboard.png" alt="Image 2" className="w-full h-full object-cover" />
        </div>
        <div className="bg-gray-300 w-50 h-10 rounded-lg overflow-hidden">
          <img src="/path/to/image3.jpg" alt="Image 3" className="w-full h-full object-cover" />
        </div>
      </div>*/}
      <div className='flex justify-center items-center w-full h-screen text-white p-6'>
        <div className='flex flex-col w-1/6 h-full space-y-6 mx-5 my-5 gap-5 justify-center'>
            <div className='w-full h-1/3 rounded-lg overflow-hidden shadow-lg '>
                <img src="/images/hero1.jpg" alt="image 1" className='w-full h-full object-cover' />
            </div>
            <div className='w-full h-1/3 rounded-lg overflow-hidden shadow-lg '>
                <img src="/images/hero4.png" alt="image 2" className='w-full h-full object-cover' />
            </div>
        </div>
        <div className='w-full h-full flex justify-center items-center'>
            <div className='w-full h-full rounded-lg overflow-hidden  '>
                <img src="/images/dashboard.png" alt="big image" className='w-full h-full object-contain' />
            </div>
        </div>
        <div className='flex flex-col w-1/6 h-full space-y-6 mx-5 my-5 gap-5 justify-center '>
            <div className='w-full h-1/3 rounded-lg overflow-hidden shadow-lg'>
                <img src="/images/hero3.jpg" alt="image 3" className='w-full h-full object-cover' />
            </div>
            <div className='w-full h-1/3 rounded-lg overflow-hidden shadow-lg '>
                <img src="/images/hero2.jpg" alt="image 4" className='w-full h-full object-cover' />
            </div>
        </div>
    </div>
    </section>
  );
}