import React, { useEffect, useState } from 'react'
import { COOKIE_ID, LIGHT_GRAY, PRIMARY_COLOR } from '../app/constants/constants';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ClientNav from '../app/components/clientNav';
import Payment from '../app/utils/paymentUtil';
import { decrypt, encrypt } from '../app/utils/crypto';
import { getCookie } from 'react-use-cookie';
import { getForms } from '../app/api/adminApi';
import { IForm } from '../app/types/types';
import FormSummary from '../app/components/formSummary';
import ReactGA from 'react-ga';
import { searchStringInMembers } from '../app/utils/stringM';
import { print } from '../app/utils/console';



const Forms = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [previousForms, setPreviousForms] = useState<IForm[]>([]);
    const [formsSearch, setFormsSearch] = useState("");
    const [temp, setTemp] = useState<IForm[]>([]);




    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;
        ReactGA.initialize('AW-11208371394');
        ReactGA.pageview(window.location.pathname + window.location.search);
        setPreviousForms([]);

        checkPayment();

        var infoFormCookie = getCookie(COOKIE_ID);
        if (typeof infoFormCookie !== 'undefined') {


            if (infoFormCookie.length > 0) {
                const id = decrypt(infoFormCookie, COOKIE_ID);

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

                            setTemp((prevForms) => [...prevForms, {
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

            } else {
                router.push({
                    pathname: '/login',
                });
            }


        } else {
            router.push({
                pathname: '/login',
            });
        }





    }, []);

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

    const handleKeyDown = (event: { key: string; }) => {

        if (event.key === 'Enter') {
            setLoading(true);
            if (formsSearch !== '') {


                let res: IForm[] = searchStringInMembers(temp, formsSearch);
                setTemp([]);
                print(res);
                if (res.length > 0) {

                    setTimeout(() => {
                        setTemp(res);
                        setLoading(false);
                    }, 1500);
                } else {
                    toast.info(`${formsSearch} not found`);
                    setTimeout(() => {
                        setTemp(previousForms);
                        setLoading(false);
                    }, 1500);
                }



            } else {
                setTemp([]);
                setTimeout(() => {
                    setTemp(previousForms);
                    setLoading(false);
                }, 1500);

            }



        }
    };






    return (
        <div>

            <div className='flex flex-col lg:grid lg:grid-cols-12'>

                <div className='lg:col-span-3'>
                    <ClientNav organisationName={'Vision Is Primary'} url={'forms'} />
                </div>



                {loading ?
                    <div className='flex flex-col justify-center items-center w-full col-span-8'>
                        <Loader />
                    </div>

                    :
                    <div className='bg-white col-span-9 m-8 rounded-[30px] p-4 lg:p-16 overflow-y-scroll'>

                        <div className='p-4'>
                            <input
                                type="text"
                                value={formsSearch}
                                placeholder={"Search for form"}
                                onChange={(e) => {
                                    setFormsSearch(e.target.value);

                                }}
                                className="
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
                                    "
                                onKeyDown={handleKeyDown}
                            />
                        </div>

                        <div className=' grid grid-cols-1 md:grid-cols-3  2xl:grid-cols-5 gap-4 p-4 justify-items-center'>
                            {/* Previous Forms  */}
                            <a href={'/createForm'}>
                                <div className='flex flex-col items-center shadow-2xl rounded-[30px] h-32 w-48 border p-4 text-[#00947a]'>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-32 h-32 m-auto ">
                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                    </svg>
                                    <h1 className='font-bold'>Add Form</h1>
                                </div>

                            </a>
                            {temp.map((v) => (
                                <FormSummary key={v.id} title={v.title} description={v.description} url={typeof v.id !== 'undefined' ? `/myForm/${encrypt(v.id, COOKIE_ID)}` : null} />
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
