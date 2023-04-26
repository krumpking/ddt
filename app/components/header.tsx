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
                <h1 className='text-white xxs:text-2xl xs:text-3xl font-extrabold m-8 w-11/12'>Paperless at  <span className='text-yellow-500'>a click </span> of a button</h1>

                <p className='text-white text-lg mt-8 ml-8 mr-8'>We help organizations increase the return on their time by crafting and implementing their <span className='text-yellow-500'>Digital Strategy</span></p>
                <p className='text-white text-lg mt-8 ml-8 mr-8'> We also help build custom software for your business, like a website, mobile app, and desktop app, to help achieve the goals of your business</p>
                <div className='mt-8 ml-8 mr-8 flex flex-row justify-start'>
                    <button className={`bg-[#fdc92f] rounded-[30px] p-2`}>
                        <a className='text-xl   text-white text-center p-4' href='/signup'>Get Started</a>
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
