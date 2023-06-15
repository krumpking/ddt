import React, { useEffect, useState } from 'react'
import { LIGHT_GRAY, PRIMARY_COLOR } from '../app/constants/constants';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ClientNav from '../app/components/clientNav';
import ReactGA from 'react-ga';
import { MultiSelect } from "react-multi-select-component";


const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' }
]


const Users = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [selected, setSelected] = useState([]);
    const [role, setRole] = useState("");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");




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
                    <ClientNav organisationName={'Vision Is Primary'} url={'users'} />
                </div>

                <div className='bg-white col-span-9 m-8 rounded-[30px] flex flex-col p-4'>

                    <div className='grid grid-cols-4'>
                        <div className='py-4 px-1'>
                            <input
                                type="text"
                                value={fullName}
                                placeholder={"User Full Name"}
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

                            />
                        </div>
                        <div className='py-4 px-1'>
                            <input
                                type="text"
                                value={phoneNumber}
                                placeholder={"Phone number including country code"}
                                onChange={(e) => {
                                    // setFormsSearch(e.target.value);
                                    setPhoneNumber(e.target.value);

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

                            />
                        </div>
                        <div className='py-4 px-1'>
                            <button className='font-bold rounded-[25px] border-2  bg-white px-4 py-3 w-full' >
                                <select
                                    value={role}
                                    onChange={(e) => {
                                        setRole(e.target.value);
                                    }}
                                    className='bg-white w-full'
                                    data-required="1"
                                    required>
                                    <option value="Admin">
                                        Admin(Full Access, Can Add remove users)
                                    </option>
                                    <option value="Viewer" >
                                        View(Can only view but can not add input)
                                    </option>
                                    <option value="Editor" >
                                        Editor(Can input data but can not view)
                                    </option>
                                </select>
                            </button>

                        </div>
                        <div className='py-4 px-1'>
                            <button
                                type="submit"
                                value={sent ? "Login" : "Send One Time Password"}
                                className="
                                    font-bold
                                    w-full
                                    rounded-[25px]
                                 text-[#7d5c00]
                                  border-2
                                border-[#fdc92f]
                                    py-3
                                    px-5
                                    bg-[#fdc92f]
                                    text-base 
                                    cursor-pointer
                                    hover:bg-opacity-90
                                    transition
                                    "
                            >Add User</button>
                        </div>
                    </div>

                    <div>

                    </div>



                </div>




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default Users
