import React, { useEffect, useState } from 'react'
import { COOKIE_ID, LIGHT_GRAY, PRIMARY_COLOR } from '../app/constants/constants';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ClientNav from '../app/components/clientNav';
import Payment from '../app/utils/paymentUtil';
import { decrypt } from '../app/utils/crypto';
import { getCookie } from 'react-use-cookie';
import { getForms } from '../app/api/adminApi';
import { IForm } from '../app/types/types';
import FormSummary from '../app/components/formSummary';



const Forms = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [previousForms, setPreviousForms] = useState<IForm[]>([]);




    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;

        setPreviousForms([]);

        const paymentStatus = Payment.checkPaymentStatus();
        if (!paymentStatus) {
            toast.warn('It appears your payment is due, please pay up to continue enjoying DaCollectree');
            router.push({
                pathname: '/payments',
            });
        }

        const id = decrypt(getCookie(COOKIE_ID), COOKIE_ID);


        getForms(id).then((v) => {
            if (v !== null) {
                v.data.forEach(element => {
                    setPreviousForms((prevForms) => [...prevForms, {
                        id: element.id,
                        title: element.data().title,
                        description: element.data().description,
                        elements: element.data().elements,
                        dateCreated: element.data().dateCreated,
                        creatorId: id,
                        editorNumbers: element.data().editorNumbers
                    }]);







                });
                setLoading(false);


            }
        }).catch((e) => {
            toast.error('There was an error getting the')
        })





    }, []);






    return (
        <div>
            <div className='grid grid-cols-10'>


                <ClientNav organisationName={'Vision Is Primary'} url={'forms'} />


                {loading ?
                    <div className='flex flex-col justify-center items-center w-full col-span-8'>
                        <Loader />
                    </div>

                    :
                    <div className='bg-white col-span-8 m-8 rounded-[30px]'>
                        <div className='grid grid-cols-5 gap-2 p-4'>
                            {/* Previous Forms  */}
                            <a href={'/createform'}>
                                <div className='flex flex-col items-center shadow-2xl rounded-[30px] h-32 w-48 border p-4 text-[#00947a]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-32 h-32 m-auto ">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <h1 className='font-bold'>Add Form</h1>
                                </div>

                            </a>
                            {previousForms.map((v) => (
                                <FormSummary title={v.title} description={v.description} url={typeof v.id !== 'undefined' ? v.id : null} />
                            ))}

                        </div>
                    </div>}




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div >

    )
};


export default Forms
