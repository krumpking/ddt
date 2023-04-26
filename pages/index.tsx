import type { NextPage } from 'next'
import React, { useState, useEffect } from 'react'
import { useAppDispatch, useAppSelector } from '../app/store/hooks';
import { selectPosition } from '../app/store/reducer';
import { PRIMARY_COLOR, WHATSAPP_CONTACT } from '../app/constants/constants';
import Nav from '../app/components/nav';
import Header from '../app/components/header';
import Carousel from '../app/components/carousel';




const Home: NextPage = () => {
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
    document.body.style.backgroundColor = PRIMARY_COLOR;


  }, []);

  const shownSlides = [
    {
      title: 'Benifit 1',
      description: 'Order 3 or more 4x6 photo prints in the month of October and get the same 3 in 6x9 FREE!',
      buttonText: 'Get this deal',
    },
    {
      title: 'Benifit 2',
      description: 'Order 3 or more 4x6 photo prints in the month of October and get the same 3 in 6x9 FREE!',
      buttonText: 'Get this deal',
    },
    {
      title: 'Benifit 3',
      description: 'Order 3 or more 4x6 photo prints in the month of October and get the same 3 in 6x9 FREE!',
      buttonText: 'Get this deal',
    },
  ]

  const testimonialSlidesData = [
    {
      name: 'Insane Deals',
      message: 'Order 3 or more 4x6 photo prints in the month of October and get the same 3 in 6x9 FREE!',
      image: '/images/test-1.png',
    },
    {
      name: 'Insane Deals',
      message: 'Order 3 or more 4x6 photo prints in the month of October and get the same 3 in 6x9 FREE!',
      image: '/images/unashe.png',
    },
    {
      name: 'Insane Deals',
      message: 'Order 3 or more 4x6 photo prints in the month of October and get the same 3 in 6x9 FREE!',
      image: '/images/test-1.png',
    },
  ]


  const slide = (title: string, description: string, buttonText: string) => {
    return (
      <div className="w-full h-96 rounded-lg">
        <h1 className='text-4xl text-white font-extrabold mb-4'>{title}</h1>
        <p className='text-white'>{description}</p>
        <button
          className='h-12 w-32 bg-white rounded-lg mt-32 mx-auto'>
          <p className='font-bold text-xl'>{buttonText}</p>
        </button>
      </div>


    )
  }

  const testimonialSlides = (name: string, testimonial: string, img: string) => {
    return (
      <div className="w-full h-96 rounded-lg flex flex-col items-center mb-8">
        <div className='bg-carousel w-full bg-no-repeat bg-center flex flex-col items-center'>
          <img src={img} className='h-96 w-fit' />
        </div>
        <h1 className='text-xl text-white font-extrabold mb-4'>{name}</h1>
        <p className='text-white'>{testimonial}</p>
      </div>


    )
  }


  const sendQuotation = () => {

  }

  return (
    <div className='relative bg-[#00947a] w-full h-full'>

      <div>
        <Nav />
      </div>
      <Header />
      <div className="rounded-t-[70px] bg-[#027f6d] text-center items-center content-center">
        <div id="discover">
          <img src='/images/start.png' className='mx-auto w-48 h-24' />
          <h1 className='text-white text-3xl font-bold'>Discover Templates , Export Examples</h1>
          <p className='text-white font-bold'>Description statement below carousel,statement below carousel,statement below carousel,statement below carousel,statement below carousel,statement below carousel,statement below carousel,statement below carousel,</p>
          <img src="/images/sample.png" className='h-full w-full' />

        </div>
        <div id="benefits">
          <Carousel children={shownSlides.map((v) => {
            return (
              slide(v.title, v.description, v.buttonText)
            )
          })} />
        </div>

        <div className='bg-[#fdc92f] w-full h-48 mt-24 flex flex-row p-8 items-center content-center justify-center space-x-5'>
          <div className='flex flex-col m-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-32 h-32 text-[#7d5c00]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3 3l8.735 8.735m0 0a.374.374 0 11.53.53m-.53-.53l.53.53m0 0L21 21M14.652 9.348a3.75 3.75 0 010 5.304m2.121-7.425a6.75 6.75 0 010 9.546m2.121-11.667c3.808 3.807 3.808 9.98 0 13.788m-9.546-4.242a3.733 3.733 0 01-1.06-2.122m-1.061 4.243a6.75 6.75 0 01-1.625-6.929m-.496 9.05c-3.068-3.067-3.664-7.67-1.79-11.334M12 12h.008v.008H12V12z" />
            </svg>

            <h1 className='font-bold text-[#7d5c00]'>Works Offline</h1>
          </div>
          <div className='flex flex-col m-4 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-32 h-32 text-[#7d5c00]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <h1 className='font-bold text-[#7d5c00]'>End to End Encryption</h1>
          </div>
          <div className='flex flex-col m-4 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-32 h-32 text-[#7d5c00]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
              <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
            </svg>
            <h1 className='font-bold text-[#7d5c00]'>Barcode/QR Code Scanner Functions</h1>
          </div>
          <div className='flex flex-col m-4 items-center'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-32 h-32 text-[#7d5c00]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z" />
            </svg>
            <h1 className='font-bold text-[#7d5c00]'>Hosted on the Cloud</h1>
          </div>

          <div className='flex flex-col m-4'>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-32 h-32 text-[#7d5c00]">
              <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 1.5H8.25A2.25 2.25 0 006 3.75v16.5a2.25 2.25 0 002.25 2.25h7.5A2.25 2.25 0 0018 20.25V3.75a2.25 2.25 0 00-2.25-2.25H13.5m-3 0V3h3V1.5m-3 0h3m-3 18.75h3" />
            </svg>
            <h1 className='font-bold text-[#7d5c00]'>Mobile Application</h1>
          </div>

        </div>
        <div className='p-8' id="action">
          <h1 className='text-white text-3xl font-bold m-4'>See it in action</h1>
          <p className='text-white m-4'>Description descr descr descr descr descr descrdescrdescrdescrdescrdescr descr descr descr descr descr descr descrdescrdescrdescr</p>
          <video className='w-full h-96 m-4' autoPlay={false} loop={true} controls>
            <source src={"/videos/shereigns.webm"} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
        <div className='p-8' id="testimonials">
          <h1 className='text-white text-3xl font-bold m-4'>What they say about Digital Data Tree</h1>
          <p className='text-white m-4'>Description descr descr descr descr descr descrdescrdescrdescrdescrdescr descr descr descr descr descr descr descrdescrdescrdescr</p>
          <Carousel children={testimonialSlidesData.map((v) => {
            return (
              testimonialSlides(v.name, v.message, v.image)
            )
          })} />

        </div>
        <div className='flex flex-col items-center content-center text-center rounded-t-[70px] bg-[#0fa991]   p-16 ' id="pricing">
          <div className='bg-[#fdc92f] text-[#7d5c00] rounded-[40px] p-4 font-bold  text-center m-auto shadow-xl '  >
            <h1 className='text-5xl m-8'>Get Free Quotation</h1>
            <form onSubmit={
              (e) => {
                e.preventDefault()
                sendQuotation()
              }
            }>

              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Fist Name and/or Middle Name"
                  onChange={(e) => {
                    setName(e.target.value)
                  }}
                  className="
                      w-full
                      rounded-[25px]
                      border-2
                      border-[#7d5c00]
                      py-3
                      px-5
                      bg-white
                      text-base text-body-color
                      placeholder-[#ACB6BE]
                      outline-none
                      focus-visible:shadow-none
                      focus:border-primary
                      "
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Surname/Last Name"
                  onChange={(e) => {
                    setSurname(e.target.value)
                  }}
                  className="
                      w-full
                      rounded-[25px]
                      border-2
                      border-[#7d5c00]
                      py-3
                      px-5
                      bg-white
                      text-base text-body-color
                      placeholder-[#ACB6BE]
                      outline-none
                      focus-visible:shadow-none
                      focus:border-primary
                      "
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Email"
                  onChange={(e) => {
                    setEmail(e.target.value)
                  }}
                  className="
                      w-full
                      rounded-[25px]
                      border-2
                      border-[#7d5c00]
                      py-3
                      px-5
                      bg-white
                      text-base text-body-color
                      placeholder-[#ACB6BE]
                      outline-none
                      focus-visible:shadow-none
                      focus:border-primary
                      "
                  required
                />
              </div>
              <div className="mb-6">
                <input
                  type="text"
                  placeholder="Phone (include country your code )"
                  onChange={(e) => {
                    setPhone(e.target.value)
                  }}
                  className="
                      w-full
                      rounded-[25px]
                      border-2
                      border-[#7d5c00]
                      py-3
                      px-5
                      bg-white
                      text-base text-body-color
                      placeholder-[#ACB6BE]
                      outline-none
                      focus-visible:shadow-none
                      focus:border-primary
                      "
                  required
                />
              </div>

              <div className="mb-10">
                <input
                  type="submit"
                  value={"Send Me My Free Quotation"}
                  className="
                      font-bold
                        w-full
                        rounded-[25px]
                      border-2
                      border-[#7d5c00]
                        border-primary
                        py-3
                        px-5
                        bg-[#7d5c00]
                        text-base 
                        text-white
                        cursor-pointer
                        hover:bg-opacity-90
                        transition
                        "
                />
              </div>
            </form>




          </div>


          <h1>Want to go paperless </h1>
          <h1>Get Started with Digital Data Tree Now</h1>
          <div className='grid grid-cols-3 w-full'>

            <h1 className='text-[#027f6d] text-5xl font-bold p-4'>
              Start Now
            </h1>
            <button className='bg-[#fdc92f] text-[#7d5c00] rounded-[40px] p-4 font-bold text-5xl text-center m-auto' >
              Start Now
            </button>
            <h1 className='text-[#027f6d] text-5xl font-bold p-4'>
              Start Now
            </h1>

          </div>

          <div>
            <h1>Digital Data Tree</h1>
          </div>
          <div className='grid grid-cols-3 w-full'>

            <p className='text-white'>
              Start Now
            </p>
            <p className='text-white' >
              Start Now
            </p>
            <p className='text-white'>
              Start Now
            </p>

          </div>

        </div>

      </div>
      <a href={WHATSAPP_CONTACT}>
        <img src='/images/whatsapp.png' className={'animate-bounce fixed bottom-20  right-10 h-16 w-16'} />
      </a>

    </div >
  )
}

export default Home
