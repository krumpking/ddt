import axios from 'axios';
import Link from 'next/link';
import React, { FC, useEffect, useState } from 'react'
import { Audio } from 'react-loader-spinner';
import Drawer from './drawer';
import { ADMIN_ID, DOWNLOAD_APP, PERSON_ROLE, WHATSAPP_CONTACT } from '../constants/constants';
import { getCookie } from 'react-use-cookie';
import { decrypt } from '../utils/crypto';
import { COOKIE_AFFILIATE_NUMBER } from '../constants/affilliateConstants';
import { print } from '../utils/console';


interface MyProps {
    organisationName: string,
    url: string,
}

const ClientNav: FC<MyProps> = ({ organisationName, url }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [affiliateNo, setAffiliateNo] = useState(0);
    const [role, setRole] = useState("");

    useEffect(() => {
        document.body.style.backgroundColor = '#00947a';

        var infoFormCookie = getCookie(COOKIE_AFFILIATE_NUMBER);
        if (typeof infoFormCookie !== 'undefined') {

            if (infoFormCookie.length > 0) {

                setAffiliateNo(parseInt(infoFormCookie));
            }
        }

        var roleCookie = getCookie(PERSON_ROLE);
        if (typeof roleCookie !== 'undefined') {

            if (roleCookie.length > 0) {
                setRole(decrypt(getCookie(PERSON_ROLE), ADMIN_ID))
                setAffiliateNo(parseInt(infoFormCookie));
            }
        }





    }, []);


    const handleDownload = async () => {


        const link = document.createElement("a");
        link.href = `/apk/app.apk`;
        link.download = "app.apk";
        link.click();

    };

    return (
        <div>
            <div className='hidden lg:block w-fit'>
                <div className='bg-[#00947a] h-full m-8 rounded-[30px] flex flex-col items-center shadow-md px-8'>

                    <img src="/images/logowhitebg.png" className='h-24 w-24 my-6 rounded-xl' />
                    <h1 className={affiliateNo > 0 ? 'text-white font-bold ' : 'text-white font-bold mb-6'}>{'Digital Data Tree'}</h1>
                    {affiliateNo > 0 ?
                        <p className='text-sm text-white px-2'>Affiliate No {affiliateNo}</p> : <p></p>
                    }
                    <div className='flex flex-col space-y-4'>

                        <a href={'/home'} className={url === 'home' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 col-span-1 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <h1 className='col-span-3 text-white'>Home</h1>
                            </div>
                        </a>
                        <a href={'/users'} className={`${role !== 'Admin' ? 'hidden' : ''} ${url === 'users' ? 'bg-[#0fa991] p-2 rounded-[25px]' : 'p-2 rounded-[25px]'}`}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                </svg>


                                <h1 className='col-span-3 text-white'>Manage Users</h1>
                            </div>
                        </a>
                        <a href={'/crm'} className={url === 'crm' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>


                                <h1 className='col-span-3 text-white'>CRM</h1>
                            </div>
                        </a>
                        <a href={'/erp'} className={url === 'erp' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                </svg>


                                <h1 className='col-span-3 text-white'>ERP</h1>
                            </div>
                        </a>
                        <a href={'/accounting'} className={url === 'accounting' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>



                                <h1 className='col-span-3 text-white'>Accounting</h1>
                            </div>
                        </a>
                        <a href={'/inventory'} className={url === 'inventory' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg>


                                <h1 className='col-span-3 text-white'>Inventory</h1>
                            </div>
                        </a>
                        <a href={'/events'} className={url === 'events' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                                </svg>



                                <h1 className='col-span-3 text-white'>Events </h1>
                            </div>
                        </a>
                        <a href={'/forms'} className={url === 'forms' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                                <h1 className='col-span-3 text-white'>Custom Reports</h1>
                            </div>
                        </a>


                        <a href={'/payments'} className={`${role !== 'Admin' ? 'hidden' : ''} ${url === 'payments' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}`}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                </svg>

                                <h1 className='col-span-3 text-white'>My Payments</h1>
                            </div>
                        </a>
                        <a href={WHATSAPP_CONTACT} className={url === 'support' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                                <h1 className='col-span-3 text-white'>Support</h1>
                            </div>
                        </a>
                        <a href={DOWNLOAD_APP}
                            className='
                                font-bold
                                w-full
                                rounded-[25px]
                                border-2
                                border-[#fdc92f]
                                border-primary
                                py-2
                                px-5
                                bg-[#fdc92f]
                                text-base 
                                text-center
                                text-[#7d5c00]
                                cursor-pointer
                                hover:bg-opacity-90
                                transition
                                '>
                            Download App
                        </a>

                        <Link href={'/privacyPolicy'}>
                            <p className='text-center text-xs text-gray-300 mb-4 font-bold underline'>Privacy Policy</p>
                        </Link>
                    </div >

                </div >
            </div>
            <div className='flex flex-row-reverse lg:hidden '>
                <button className='rounded-full shadow-2xl bg-[#fdc92f] p-4 m-4' onClick={() => setIsOpen(!isOpen)}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="text-[#7d5c00] w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 5.25h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5m-16.5 4.5h16.5" />
                    </svg>
                </button>
                <Drawer isOpen={isOpen} setIsOpen={setIsOpen}>
                    <img src="/images/logowhitebg.png" className='h-24 w-24 my-6 rounded-xl' />
                    <h1 className='text-white font-bold mb-6'>{'Digital Data Tree'}</h1>
                    <div className='flex flex-col space-y-4'>
                        <a href={'/home'} className={url === 'home' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full '>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 col-span-1 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
                                </svg>
                                <h1 className='col-span-3 text-white'>Home</h1>
                            </div>
                        </a>
                        <a href={'/users'} className={`${role !== 'Admin' ? 'hidden' : ''} ${url === 'users' ? 'bg-[#0fa991] p-2 rounded-[25px]' : 'p-2 rounded-[25px]'}`}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 9h3.75M15 12h3.75M15 15h3.75M4.5 19.5h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5zm6-10.125a1.875 1.875 0 11-3.75 0 1.875 1.875 0 013.75 0zm1.294 6.336a6.721 6.721 0 01-3.17.789 6.721 6.721 0 01-3.168-.789 3.376 3.376 0 016.338 0z" />
                                </svg>


                                <h1 className='col-span-3 text-white'>Manage Users</h1>
                            </div>
                        </a>
                        <a href={'/crm'} className={url === 'crm' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>


                                <h1 className='col-span-3 text-white'>CRM</h1>
                            </div>
                        </a>
                        <a href={'/erp'} className={url === 'erp' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 6h9.75M10.5 6a1.5 1.5 0 11-3 0m3 0a1.5 1.5 0 10-3 0M3.75 6H7.5m3 12h9.75m-9.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-3.75 0H7.5m9-6h3.75m-3.75 0a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m-9.75 0h9.75" />
                                </svg>


                                <h1 className='col-span-3 text-white'>ERP</h1>
                            </div>
                        </a>
                        <a href={'/accounting'} className={url === 'accounting' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m5.231 13.481L15 17.25m-4.5-15H5.625c-.621 0-1.125.504-1.125 1.125v16.5c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9zm3.75 11.625a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
                                </svg>



                                <h1 className='col-span-3 text-white'>Accounting</h1>
                            </div>
                        </a>
                        <a href={'/inventory'} className={url === 'inventory' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M20.25 6.375c0 2.278-3.694 4.125-8.25 4.125S3.75 8.653 3.75 6.375m16.5 0c0-2.278-3.694-4.125-8.25-4.125S3.75 4.097 3.75 6.375m16.5 0v11.25c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125V6.375m16.5 0v3.75m-16.5-3.75v3.75m16.5 0v3.75C20.25 16.153 16.556 18 12 18s-8.25-1.847-8.25-4.125v-3.75m16.5 0c0 2.278-3.694 4.125-8.25 4.125s-8.25-1.847-8.25-4.125" />
                                </svg>


                                <h1 className='col-span-3 text-white'>Inventory</h1>
                            </div>
                        </a>
                        <a href={'/events'} className={url === 'events' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 013.75 9.375v-4.5zM3.75 14.625c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5a1.125 1.125 0 01-1.125-1.125v-4.5zM13.5 4.875c0-.621.504-1.125 1.125-1.125h4.5c.621 0 1.125.504 1.125 1.125v4.5c0 .621-.504 1.125-1.125 1.125h-4.5A1.125 1.125 0 0113.5 9.375v-4.5z" />
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 6.75h.75v.75h-.75v-.75zM6.75 16.5h.75v.75h-.75v-.75zM16.5 6.75h.75v.75h-.75v-.75zM13.5 13.5h.75v.75h-.75v-.75zM13.5 19.5h.75v.75h-.75v-.75zM19.5 13.5h.75v.75h-.75v-.75zM19.5 19.5h.75v.75h-.75v-.75zM16.5 16.5h.75v.75h-.75v-.75z" />
                                </svg>



                                <h1 className='col-span-3 text-white'>Events </h1>
                            </div>
                        </a>
                        <a href={'/forms'} className={url === 'forms' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                                <h1 className='col-span-3 text-white'>Custom Reports</h1>
                            </div>
                        </a>


                        <a href={'/payments'} className={`${role !== 'Admin' ? 'hidden' : ''} ${url === 'payments' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}`}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                </svg>

                                <h1 className='col-span-3 text-white'>My Payments</h1>
                            </div>
                        </a>
                        <a href={WHATSAPP_CONTACT} className={url === 'support' ? 'bg-[#0fa991] p-2 rounded-[25px] ' : 'p-2 rounded-[25px]'}>
                            <div className='grid grid-cols-4 w-full'>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="col-span-1 w-6 h-6 text-white justify-self-center">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
                                </svg>
                                <h1 className='col-span-3 text-white'>Support</h1>
                            </div>
                        </a>
                        <a href={DOWNLOAD_APP}
                            className='
                                font-bold
                                w-full
                                rounded-[25px]
                                border-2
                                border-[#fdc92f]
                                border-primary
                                py-2
                                px-5
                                bg-[#fdc92f]
                                text-base 
                                text-center
                                text-[#7d5c00]
                                cursor-pointer
                                hover:bg-opacity-90
                                transition
                                '>
                            Download App
                        </a>

                        <Link href={'/privacyPolicy'}>
                            <p className='text-center text-xs text-gray-300 mb-4 font-bold underline'>Privacy Policy</p>
                        </Link>
                    </div>
                </Drawer>
            </div>
        </div >

    )
};


export default ClientNav