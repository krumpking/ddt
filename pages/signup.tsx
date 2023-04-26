import React, { useEffect, useState } from 'react'
import { PRIMARY_COLOR } from '../app/constants/constants';
import Carousel from '../app/components/carousel';
import { auth } from '../firebase/clientApp';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { addAdmin } from '../app/api/adminApi';



const SignUp = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [fullName, setFullName] = useState("");
    const [organisationName, setOrganisationName] = useState("");
    const [email, setEmail] = useState("");




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


    const signUp = () => {
        setLoading(true);

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

    const signIn = () => {
        setLoading(true);
        window.confirmationResult.confirm(accessCode).then(() => {
            // success
            const admin = {
                name: fullName,
                phoneNumber: phone,
                createdDate: new Date().toString(),
                email: email,
                organizationName: organisationName,
            }

            addAdmin(admin).then((v) => {

                if (!v) {
                    toast.warn("Phone number already exists, user another phone number")
                } else {
                    router.push('/home');
                }
                setLoading(false);

            }).catch(console.error);

        }).catch((err: any) => {
            alert("The One Time Password you sent was not correct please retry");
        });
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

                        :

                        <>
                            {sent ?
                                <form onSubmit={
                                    (e) => {
                                        e.preventDefault()
                                        signIn()
                                    }
                                }>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            value={accessCode}
                                            placeholder={"Please enter the One Time Password"}
                                            onChange={(e) => {

                                                setAccessCode(e.target.value);


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
                                            value={"Login"}
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
                                </form>

                                :
                                <form onSubmit={
                                    (e) => {
                                        e.preventDefault()
                                        signUp()
                                    }
                                }>
                                    <p className='text-center text-xs text-gray-300 mb-4 font-bold'>Sign Up</p>
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            value={fullName}
                                            placeholder={"Full Name"}
                                            onChange={(e) => {
                                                setFullName(e.target.value);

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
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            value={phone}
                                            placeholder={"Phone (include country your code )"}
                                            onChange={(e) => {
                                                setPhone(e.target.value);

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
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            value={email}
                                            placeholder={"Email"}
                                            onChange={(e) => {
                                                setEmail(e.target.value);

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
                                    <div className="mb-6">
                                        <input
                                            type="text"
                                            value={organisationName}
                                            placeholder={"Organisation Name"}
                                            onChange={(e) => {
                                                setOrganisationName(e.target.value);

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
                                            value={"Send One Time Password"}
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

                        </>
                    }
                </div>

            </div>
            <div id="recaptcha-container"></div>
            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>
    )
};




export default SignUp
