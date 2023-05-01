import React, { useEffect, useState } from 'react'
import { COOKIE_ID, COOKIE_PHONE, LIGHT_GRAY, PRIMARY_COLOR, PRODUCTION_CLIENT_ID } from '../app/constants/constants';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ClientNav from '../app/components/clientNav';
import { usePayPalScriptReducer } from '@paypal/react-paypal-js';
import PaypalCheckoutButton from '../app/components/paypalButton';
import { IPayments } from '../app/types/types';
import ReactPaginate from 'react-paginate';
import { addPayment, getPayments } from '../app/api/adminApi';
import Crypto from '../app/utils/crypto';
import { getCookie } from 'react-use-cookie';
import DateMethods from '../app/utils/date';
import Random from '../app/utils/random';




const Payments = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [{ isPending }] = usePayPalScriptReducer();
    const [payments, setPayments] = useState<IPayments[]>([]);
    const [pages, setPages] = useState(0);
    const [paymentsStart, setPaymentStart] = useState(0);
    const [paymentsEnd, setPaymentEnd] = useState(10);
    const [product, setProduct] = useState<any>({
        description: "Purchase DaCollectree",
        price: 250
    });
    const [lastPaymentDate, setLastPaymentDate] = useState("");
    const [nextPaymentDate, setNextPaymentDate] = useState("");
    const [promoCode, setPromoCode] = useState("");
    const [userId, setUserId] = useState("");


    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;
        var id = "";
        if (getCookie(COOKIE_ID) !== "") {
            id = Crypto.decrypt(getCookie(COOKIE_ID), COOKIE_ID);
            setUserId(id);
        }


        getPayments(getCookie(COOKIE_ID)).then((v) => {

            if (v !== null) {

                v.data.forEach(element => {
                    const fromDb = element.data().userId;
                    if (fromDb !== "") {
                        console.log(fromDb);
                        const idFromDB = Crypto.decrypt(fromDb, COOKIE_ID);
                        if (idFromDB === id) {
                            setPayments((prevPayments) => [...prevPayments, {
                                id: element.id,
                                userId: element.data().userId,
                                phoneNumber: element.data().phoneNumber,
                                date: element.data().date,
                                amount: element.data().amount
                            }]);
                        }

                    }



                });
                if (payments.length > 0) {
                    setProduct({
                        description: "DaCollectree hosting, security and backup fee",
                        price: 20
                    });
                    setLastPaymentDate("Upcoming");

                }

                var d = new Date(payments[0].date);
                setLastPaymentDate(`${d.getDate()} ${DateMethods.showMonth(d.getMonth() + 1)} ${d.getFullYear()}`);
                var nextDate = new Date(new Date().setDate(d.getDate() + 30));
                setNextPaymentDate(`${nextDate.getDate()} ${DateMethods.showMonth(nextDate.getMonth() + 1)} ${nextDate.getFullYear()}`);




            }
            setLastPaymentDate('No Payment made');

            setLoading(false);

        }).catch(console.error);

        var numOfPages = Math.floor(payments.length / 10);
        if (payments.length % 10 > 0) {
            numOfPages++;
        }
        const pags = Array.from(Array(numOfPages).keys());
        setPages(pags.length);




    }, []);





    const handlePageClick = (event: { selected: number; }) => {
        let val = event.selected + 1;
        if (payments.length / 10 + 1 === val) {
            setPaymentStart(payments.length - (payments.length % 10));
            setPaymentEnd(payments.length);
        } else {
            setPaymentStart(Math.ceil((val * 10) - 10));
            setPaymentEnd(val * 10);
        }
    };

    const checkPromoCode = () => {
        if (promoCode == "1073Love") {

            const key = userId.substring(-13);
            const payment = {
                id: Random.randomString(13, "abcdefghijkhlmnopqrstuvwxz123456789"),
                userId: getCookie(COOKIE_ID),
                phoneNumber: Crypto.decrypt(getCookie(COOKIE_PHONE), COOKIE_ID),
                date: new Date().toString(),
                amount: product.amount
            }

            addPayment(userId, payment).then((v) => {
                toast.success('Promo successfully added');
            }).catch((e) => {
                toast.error('There was an error adding your payment, please try again');

            });
        }
    }

    return (
        <div>
            <div className='grid grid-cols-10'>


                <ClientNav organisationName={'Vision Is Primary'} url={'payments'} />
                <div className='col-span-8 m-8  grid grid-cols-2 gap-4'>


                    {loading ?
                        <div className='flex flex-col justify-center items-center w-full col-span-8'>
                            <Loader />
                        </div>

                        :

                        <>
                            <div className='flex flex-col  w-full col-span-1  space-y-4'>
                                <div className='flex flex-col justify-center items-center w-full bg-white rounded-[30px] h-84 p-4'>
                                    <h1 className='col-span-3 m-4'>Make Payment</h1>
                                    {isPending ?
                                        <Loader />
                                        : <PaypalCheckoutButton product={product} />}
                                    <h1 className='col-span-3 m-4'>or</h1>
                                    <input
                                        type="text"
                                        value={sent ? accessCode : phone}
                                        placeholder={"Promo Code"}
                                        onChange={(e) => {
                                            if (sent) {
                                                setAccessCode(e.target.value);
                                            } else {
                                                setPhone(e.target.value)
                                            }

                                        }}
                                        className="
                                        text-center
                                        w-full
                                        rounded-[25px]
                                        border-2
                                        border-[#fdc92f]
                                        py-3
                                        px-5
                                        bg-white
                                        text-base text-body-color
                                        placeholder-[#ACB6BE]
                                        outline-none
                                        focus-visible:shadow-none
                                        focus:border-primary
                                        mb-4
                                        "
                                        required
                                    />
                                    <button
                                        onClick={() => {
                                            checkPromoCode();
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
                                        text-white
                                        cursor-pointer
                                        hover:bg-opacity-90
                                        transition
                                        ">
                                        Submit Promo Code
                                    </button>

                                </div>
                                <div className='bg-[#00947a] p-4 h-64 rounded-[30px]'>
                                    <h1 className='text-white'>Last payment date: {lastPaymentDate} </h1>
                                    <h1 className='text-white'>Next payment date: {nextPaymentDate} </h1>
                                    <div className='h-3'>

                                    </div>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.5" stroke="currentColor"
                                        className="col-span-1 w-48 h-48 text-white justify-self-center">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 002.25-2.25V6.75A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25v10.5A2.25 2.25 0 004.5 19.5z" />
                                    </svg>
                                </div>

                            </div>
                            <div className='col-span-1 bg-white rounded-[30px] p-4'>
                                <p>Payment History</p>
                                {payments.length > 0 ?
                                    <>
                                        <table className="table-auto w-full">
                                            <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">

                                                <tr>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Invoice</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Billing Admin</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Billing Date</div>
                                                    </th>
                                                    <th className="p-2 whitespace-nowrap">
                                                        <div className="font-semibold text-left">Amount</div>
                                                    </th>

                                                </tr>
                                            </thead>
                                            <tbody className="text-sm divide-y divide-gray-100">
                                                {payments.slice(paymentsStart, paymentsEnd).map((v) => (

                                                    <tr key={v.id}>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <button className="flex flex-row items-center">
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                                    className="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                                                                </svg>

                                                                <div className="font-medium text-gray-800">Download Invoice</div>
                                                            </button>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <p className="text-left text-sm">{v.phoneNumber}</p>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <p className="text-left font-medium ">{v.date}</p>
                                                        </td>
                                                        <td className="p-2 whitespace-nowrap">
                                                            <p className="text-sm text-center">{v.amount}</p>
                                                        </td>


                                                    </tr>

                                                ))}
                                                <tr>



                                                </tr>
                                            </tbody>

                                        </table>
                                        <div className='flex flex-row-reverse'>
                                            <ReactPaginate
                                                pageClassName="border-2 border-[#00947a] px-2 py-1 rounded-[30px]"
                                                previousLinkClassName="border-2 border-[#00947a] px-2 py-2 rounded-[25px] bg-[#00947a] text-white font-bold"
                                                nextLinkClassName="border-2 border-[#00947a] px-2 py-2 rounded-[25px] bg-[#00947a] text-white font-bold"
                                                breakLabel="..."
                                                breakClassName=""
                                                containerClassName="flex flex-row space-x-4 content-center items-center "
                                                activeClassName="bg-[#00947a] text-white"
                                                nextLabel="next"
                                                onPageChange={handlePageClick}
                                                pageRangeDisplayed={1}
                                                pageCount={pages}
                                                previousLabel="previous"
                                                renderOnZeroPageCount={() => null}
                                            />
                                        </div>
                                    </> : <p>No Payment History</p>}

                            </div>

                        </>}




                </div>

            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default Payments
