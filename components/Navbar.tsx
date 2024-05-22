import { InstagramIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const Navbar = () => {
    return (
        <div className='flex items-center justify-between h-[53px] border-b border-b-[#B3B3B3] px-[55px]'>
            <div className='flex items-center gap-'>
                <Link href={'/'} className='cursor-pointer'>
                    <div className='bg-[#D9060C] py-1 px-4'>
                        <h2 className='font-bold text-xl text-white'>SOLD IN</h2>
                    </div>
                </Link>
                <div className='bg-transparent py-1 px-4'>
                    <h2 className='font-bold text-xl '>MIAMI</h2>
                </div>
            </div>
            <div className='flex items-center gap-4'>
                <div>
                    <Link href={'/'} className='font-medium'>
                        FAQ
                    </Link>
                </div>
                <div>
                    <Link href={'/'} className=''>
                        <InstagramIcon className='w-6 h-6' />
                    </Link>

                </div>
            </div>
        </div>
    )
}

export default Navbar