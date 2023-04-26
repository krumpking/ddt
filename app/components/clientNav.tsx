import React, { FC, useState } from 'react'
import { Audio } from 'react-loader-spinner';


interface MyProps {
    organisationName: string,

}

const ClientNav: FC<MyProps> = ({ organisationName }) => {
    const [navItems, setNavItems] = useState([
        {
            title: 'Home',
            url: '/clienthome'
        },
        {
            title: 'Home',
            url: '/clienthome'
        },
        {
            title: 'Home',
            url: '/clienthome'
        },
        {
            title: 'Home',
            url: '/clienthome'
        },
    ])
    return (
        <div className='bg-[#00947a] h-screen col-span-2 m-8 rounded-[30px] flex flex-col items-center'>

            <img src="/images/whatsapp.png" className='h-24 w-24 my-6' />
            <h1 className='text-white font-bold'>{organisationName}</h1>
            <a>
                <div className='grid grid-cols-5'>


                </div>
            </a>

        </div>
    )
};


export default ClientNav