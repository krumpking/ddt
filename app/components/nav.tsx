import React, { useEffect, useState } from 'react'
import { FC } from 'react';
import { FIFTH_COLOR } from '../constants/constants';







const Nav = () => {
    const [navItems, setNavItems] = useState([
        {
            name: 'Discover',
            url: '#home',
        },
        {
            name: 'Benefits',
            url: '#benefits',
        },
        {
            name: 'See it in action',
            url: '#action',
        },
        {
            name: 'Testimonials',
            url: '#testimonials',
        },
        {
            name: 'Pricing',
            url: '#pricing',
        },
        {
            name: 'Sign Up',
            url: '/signup',
        },
        {
            name: 'Log In',
            url: '/login',
        },
    ]);
    const [res, setRes] = useState("");

    useEffect(() => {

        // let encrypt = Crypto.simpleEncrypt('I love the Lord Jesus', 'my 32 length key................');
        // console.log(encrypt);
        // const res = Crypto.simpleDecrypt('·î£ÓØÜáØÙÌ£', 'my 32 length key................');
        // console.log(res);

    }, [])


    return (
        <div className="flex justify-between items-center text-white p-4 m-8">
            <div>
                <h1 className='text-3xl font-bold px-4'>Digital Data Tree</h1>
            </div>
            <div className='flex flex-row space-x-4 px-20'>
                {navItems.map((v, index) => {
                    if (index === 5 || index === 6) {
                        return (<div className={`bg-[#fdc92f] rounded-[20px] p-2`}>
                            <a className='text-xl   text-white text-center p-4' href={v.url}>{v.name}</a>
                        </div>)
                    } else {
                        return (<a className='text-xl  p-2' href={v.url}>{v.name}</a>)
                    }
                })}

            </div>

        </div>
    )
};


export default Nav
