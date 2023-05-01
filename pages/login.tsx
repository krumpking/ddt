import React, { useEffect, useState } from 'react'
import { COOKIE_EMAIL, COOKIE_ID, COOKIE_NAME, COOKIE_ORGANISATION, COOKIE_PHONE, PRIMARY_COLOR } from '../app/constants/constants';
import Carousel from '../app/components/carousel';
import { auth } from '../firebase/clientApp';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getUser } from '../app/api/adminApi';
import { getCookie, setCookie } from 'react-use-cookie';
import Crypto from '../app/utils/crypto';
import { DocumentData, QuerySnapshot } from 'firebase/firestore';


const Login = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [userId, setUserId] = useState("");




    useEffect(() => {
        document.body.style.backgroundColor = PRIMARY_COLOR;
        auth.languageCode = 'en';
        window.recaptchaVerifier = new RecaptchaVerifier('recaptcha-container', {
            'size': 'visible',
            'callback': (response: any) => {
                // reCAPTCHA solved, allow signInWithPhoneNumber.              
                // ...
            },
            'expired-callback': () => {
                // Response expired. Ask user to solve reCAPTCHA again.
                // ...
                window.location.reload();
            }
        }, auth);


        return () => {

        }

    }, []);


    const login = () => {
        setLoading(true);
        if (sent) {
            window.confirmationResult.confirm(accessCode).then((result: { user: any; }) => {


                const user = result.user;
                const userId = user.uid;



                getUser(phone).then((v: QuerySnapshot<DocumentData> | null) => {

                    if (v == null) {
                        toast.warn('User not found, please Sign Up');
                        router.push({
                            pathname: '/signup',
                        });
                    } else {



                        v.forEach((doc) => {


                            const key = doc.id.substring(-13);
                            setCookie(COOKIE_ID, Crypto.encrypt(userId, COOKIE_ID), {
                                days: 1,
                                SameSite: 'Strict',
                                Secure: true,
                            });
                            setCookie(COOKIE_ORGANISATION, Crypto.encrypt(doc.data().organizationName, key), {
                                days: 1,
                                SameSite: 'Strict',
                                Secure: true,
                            });
                            setCookie(COOKIE_EMAIL, Crypto.encrypt(doc.data().email, key), {
                                days: 1,
                                SameSite: 'Strict',
                                Secure: true,
                            });
                            setCookie(COOKIE_NAME, Crypto.encrypt(doc.data().name, key), {
                                days: 1,
                                SameSite: 'Strict',
                                Secure: true,
                            });

                            setCookie(COOKIE_PHONE, Crypto.encrypt(phone, key), {
                                days: 1,
                                SameSite: 'Strict',
                                Secure: true,
                            });
                        });

                        setLoading(false);
                        router.push({
                            pathname: '/home'
                        });
                    }


                }).catch(console.error);
                // success


            }).catch((err: any) => {
                alert("The One Time Password you sent was not correct please retry");
            });
        } else {
            const appVerifier = window.recaptchaVerifier;
            signInWithPhoneNumber(auth, phone, appVerifier)
                .then((confirmationResult) => {
                    // SMS sent. Prompt user to type the code from the message, then sign the
                    // user in with confirmationResult.confirm(code).
                    toast.success("Passcode sent")
                    setSent(true);
                    window.confirmationResult = confirmationResult;

                    setLoading(false);
                    // ...
                }).catch((error) => {
                    // Error; SMS not sent
                    // ...
                    console.error(error);
                    setLoading(false);
                    toast.error("There was an error please refresh the page and try again")
                });
        }

    }

    const shownSlides = [
        {
            image: '/images/bg-swurl.png',

        },
        {
            image: '/images/bg-swurl.png',

        },
        {
            image: '/images/bg-swurl.png',

        },
    ]


    const slide = (image: string) => {
        return (
            <div className="w-full h-96 rounded-lg">
                <img src={image} className='w-full h-full' />
            </div>


        )
    }


    return (
        <div className='bg-[#00947a] w-full h-full p-16 '>
            <div className='bg-white h-full rounded-[25px] grid grid-cols-2 p-4 place-items-center'>
                <Carousel children={shownSlides.map((v) => {
                    return (
                        slide(v.image)
                    )
                })} />
                <div className=''>
                    {loading ?
                        <Loader />

                        : <form onSubmit={
                            (e) => {
                                e.preventDefault()
                                login()
                            }
                        }>
                            <p className='text-center text-xs text-gray-300 mb-4 font-bold'>Login</p>
                            <div className="mb-6">
                                <input
                                    type="text"
                                    value={sent ? accessCode : phone}
                                    placeholder={sent ? "Please enter the One Time Password" : "Phone (include country your code )"}
                                    onChange={(e) => {
                                        if (sent) {
                                            setAccessCode(e.target.value);
                                        } else {
                                            setPhone(e.target.value)
                                        }

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
                                    required
                                />
                            </div>

                            <div className="mb-10">
                                <input
                                    type="submit"
                                    value={sent ? "Login" : "Send One Time Password"}
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
                                    "
                                />
                            </div>
                        </form>}
                </div>

            </div>
            <div id="recaptcha-container"></div>
            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>
    )
};


export default Login


