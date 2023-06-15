import React, { useEffect, useState } from 'react'
import { LIGHT_GRAY, PRIMARY_COLOR } from '../app/constants/constants';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ClientNav from '../app/components/clientNav';
import ReactGA from 'react-ga';



const Accounting = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();




    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;
        ReactGA.initialize('AW-11208371394');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return () => {

        }

    }, []);






    return (
        <div>
            <div className='grid grid-cols-12'>

                <div className='col-span-3'>
                    <ClientNav organisationName={'Vision Is Primary'} url={'accounting'} />
                </div>

                <div className='bg-white col-span-9 m-8 rounded-[30px]'>

                </div>




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default Accounting
