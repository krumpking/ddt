import React, { Fragment, useEffect, useMemo, useReducer, useState } from 'react'
import { LIGHT_GRAY, PRIMARY_COLOR } from '../app/constants/constants';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ClientNav from '../app/components/clientNav';
import FormElement from '../app/components/formElement';
import { IFormElement } from '../app/types/type';
import { Menu, Transition } from '@headlessui/react';
import Elem, { iElements } from '../app/components/elements';
import Random from '../app/utils/random';




const CreateForm = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [formTitle, setFormTitle] = useState("");
    const [formDescr, setFormDescr] = useState("");
    const [elementId, setElementId] = useState("");
    const [headerFocus, setHeaderFocus] = useState(true);
    const [elements, setElements] = useState<IFormElement[]>([]);
    const [label, setLabel] = useState("");
    const [num, setNum] = useState(0);
    const [clicked, setClicked] = useState("");




    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;

        if (elements.length < 1) {
            const defaultEl = {
                id: 'one',
                elementId: 0,
                label: "Enter input label",
            }

            setElements(prevEl => [...prevEl, defaultEl]);
            setClicked("one");
        }


    }, []);


    const sendForm = () => {

    }

    const createId = () => {
        return Random.randomString(8, "abcdefghijklmnopqrstuvwxyz");
    }



    return (
        <div>
            <div className='grid grid-cols-10'>


                <ClientNav organisationName={'Vision Is Primary'} url={'forms'} />
                <div className='col-span-8 m-8 rounded-[30px] flex flex-col space-y-4 w-full items-center content-center'>


                    <div className='grid grid-cols-12 gap-4 w-3/4'>
                        <div className='bg-white flex flex-col space-y-4 rounded-[10px]  shadow-md col-span-10'
                            onClick={() => {
                                setHeaderFocus(true);
                            }}
                            onFocus={() => {
                                setHeaderFocus(true);
                            }}
                            onBlur={() => {
                                setHeaderFocus(false);
                            }}>
                            <div className='bg-[#00947a] w-full rounded-t-[25px] h-2'></div>


                            <div
                                className='grid grid-cols-5 gap-2'
                            >

                                <div className='p-4 flex flex-col space-y-4 col-span-4 w-full'>
                                    {headerFocus ?
                                        <>
                                            <input
                                                type="text"
                                                placeholder={"Form Title"}
                                                value={formTitle}
                                                onChange={(e) => {
                                                    setFormTitle(e.target.value);
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

                                            <input
                                                type="text"
                                                placeholder={"Form Description"}
                                                value={formDescr}
                                                onChange={(e) => {
                                                    setFormDescr(e.target.value);
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
                                        </>
                                        :
                                        <>
                                            <h1>{formTitle}</h1>
                                            <h1>{formDescr}</h1>
                                        </>}
                                </div>

                            </div>


                        </div>

                        <div className='col-span-2 rounded-[10px] bg-[#00947a]  flex flex-col text-white items-center justify-center'
                            onClick={() => {
                                sendForm();
                            }}>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                            </svg>
                            Add Form
                        </div>
                    </div>


                    {elements.map((v) => (
                        <div className='w-full flex flex-col items-center'>

                            {clicked === v.id ?
                                <div className='grid grid-cols-12 w-3/4 gap-4'>
                                    <div className='col-span-10 flex flex-row w-full shadow-md'>
                                        <div className='bg-[#00947a] rounded-l-[30px] w-2'>

                                        </div>
                                        <div className="p-4 flex flex-col space-y-6  bg-white w-full rounded-r-[10px]">

                                            <div className='flex flex-col space-y-6 p-2'>
                                                <div className='grid grid-cols-2 gap-4'>
                                                    <input
                                                        type="text"
                                                        placeholder={"Enter label"}
                                                        value={label}
                                                        onChange={(e) => {
                                                            setLabel(e.target.value);
                                                        }}
                                                        className="
                                                            col-span-1
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
                                                    <Menu as="div" className="relative inline-block text-left col-span-1 px-2">
                                                        <div>
                                                            <Menu.Button className="inline-flex w-full justify-center rounded-[30px] bg-[#fdc92f] px-4 py-3  font-medium text-white hover:bg-opacity-70">
                                                                Options
                                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
                                                                    className="w-6 h-6">
                                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                                </svg>

                                                            </Menu.Button>
                                                        </div>
                                                        <Transition
                                                            as={Fragment}
                                                            enter="transition ease-out duration-100"
                                                            enterFrom="transform opacity-0 scale-95"
                                                            enterTo="transform opacity-100 scale-100"
                                                            leave="transition ease-in duration-75"
                                                            leaveFrom="transform opacity-100 scale-100"
                                                            leaveTo="transform opacity-0 scale-95"
                                                        >
                                                            <Menu.Items className="absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                                                                <div className="px-1 py-1 flex flex-col space-y-2 w-full">
                                                                    {iElements.map((v, index) => (
                                                                        <Menu.Button
                                                                            onClick={() => {
                                                                                setNum(index);
                                                                            }}>
                                                                            {v}
                                                                        </Menu.Button>
                                                                    ))}
                                                                </div>

                                                            </Menu.Items>
                                                        </Transition>
                                                    </Menu>
                                                </div>

                                                <Elem label={label} num={num} />
                                            </div>


                                        </div>

                                    </div>
                                    <div className='col-span-2 w-full rounded-[10px] grid grid-cols-1 gap-4 '>
                                        {/* Add , Duplicate,Delete */}



                                        {v.id !== "one" ?
                                            <>

                                                <button className='bg-white rounded-[10px] flex flex-col items-center p-2 shadow-md'
                                                    onClick={() => {

                                                        const el = {
                                                            id: createId(),
                                                            elementId: v.elementId,
                                                            label: v.label,
                                                        }
                                                        const oldArr = [...elements];
                                                        if (elements.length == 1) {
                                                            oldArr.unshift(el);
                                                        } else {
                                                            oldArr.splice(elements.length - 1, 0, el);
                                                        }
                                                        setElements(oldArr);
                                                        setClicked("one");


                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75" />
                                                    </svg>
                                                    Duplicate
                                                </button>
                                                <button className='bg-white rounded-[10px] flex flex-col items-center p-2 shadow-md'
                                                    onClick={() => {
                                                        const oldArr = [...elements];
                                                        oldArr.forEach((element, index) => {
                                                            if (element.id == clicked) {
                                                                oldArr.splice(index, 1);
                                                                setElements(oldArr);
                                                                setClicked("one");
                                                                return;
                                                            }
                                                        });


                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
                                                    </svg>
                                                    Delete
                                                </button>
                                            </>
                                            :
                                            <>
                                                <button className='bg-white rounded-[10px] flex flex-col items-center p-2 shadow-md'
                                                    onClick={() => {
                                                        const el = {
                                                            id: createId(),
                                                            elementId: num,
                                                            label: label,
                                                        }
                                                        const oldArr = [...elements];
                                                        if (elements.length == 1) {
                                                            oldArr.unshift(el);
                                                        } else {
                                                            oldArr.splice(elements.length - 1, 0, el);
                                                        }
                                                        setElements(oldArr);
                                                        setClicked("one");

                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                    Add Input
                                                </button>
                                                <button className='bg-[#00947a] rounded-[10px] flex flex-col items-center p-2 shadow-md text-white'
                                                    onClick={() => {
                                                        sendForm();

                                                    }}>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                                                    </svg>
                                                    Add Form
                                                </button>
                                            </>

                                        }

                                    </div>
                                </div> :
                                <div className='flex flex-col space-y-4  bg-white shadow-2xl rounded-[10px] w-3/4 p-8'
                                    onClick={() => {
                                        setClicked(v.id);
                                        setLabel(v.label);
                                        setNum(v.elementId);
                                    }}
                                    onFocus={() => {
                                        setClicked(v.id);
                                        setLabel(v.label);
                                        setNum(v.elementId);
                                    }}
                                    onBlur={() => {
                                        setClicked("");
                                    }}>
                                    <h1 className='w-full'>Label: {v.label}</h1>
                                    <div className='flex flex-row space-x-4'>
                                        <p>
                                            Expected Input:
                                        </p>
                                        <Elem label={v.label} num={v.elementId} />
                                    </div>

                                </div>

                            }


                        </div>
                    ))}




                </div>




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default CreateForm
