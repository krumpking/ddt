import React, { useState } from 'react'
import { FC } from 'react';
import { FIFTH_COLOR, WHATSAPP_CONTACT } from '../constants/constants';
import Carousel from './carousel';
import Link from 'next/link';
import PrimaryButton from './primaryButton';
import MainCarousel from './mainCarousel';




const Header = () => {

    return (
        <div className='grid grid-cols-1 afterMini:grid-cols-10 p-4' id='home'>
            <div className='col-span-4 lg:col-span-5  lg:p-0 flex flex-col m-4    afterMini:bg-none afterMini:border-none p-4'>
                <h1 className='text-white xxs:text-2xl xs:text-3xl font-extrabold m-8 w-11/12'>More  <span className='text-yellow-500'>Time </span> More  <span className='text-yellow-500'>Money </span> </h1>

                <p className='text-white text-lg mt-8 ml-8 mr-8'>Our data management workflow empowers you to efficiently and securely organize your data, unlock valuable insights, and save time and money with just one click.</p>
                <p className='text-white text-lg mt-8 ml-8 mr-8'> By streamlining workflows, reducing errors, and improving collaboration across teams, Digital Data Tree's system makes it easy to keep your data organized and secure, while also reducing the risk of data breaches or other security incidents. </p>

                <div className='mt-8 ml-8 mr-8 flex flex-row justify-start'>
                    <button className={`bg-[#fdc92f] rounded-[30px] p-2`}>
                        <a className='text-xl  text-[#7d5c00] text-center p-4' href='/signup'>Get Started</a>
                    </button>
                    <Link href="#benefits"><p className="m-2 text-white p-2 text-xl">See more</p></Link>

                </div>
            </div>
            <div className='col-span-6 lg:col-span-5 w-full'>
                <MainCarousel />
            </div>

        </div>
    )
};


export default Header
