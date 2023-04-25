import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { selectPosition } from '../app/store/reducer';
import { PRIMARY_COLOR, WHATSAPP_CONTACT } from '../app/constants/constants';
import Nav from '../app/components/nav';
import Header from '../app/components/header';
import Carousel from '../app/components/carousel';




const Home: NextPage = () => {

  useEffect(() => {
    document.body.style.backgroundColor = PRIMARY_COLOR;


  }, []);

  const shownSlides = [
    {
      title: 'Insane Deals',
      description: 'Order 3 or more 4x6 photo prints in the month of October and get the same 3 in 6x9 FREE!',
      buttonText: 'Get this deal',
    },
    {
      title: 'Crazy Deals',
      description: 'Order 3 or more 4x6 photo prints in the month of October and get the same 3 in 6x9 FREE!',
      buttonText: 'Get this deal',
    },
    {
      title: 'Crazy Deals',
      description: 'Order 3 or more 4x6 photo prints in the month of October and get the same 3 in 6x9 FREE!',
      buttonText: 'Get this deal',
    },
  ]


  const slide = (title: string, description: string, buttonText: string) => {
    return (
      <div className=" shadow-md  w-full h-96 rounded-lg">
        <h1 className='text-4xl text-cyan-900 font-extrabold mb-4'>{title}</h1>
        <p className='text-white'>{description}</p>
        <button
          className='h-12 w-32 bg-white rounded-lg mt-32 mx-auto'>
          <p className='font-bold text-xl'>{buttonText}</p>
        </button>
      </div>


    )
  }




  return (
    <div className='relative'>

      <div>
        <Nav />
      </div>
      <Header />
      <div className="rounded-t-[70px] bg-[#027f6d] text-center items-center content-center">
        <img src='/images/start.png' className='mx-auto w-48 h-24' />
        <h1 className='text-white text-3xl font-bold'>Headline of second carousel</h1>
        <p className='text-white font-bold'>Description statement below carousel,statement below carousel,statement below carousel,statement below carousel,statement below carousel,statement below carousel,statement below carousel,statement below carousel,</p>
        <img src="/images/sample.png" className='h-full w-full' />
        <Carousel children={shownSlides.map((v) => {
          return (
            slide(v.title, v.description, v.buttonText)
          )
        })} />


      </div>
      <a href={WHATSAPP_CONTACT}>
        <img src='/images/whatsapp.png' className={'animate-bounce fixed bottom-20  right-10 h-16 w-16'} />
      </a>

    </div>
  )
}

export default Home
