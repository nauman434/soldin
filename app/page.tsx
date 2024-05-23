import Form from '@/components/Form'
import Navbar from '@/components/Navbar'
import Image from 'next/image'
import React from 'react'

const page = () => {
  return (
    <section className='grid md:grid-cols-12 grid-cols-1 h-[100vh]'>
      <div className='col-span-6'>
        <Navbar />
        <div className='mt-[50px] lg:px-[55px] px-[24px] mb-[50px]'>
          <Form />
        </div>
      </div>
      <div className="col-span-6 bg-gray-200 fixed top-0 right-0 w-[50%] hidden md:block">
        <div className="relative h-[100vh]">
          <Image src={'/backgroundImg.png'} fill alt="Background" className="bg-cover bg-left fixed" />
        </div>
      </div>
    </section>
  )
}

export default page