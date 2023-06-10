import React, { Fragment, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { LIGHT_GRAY, URL_LOCK_ID } from '../../app/constants/constants';
import Payment from '../../app/utils/paymentUtil';
import ClientNav from '../../app/components/clientNav';
import ReactTable from "react-table";
import { getSpecificData } from '../../app/api/adminApi';
import { IData, IDynamicObject } from '../../app/types/types';
import { forEach } from 'lodash';
import { decrypt, simpleDecrypt } from '../../app/utils/crypto';
import Loader from '../../app/components/loader';
import { isBase64 } from '../../app/utils/stringM';
import { downloadExcel } from '../../app/utils/excel';
import { print } from '../../app/utils/console';
import ReactGA from 'react-ga';
import { Dialog, Transition } from '@headlessui/react';
import ReturnElements from '../../app/components/returnElements';



const DataDisplay = () => {
    const router = useRouter();
    const [data, setData] = useState<IData>();
    const [loading, setLoading] = useState(true);
    const [imageBase64, setImageBase64] = useState("");
    const [excelData, setExcelData] = useState<any>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [columnLayout, setColumnLayout] = useState(true);
    const [rowInfo, setRowInfo] = useState<any[]>([]);





    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;

        ReactGA.initialize('AW-11208371394');
        ReactGA.pageview(window.location.pathname + window.location.search);


        checkPayment();

        if (router.isReady) {
            const { id } = router.query;

            if (typeof id == 'string') {


                if (id.length > 0) {
                    var infoId = decrypt(id, URL_LOCK_ID);

                    getSpecificData(infoId).then((v) => {

                        if (v != null) {
                            var element = v.data;


                            setData({
                                id: element.id,
                                title: element.data().title,
                                descr: element.data().descr,
                                date: element.data().date,
                                editorId: element.data().editorId,
                                encryption: element.data().encryption,
                                info: element.data().info,
                                infoId: element.data().infoId
                            });

                            setLoading(false);

                        }





                    }).catch((e: any) => {
                        setLoading(false);
                        console.error(e);
                    });
                } else {
                    toast.warn('Form Data not found');
                    router.push({
                        pathname: '/login',
                    });
                }

            }
        }





    }, [router.isReady]);

    const checkPayment = async () => {
        const paymentStatus = await Payment.checkPaymentStatus();
        if (!paymentStatus) {
            toast.warn('It appears your payment is due, please pay up to continue enjoying Digital Data Tree');

            setTimeout(() => {
                router.push({
                    pathname: '/payments',
                });
            }, 5000);

        }
    }






    return (
        <div>
            <div className='flex flex-col lg:grid lg:grid-cols-12'>

                <div className='lg:col-span-3'>
                    <ClientNav organisationName={'Vision Is Primary'} url={'data'} />
                </div>



                <div className='bg-white lg:col-span-9 m-8 rounded-[30px]'>

                    {loading ?
                        <div className='flex flex-col justify-center items-center w-full col-span-8'>
                            <Loader />
                        </div> :
                        <div className='p-4 lg:p-8 2xl:p-16 rounded-md flex flex-col'>
                            <div className="overflow-x-auto ">
                                <table className="w-full p-2 m-1 rounded-md border-2">
                                    <thead className='bg-[#00947a] text-white font-bold'>
                                        <tr>
                                            {data?.info[0].data.map((v: any) => (
                                                <th key={v.label} className='text-left w-96'>{v.label}</th>
                                            ))}
                                        </tr>


                                    </thead>
                                    <tbody>

                                        {
                                            data?.info.map((value, index) => {



                                                return (
                                                    <tr key={index} className={'odd:bg-white even:bg-slate-50 hover:bg-[#0ead96] hover:text-white hover:cursor-pointer'} onClick={() => { setIsOpen(true); setRowInfo(data.info[index].data) }}>
                                                        {data?.info[index].data.map((v: any) => {
                                                            var resInfo = simpleDecrypt(v.info, data.infoId + data.infoId + data.infoId);

                                                            return (
                                                                <td className='text-left' key={v.info}>{resInfo}</td>
                                                            )


                                                        })

                                                        }

                                                    </tr>
                                                )
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>
                            <div>
                                <button
                                    onClick={() => {
                                        setLoading(true);

                                        var exlD: any[] = [];
                                        data?.info.forEach(element => {
                                            const object: IDynamicObject = {};
                                            element.data.forEach((el: any) => {
                                                var resInfo = simpleDecrypt(el.info, data.infoId + data.infoId + data.infoId);
                                                object[el.label] = resInfo;
                                            });
                                            exlD.push(object);


                                        });

                                        downloadExcel(exlD, typeof data?.title === 'undefined' ? 'info' : data?.title);
                                        setLoading(false);
                                    }}
                                    className="
                                font-bold
                                    w-full
                                    rounded-[25px]
                                border-2
                                border-[#fdc92f]
                                    border-primary
                                    py-3
                                    px-5
                                    bg-[#fdc92f]
                                    text-base 
                                    text-[#7d5c00]
                                    cursor-pointer
                                    hover:bg-opacity-90
                                    transition
                                    "
                                >Download Table as Excel File</button>
                            </div>

                        </div>}
                </div>
                <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                        as="div"
                        className="fixed inset-0 z-10 overflow-y-auto"
                        onClose={() => setIsOpen(false)}
                    >
                        <div className="min-h-screen px-4 text-center backdrop-blur-sm ">
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0"
                                enterTo="opacity-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100"
                                leaveTo="opacity-0"
                            >
                                <Dialog.Overlay className="fixed inset-0" />
                            </Transition.Child>

                            <span
                                className="inline-block h-screen align-middle"
                                aria-hidden="true"
                            >
                                &#8203;
                            </span>
                            <Transition.Child
                                as={Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 scale-95"
                                enterTo="opacity-100 scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 scale-100"
                                leaveTo="opacity-0 scale-95"
                            >
                                <div className="bg-white my-8 inline-block w-full  transform overflow-hidden rounded-2xl p-6 text-left align-middle shadow-xl transition-all">

                                    <Dialog.Title
                                        as="h3"
                                        className="text-sm font-medium leading-6 text-gray-900 m-4 grid grid-cols-5 items-center justify-items-center"
                                    >

                                        <button className='flex flex-col items-center' onClick={() => { setColumnLayout(true); }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 rotate-90 flex flex-col justify-center">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
                                            </svg>
                                            View as Column
                                        </button>
                                        <button className='flex flex-col items-center' onClick={() => { setColumnLayout(false); }}>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z" />
                                            </svg>
                                            View as Grid
                                        </button>
                                        <button className='flex flex-col items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                            </svg>
                                            Download as Word Document
                                        </button>
                                        <button className='flex flex-col items-center'>
                                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m.75 12l3 3m0 0l3-3m-3 3v-6m-1.5-9H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                                            </svg>
                                            Download as PDF Document
                                        </button>


                                    </Dialog.Title>

                                    <div className={columnLayout ? 'flex flex-col items-center' : 'grid grid-cols-2'}>
                                        {rowInfo.map((v: any) => {

                                            return (
                                                <div>
                                                    {typeof data !== 'undefined' ? <ReturnElements num={v.element} info={v.info} code={`${data.infoId + data.infoId + data.infoId}`} codeId={data.infoId} /> : ''}
                                                </div>
                                            )
                                        })}

                                    </div>


                                </div>
                            </Transition.Child>
                        </div>
                    </Dialog>
                </Transition>



            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default DataDisplay
