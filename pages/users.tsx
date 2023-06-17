import React, { useEffect, useState } from 'react'
import { COOKIE_ID, LIGHT_GRAY, PRIMARY_COLOR } from '../app/constants/constants';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ClientNav from '../app/components/clientNav';
import ReactGA from 'react-ga';
import { MultiSelect } from "react-multi-select-component";
import { IUser } from '../app/types/userTypes';
import { createId, getDate } from '../app/utils/stringM';
import { getCookie } from 'react-use-cookie';
import { decrypt } from '../app/utils/crypto';
import { Menu, Transition } from '@headlessui/react';
import { addUser, deleteById, getUsers } from '../app/api/usersApi';


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
    const [role, setRole] = useState("Admin");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [users, setUsers] = useState<IUser[]>([]);
    const [labels, setLabels] = useState(['Created', 'Name', 'Contact', 'Role']);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editMember, setEditMember] = useState<IUser>();




    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;
        ReactGA.initialize('AW-11208371394');
        ReactGA.pageview(window.location.pathname + window.location.search);

        getUsersFromDB();




    }, []);





    const deleteMemb = (id: string) => {
        setLoading(true);
        deleteById(id).then((v) => {
            setUsers([]);
            getUsersFromDB();
        }).catch((e) => {
            console.error(e);
        })

    }

    const addUserToDB = (user: IUser) => {

        setLoading(true);

        addUser(user).then((r) => {
            setUsers([...users, user]);
            setLoading(false);
        }).catch((e) => {
            console.error(e);
            setLoading(false);
        });
    }

    const getUsersFromDB = () => {
        setLoading(true);
        var infoFromCookie = getCookie(COOKIE_ID);
        if (typeof infoFromCookie !== 'undefined') {


            if (infoFromCookie.length > 0) {


                var id = decrypt(getCookie(COOKIE_ID), COOKIE_ID);
                getUsers(id).then((v) => {

                    if (v !== null) {
                        v.data.forEach(element => {
                            var newUser = {
                                id: element.data().id,
                                adminId: element.data().adminId,
                                date: element.data().date,
                                name: element.data().name,
                                contact: element.data().contact,
                                role: element.data().role,
                            }
                            setUsers([...users, newUser]);

                        });

                    }
                    setLoading(false);
                }).catch((e) => {
                    console.error(e);
                    setLoading(false);
                });

            }
        } else {
            router.push('/login');
        }
    }






    return (
        <div>
            <div className='grid grid-cols-12'>

                <div className='col-span-3'>
                    <ClientNav organisationName={'Vision Is Primary'} url={'users'} />
                </div>

                <div className='bg-white col-span-9 m-8 rounded-[30px] flex flex-col p-4'>


                    {loading ?
                        <div className='flex flex-col items-center content-center'>
                            <Loader />
                        </div> :
                        <>

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
                                        onClick={() => {


                                            var infoFromCookie = getCookie(COOKIE_ID);
                                            if (typeof infoFromCookie !== 'undefined') {


                                                if (infoFromCookie.length > 0) {

                                                    var id = decrypt(getCookie(COOKIE_ID), COOKIE_ID);
                                                    var user = {
                                                        name: fullName,
                                                        contact: phoneNumber,
                                                        role: role,
                                                        date: new Date().toString(),
                                                        adminId: id,
                                                        id: createId()
                                                    }

                                                    addUserToDB(user);


                                                }
                                            }

                                        }}
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

                            <div className='w-full'>
                                <table className="table-auto border-separate border-spacing-1  shadow-2xl rounded-[25px] p-4 w-full">
                                    <thead className='bg-[#00947a] text-white font-bold w-full '>
                                        <tr className='grid grid-cols-5'>
                                            {labels.map((v: any) => (
                                                <th key={v.label} className='text-left'>{v}</th>
                                            ))}
                                        </tr>


                                    </thead>
                                    <tbody>

                                        {
                                            users.map((value, index) => {
                                                return (
                                                    <tr key={index}
                                                        className={'odd:bg-white even:bg-slate-50  hover:cursor-pointer grid grid-cols-5'}
                                                        onClick={() => { }}>
                                                        <td className='text-left' >{getDate(value.date)}</td>
                                                        <td className='text-left' >{value.name}</td>
                                                        <td className='text-left' >{value.contact}</td>
                                                        <td className='text-left' >{value.role}</td>
                                                        <td className=" whitespace-nowrap text-right">


                                                            <Menu>
                                                                {({ open }) => (
                                                                    <>
                                                                        <span className="rounded-md shadow-sm">
                                                                            <Menu.Button className="inline-flex justify-center text-sm font-medium leading-5 text-gray-700 transition duration-150 ease-in-out bg-white rounded-md hover:text-gray-500 focus:outline-none focus:border-blue-300 focus:shadow-outline-blue active:bg-gray-50 active:text-gray-800">
                                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6 ">
                                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M12 6.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 12.75a.75.75 0 110-1.5.75.75 0 010 1.5zM12 18.75a.75.75 0 110-1.5.75.75 0 010 1.5z" />
                                                                                </svg>

                                                                            </Menu.Button>
                                                                        </span>

                                                                        <Transition
                                                                            show={open}
                                                                            enter="transition ease-out duration-100"
                                                                            enterFrom="transform opacity-0 scale-95"
                                                                            enterTo="transform opacity-100 scale-100"
                                                                            leave="transition ease-in duration-75"
                                                                            leaveFrom="transform opacity-100 scale-100"
                                                                            leaveTo="transform opacity-0 scale-95"
                                                                        >
                                                                            <Menu.Items
                                                                                static
                                                                                className="absolute right-0 w-56 mt-2 origin-top-right bg-white border border-gray-200 divide-y divide-gray-100 rounded-md shadow-lg outline-none"
                                                                            >
                                                                                {/* <div className="py-1">

                                                                            <Menu.Item>
                                                                                {({ active }) => (
                                                                                    <button
                                                                                        onClick={() => { if (typeof value.id !== 'undefined') { setEdit(true); setEditMember(value); } }}
                                                                                        className={`${active
                                                                                            ? "bg-gray-100 text-gray-900"
                                                                                            : "text-gray-700"
                                                                                            } flex justify-between font-bold w-full px-4 py-2 text-sm leading-5 text-left border-sky-600`}
                                                                                    >
                                                                                        Edit
                                                                                    </button>
                                                                                )}
                                                                            </Menu.Item>
                                                                        </div> */}
                                                                                <div className="py-1">

                                                                                    <Menu.Item>
                                                                                        {({ active }) => (
                                                                                            <button
                                                                                                onClick={() => { if (typeof value.id !== 'undefined') deleteMemb(value.id); }}
                                                                                                className={`${active
                                                                                                    ? "bg-gray-100 text-gray-900"
                                                                                                    : "text-gray-700"
                                                                                                    } flex justify-between font-bold w-full px-4 py-2 text-sm leading-5 text-left border-sky-600`}
                                                                                            >
                                                                                                Delete
                                                                                            </button>
                                                                                        )}
                                                                                    </Menu.Item>
                                                                                </div>




                                                                            </Menu.Items>
                                                                        </Transition>
                                                                    </>
                                                                )}
                                                            </Menu>




                                                        </td>

                                                    </tr>
                                                )
                                            })
                                        }


                                    </tbody>
                                </table>
                            </div>



                        </>}




                </div>




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div >

    )
};


export default Users
