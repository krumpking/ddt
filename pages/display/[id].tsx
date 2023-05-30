import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { LIGHT_GRAY, URL_LOCK_ID } from '../../app/constants/constants';
import Payment from '../../app/utils/paymentUtil';
import ClientNav from '../../app/components/clientNav';
import ReactTable from "react-table";
import { getSpecificData } from '../../app/api/adminApi';
import { IData } from '../../app/types/types';
import { forEach } from 'lodash';
import { decrypt, simpleDecrypt } from '../../app/utils/crypto';
import Loader from '../../app/components/loader';
import { isBase64 } from '../../app/utils/stringM';




const DataDisplay = () => {
    const router = useRouter();
    const [data, setData] = useState<IData>();
    const [loading, setLoading] = useState(true);
    const [imageBase64, setImageBase64] = useState("");





    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;



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
                        <div className='p-4 lg:p-8 2xl:p-16 rounded-md'>
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
                                            data?.info.map((value, index) => (
                                                <tr key={index} className={index % 2 == 0 ? 'bg-[#ECECEC]' : 'bg-white'}>
                                                    {data?.info[index].data.map((v: any) => {

                                                        return (
                                                            <td className='text-left' key={v.info}>{simpleDecrypt(v.info, data.infoId + data.infoId + data.infoId)}</td>
                                                        )


                                                    })

                                                    }
                                                </tr>
                                            ))
                                        }


                                    </tbody>
                                </table>
                            </div>

                        </div>}
                </div>




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default DataDisplay
