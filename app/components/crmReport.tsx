import React, { Fragment, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { ADMIN_ID, COOKIE_ID, LIGHT_GRAY, PERSON_ROLE, URL_LOCK_ID } from '../../app/constants/constants';
import Payment from '../../app/utils/paymentUtil';
import { decrypt } from '../../app/utils/crypto';
import Loader from '../../app/components/loader';
import { searchStringInMembers } from '../../app/utils/stringM';
import { getAllClientsToDB } from '../api/crmApi';
import { getCookie } from 'react-use-cookie';
import { IClient } from '../types/userTypes';
import DateMethods from '../utils/date';
import { print } from '../utils/console';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'react-chartjs-2';
import { randomRGBAColor } from '../utils/colorM';
import { findOccurrences } from '../utils/arrayM';




export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

ChartJS.register(ArcElement, Tooltip, Legend);


const CRMReport = () => {
    const router = useRouter();
    const [clients, setClients] = useState<IClient[]>([]);
    const [tempClients, setTempClients] = useState<IClient[]>([]);
    const [totalQuotations, setTotalQuotations] = useState(0);
    const [loading, setLoading] = useState(false);
    const [totalInvoices, setTotalInvoices] = useState(0);
    const [totalReceipts, setTotalReceipts] = useState(0);
    const [labels, setLabels] = useState(['Created', 'Name', 'Stage', 'Value']);
    const [sortDateUp, setSortDateUp] = useState(false);
    const [search, setSearch] = useState("");
    const [totalValue, setTotalValue] = useState(0);
    const [products, setProducts] = useState<any>(data);
    const [sales, setSales] = useState<any>(data);
    const [stage, setStage] = useState<any>(data);
    const [totalFinished, setTotalFinished] = useState<any[]>([]);


    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;


        checkPayment();
        setClients([]);
        setTempClients([]);
        getClientsFromDB();

        let role = getCookie(PERSON_ROLE);
        var infoFromCookie = "";
        if (getCookie(ADMIN_ID) == "") {
            infoFromCookie = getCookie(COOKIE_ID);
        } else {
            infoFromCookie = getCookie(ADMIN_ID);
        }

        if (typeof role !== 'undefined') {
            if (role !== "") {
                var id = decrypt(infoFromCookie, COOKIE_ID);
                var roleTitle = decrypt(role, id);
                if (roleTitle == "Editor") { // "Viewer" //"Editor"
                    router.push('/home');
                    toast.info("You do not have permission to access this page");
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

    const getClientsFromDB = () => {
        setLoading(true);

        getAllClientsToDB().then((v) => {

            var infoFromCookie = "";
            if (getCookie(ADMIN_ID) == "") {
                infoFromCookie = getCookie(COOKIE_ID);
            } else {
                infoFromCookie = getCookie(ADMIN_ID);
            }
            var id = decrypt(infoFromCookie, COOKIE_ID)
            if (v !== null) {
                var clnts: any[] = [];
                let totVal = 0;
                let prods: any = [];
                let sls: any = [];
                let stag: any = [];
                let finished: any = [];
                v.data.forEach(element => {

                    var notesA: any = [];
                    element.data().notes.forEach((el: string) => {
                        notesA.push(decrypt(el, id));
                    });


                    var prodA: any = [];
                    element.data().enquired.forEach((el: string) => {
                        prodA.push(decrypt(el, id));
                    });

                    let value = decrypt(element.data().value, id);

                    if (!isNaN(parseInt(value))) {
                        totVal += parseFloat(value);
                    }

                    var client = {
                        docId: element.id,
                        id: element.data().id,
                        adminId: element.data().adminId,
                        date: element.data().date,
                        name: decrypt(element.data().name, id),
                        contact: decrypt(element.data().contact, id),
                        organisation: decrypt(element.data().organisation, id),
                        stage: decrypt(element.data().stage, id),
                        notes: notesA,
                        refSource: decrypt(element.data().refSource, id),
                        enquired: prodA,
                        value: value,
                        salesPerson: decrypt(element.data().salesPerson, id),
                    }
                    prods = prods.concat(prodA);
                    sls.push(decrypt(element.data().salesPerson, id));
                    clnts.push(client);
                    stag.push(decrypt(element.data().stage, id));
                    if (decrypt(element.data().stage, id) === "Project Started"
                        || decrypt(element.data().stage, id) == "Project In Progress"
                        || decrypt(element.data().stage, id) == "Project Finished"
                        || decrypt(element.data().stage, id) == "Receipt Sent") {
                        finished.push(clnts);
                    }


                });
                setClients(clnts);
                setTotalFinished(finished);
                setTempClients(clnts);
                setTotalValue(totVal);
                const uniqueProducts = prods.reduce((accumulator: any[], string: any) => {
                    if (!accumulator.includes(string)) {
                        accumulator.push(string);
                    }
                    return accumulator;
                }, []);


                let p = {
                    labels: uniqueProducts,
                    datasets: [
                        {
                            label: '# of Quotations/Invoice/Receipts',
                            data: uniqueProducts.map((v: any) => findOccurrences(prods, v)),
                            backgroundColor: uniqueProducts.map(() => (randomRGBAColor())),
                            borderColor: uniqueProducts.map(() => (randomRGBAColor())),
                            borderWidth: 2,
                        },
                    ],
                }

                setProducts(p);
                const uniqueSales = sls.reduce((accumulator: any[], string: any) => {
                    if (!accumulator.includes(string)) {
                        accumulator.push(string);
                    }
                    return accumulator;
                }, []);
                let s = {
                    labels: uniqueSales,
                    datasets: [
                        {
                            label: '# of Quotations',
                            data: uniqueSales.map((v: any) => findOccurrences(sls, v)),
                            backgroundColor: uniqueSales.map(() => (randomRGBAColor())),
                            borderColor: uniqueSales.map(() => (randomRGBAColor())),
                            borderWidth: 2,
                        },
                    ],
                }

                setSales(s);
                const uniqueStage = stag.reduce((accumulator: any[], string: any) => {
                    if (!accumulator.includes(string)) {
                        accumulator.push(string);
                    }
                    return accumulator;
                }, []);


                let st = {
                    labels: uniqueStage,
                    datasets: [
                        {
                            label: '# of Quotations',
                            data: uniqueStage.map((v: any) => findOccurrences(stag, v)),
                            backgroundColor: uniqueSales.map(() => (randomRGBAColor())),
                            borderColor: uniqueStage.map(() => (randomRGBAColor())),
                            borderWidth: 2,
                        },
                    ],
                }
                setStage(st);


            }

            setLoading(false);
        }).catch((e) => {
            console.error(e);
            setLoading(false);
        });


    }

    const sortClients = () => {
        setLoading(true);
        setSortDateUp(!sortDateUp);
        setClients([]);
        var res = DateMethods.sortObjectsByDate(clients, sortDateUp);
        setTimeout(() => {
            setTempClients(res);
            setLoading(false);
        }, 2000);
    }


    const handleKeyDown = (event: { key: string; }) => {

        if (event.key === 'Enter') {
            setLoading(true);
            if (search !== '') {


                let res: IClient[] = searchStringInMembers(clients, search);
                setTimeout(() => {

                    if (res.length > 0) {
                        setTempClients(res);
                    } else {
                        toast.info(`${search} not found`);
                        setTempClients(clients);
                    }

                    setLoading(false);
                }, 1500);


            } else {

                toast.info(`${search} not found`);
                setTempClients(clients);
                setLoading(false);


            }



        }
    };


    return (
        <div>
            <div className='flex flex-col '>






                {loading ?
                    <div className='flex flex-col justify-center items-center w-full col-span-8'>
                        <Loader />
                    </div> :
                    <>
                        <div className='shadow-2xl rounded-[25px] flex flex-col p-4'>
                            <h1 className='px-4 text-2xl'>Overview</h1>
                            <table className="table-auto border-separate border-spacing-1   p-4 w-full">
                                <thead className=' text-white font-bold w-full p-4'>
                                    <tr className='grid grid-cols-6'>
                                        <th className='col-span-2'>
                                            <button
                                                onClick={() => { sortClients() }}
                                                className='
                                        
                                                flex 
                                                flex-row
                                                items-center
                                                content-center
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
                                                transition'>
                                                Sort by Date
                                                {sortDateUp ?
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25L12 21m0 0l-3.75-3.75M12 21V3" />
                                                    </svg>
                                                    : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M8.25 6.75L12 3m0 0l3.75 3.75M12 3v18" />
                                                    </svg>
                                                }
                                            </button>
                                        </th>
                                        <th className='col-span-3'>
                                            <input
                                                type="text"
                                                value={search}
                                                placeholder={"Search"}
                                                onChange={(e) => {
                                                    setSearch(e.target.value);

                                                }}
                                                className="
                                            
                                            w-full
                                            rounded-[25px]
                                            border-2
                                            border-[#fdc92f]
                                            py-3
                                            px-5
                                            bg-white
                                            text-base
                                             text-body-color
                                             text-black
                                            placeholder-[#ACB6BE]
                                            outline-none
                                            focus-visible:shadow-none
                                            focus:border-primary
                                            "
                                                onKeyDown={handleKeyDown}
                                            />
                                        </th>



                                    </tr>
                                    <tr className='grid grid-cols-6 bg-[#00947a] py-3'>
                                        {labels.map((v: any) => (
                                            <th key={v.label} className='text-left'>{v}</th>
                                        ))}
                                    </tr>


                                </thead>
                                <tbody className='h-48 overflow-y-scroll flex flex-col '>


                                    {
                                        tempClients.map((value, index) => {

                                            return (
                                                <tr key={index}
                                                    className={'odd:bg-white even:bg-slate-50  hover:cursor-pointer grid grid-cols-6'}
                                                >
                                                    <td className='text-left' >{value.date}</td>
                                                    <td className='text-left' >{value.name}</td>
                                                    <td className='text-left' >{value.stage}</td>
                                                    <td className='text-left' >{value.value}</td>
                                                </tr>
                                            )
                                        })

                                    }

                                </tbody>
                                <tfoot>
                                    <tr
                                        className={'bg-[#00947a] hover:cursor-pointer grid grid-cols-6 text-white'}
                                    >
                                        <td className='text-left' >{new Date().toDateString()}</td>
                                        <td className='text-left' ></td>
                                        <td className='text-left' >Total</td>
                                        <td className='text-left' >{totalValue}</td>
                                    </tr>
                                </tfoot>
                            </table>
                            <h1 className='text-center'>Top Products</h1>
                            <div className='h-72 w-full flex flex-col items-center mb-6'>
                                <Pie data={products} />
                            </div>

                            <h1 className='text-center'>Sales Rep</h1>
                            <div className='h-72 w-full flex flex-col items-center'>
                                <Pie data={sales} />
                            </div>

                            <h1 className='text-center'>Stage</h1>
                            <div className='h-72 w-full flex flex-col items-center'>
                                <Pie data={stage} />
                            </div>
                            <div>
                                <p>Total Number of clients: {clients.length}</p>
                                <p>Total Clients Converted: {totalFinished.length} </p>
                                <p>Convesion Rate: {Math.floor((totalFinished.length / clients.length) * 100)}%</p>
                            </div>


                        </div>
                        {/* <div className='shadow-2xl rounded-[25px] flex flex-col p-4'>
                            <h1 className='px-4'>Today's Report</h1>
                        </div>
                        <div className='shadow-2xl rounded-[25px] flex flex-col p-4'>
                            <h1 className='px-4'>Past Week Report</h1>
                        </div>
                        <div className='shadow-2xl rounded-[25px] flex flex-col p-4'>
                            <h1 className='px-4'>Past Months Report</h1>
                        </div>
                        <div className='shadow-2xl rounded-[25px] flex flex-col p-4'>
                            <h1 className='px-4'>Past 3 Months Report</h1>
                        </div> */}
                    </>

                }




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div >

    )
};


export default CRMReport
function setClients(arg0: never[]) {
    throw new Error('Function not implemented.');
}

