import React, { useEffect, useState } from 'react'
import { LIGHT_GRAY, PRIMARY_COLOR, PRODUCTION_CLIENT_ID } from '../app/constants/constants';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ClientNav from '../app/components/clientNav';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import PaypalCheckoutButton from '../app/components/paypalButton';





const Payments = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [{ isPending }] = usePayPalScriptReducer();



    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;


        return () => {

        }

    }, []);



    const product = {
        description: "Design+Code React Hooks Course",
        price: 19
    };


    return (
        <div>
            <div className='grid grid-cols-10'>


                <ClientNav organisationName={'Vision Is Primary'} url={'payments'} />
                <div className='bg-white col-span-8 m-8 rounded-[30px]'>

                    {isPending ? <PaypalCheckoutButton product={product} /> : <div className="spinner" />}


                </div>




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default Payments
