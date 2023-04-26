import React, { useEffect, useState } from 'react'
import { PRIMARY_COLOR } from '../app/constants/constants';
import Carousel from '../app/components/carousel';
import { auth } from '../firebase/clientApp';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import ClientNav from '../app/components/clientNav';



const Home = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();




    useEffect(() => {
        document.body.style.backgroundColor = '#F5f7f7';


        return () => {

        }

    }, []);






    return (
        <div>
            <div className='grid grid-cols-10'>


                <ClientNav organisationName={'Vision Is Primary'} />
                <div className='bg-white col-span-8 m-8 rounded-[30px]'>

                </div>




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default Home
