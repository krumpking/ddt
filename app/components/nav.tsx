import React, { useState } from 'react'
import { FC } from 'react';
import { FIFTH_COLOR } from '../constants/constants';




const Nav = () => {
    const [navItems, setNavItems] = useState([
        {
            name: 'Home',
            url: '/home',
        },
        {
            name: 'Discover',
            url: '/home',
        },
        {
            name: 'Benefits',
            url: '/home',
        },
        {
            name: 'FAQ',
            url: '/home',
        },
        {
            name: 'Sign Up',
            url: '/home',
        },
        {
            name: 'Log In',
            url: '/home',
        },
    ])

    return (
        <div className="flex justify-between items-center text-white">
            <div>
                <h1 className='text-xl font-bold px-4'>Digital Data Tree</h1>
            </div>
            <div className='flex flex-row space-x-4 px-20'>
                {navItems.map((v, index) => {
                    if (index === 5) {
                        return (<div className={`bg-[#fdc92f] rounded-[20px] p-2`}>
                            <a className='text-xl   text-white text-center'>{v.name}</a>
                        </div>)
                    } else {
                        return (<a className='text-xl  p-2'>{v.name}</a>)
                    }
                })}

            </div>

        </div>
    )
};


export default Nav
