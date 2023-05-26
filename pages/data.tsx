import React, { useEffect, useState } from 'react'
import { COOKIE_ID, LIGHT_GRAY, PRIMARY_COLOR, URL_LOCK_ID } from '../app/constants/constants';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ClientNav from '../app/components/clientNav';
import Payment from '../app/utils/paymentUtil';
import { getAllData } from '../app/api/adminApi';
import { decrypt, encrypt } from '../app/utils/crypto';
import { getCookie } from 'react-use-cookie';
import { IData } from '../app/types/types';
import FormSummary from '../app/components/formSummary';



const Data = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const [data, setData] = useState<IData[]>([]);




    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;

        const paymentStatus = Payment.checkPaymentStatus();
        if (!paymentStatus) {
            toast.warn('It appears your payment is due, please pay up to continue enjoying DaCollectree');
            router.push({
                pathname: '/payments',
            });
        }

        const id = decrypt(getCookie(COOKIE_ID), COOKIE_ID);
        setData([]);
        getAllData(id).then((v) => {

            if (v !== null) {

                v.data.forEach(element => {
                    setData((data) => [...data, {
                        id: element.id,
                        title: element.data().title,
                        descr: element.data().descr,
                        date: element.data().date,
                        editorId: element.data().editorId,
                        encryption: element.data().encryption,
                        info: element.data().info,
                        infoId: element.data().infoId
                    }]);
                });

                setLoading(false);

            }

        }).catch(console.error);



    }, []);






    return (
        <div>
            <div className='grid grid-cols-10'>


                <ClientNav organisationName={'Vision Is Primary'} url={'data'} />
                <div className='bg-white col-span-8 m-8 rounded-[30px] p-16'>

                    {loading ?
                        <div className='flex flex-col justify-center items-center w-full col-span-8'>
                            <Loader />
                        </div> : <div className=' grid grid-cols-5 gap-4'>
                            {data.map((v) => (
                                <FormSummary title={v.title} description={v.descr} url={typeof v.id !== 'undefined' ? `/display/${encrypt(v.id, URL_LOCK_ID)}` : null} />
                            ))}
                        </div>}
                </div>




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default Data
