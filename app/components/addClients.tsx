import React, { useEffect, useState } from 'react'
import { FC } from 'react';
import { createId } from '../utils/stringM';
import { getCookie } from 'react-use-cookie';
import { ADMIN_ID, COOKIE_ID, PERSON_ROLE } from '../constants/constants';
import { decrypt, encrypt } from '../utils/crypto';
import { addAClientToDB } from '../api/crmApi';
import Loader from './loader';
import { ToastContainer, toast } from 'react-toastify';
import { useRouter } from 'next/router';




const AddClient = () => {
    const [fullName, setFullName] = useState("");
    const [contact, setContact] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [stage, setStage] = useState("");
    const [notes, setNotes] = useState("");
    const [refSource, setRefSource] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [salesPerson, setSalesPerson] = useState("");
    const router = useRouter();

    useEffect(() => {
        let role = getCookie(PERSON_ROLE);
        var infoFromCookie = "";
        if (getCookie(ADMIN_ID) == "") {
            infoFromCookie = getCookie(COOKIE_ID);
        } else {
            infoFromCookie = getCookie(ADMIN_ID);
        }

        if (typeof role !== 'undefined') {
            if (role !== "") {
                var id = decrypt(infoFromCookie, COOKIE_ID);
                var roleTitle = decrypt(role, id);
                if (roleTitle !== "Admin") { // "Viewer" //"Editor"
                    router.push('/home');
                    toast.info("You do not have permission to access this page");
                }

            }
        }



    }, [])



    const addClient = () => {
        setLoading(true);
        var infoFromCookie = "";
        if (getCookie(ADMIN_ID) == "") {
            infoFromCookie = getCookie(COOKIE_ID);
        } else {
            infoFromCookie = getCookie(ADMIN_ID);
        }

        var myId = decrypt(getCookie(COOKIE_ID), COOKIE_ID);
        var id = decrypt(infoFromCookie, COOKIE_ID)

        var notesA = [];
        notesA.push(encrypt(notes, id));
        var prodA: any = [];
        if (products.includes(",")) {
            var prodAr = products.split(",");
            prodAr.forEach((el) => {
                prodA.push(encrypt(el, id))
            })

        } else {
            prodA.push(products);
        }
        var client = {
            id: myId,
            adminId: id,
            date: new Date().toDateString(),
            name: encrypt(fullName, id),
            contact: encrypt(contact, id),
            organisation: encrypt(organisation, id),
            stage: encrypt(stage, id),
            notes: notesA,
            refSource: encrypt(refSource, id),
            enquired: prodA,
            value: encrypt(totalAmount, id),
            encryption: 2,
            salesPerson: encrypt(salesPerson, id),
        }

        addAClientToDB(client).then((r) => {
            toast.success("Client added!");

            setLoading(false);
        }).catch((e) => {
            toast.error("There was an error adding client please try again");
            setLoading(false);
            console.error(e);
        })
    }


    return (
        <div>
            {loading ?
                <div className='flex flex-col items-center content-center'>
                    <Loader />
                </div>
                : <div className='grid grid-cols-2 gap-4'>
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

                        />
                    </div>
                    <div className="mb-6">
                        <input
                            type="text"
                            value={contact}
                            placeholder={"Contact"}
                            onChange={(e) => {
                                setContact(e.target.value);

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
                    <div className="mb-6">
                        <input
                            type="text"
                            value={organisation}
                            placeholder={"Organisation"}
                            onChange={(e) => {
                                setOrganisation(e.target.value);
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
                    <div className='mb-6'>
                        <button className='font-bold rounded-[25px] border-2  bg-white px-4 py-3 w-full' >
                            <select
                                value={stage}
                                onChange={(e) => {
                                    setStage(e.target.value);
                                }}
                                className='bg-white w-full'
                                data-required="1"
                                required>
                                <option value="Contact" hidden>
                                    Stage of Deal
                                </option>
                                <option value="Quotation Sent" >
                                    Quotation Sent
                                </option>
                                <option value="Invoice Sent" >
                                    Invoice Sent
                                </option>
                                <option value="Receipt Sent" >
                                    Receipt Sent
                                </option>
                                <option value="Project Started" >
                                    Project Started
                                </option>
                                <option value="Project In Progress" >
                                    Project In Progress
                                </option>
                                <option value="Project Finished" >
                                    Project Finished
                                </option>
                            </select>
                        </button>

                    </div>
                    <div className="mb-6">
                        <input
                            value={products}
                            placeholder={"List of products/services enquired"}
                            onChange={(e) => {
                                setProducts(e.target.value);
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
                    <div className="mb-6">
                        <input
                            value={totalAmount}
                            placeholder={"Total Value Amount"}
                            onChange={(e) => {
                                setTotalAmount(e.target.value);
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
                    <div className="mb-6">
                        <textarea
                            value={notes}
                            placeholder={"Notes"}
                            onChange={(e) => {
                                setNotes(e.target.value);
                            }}
                            className="
                                    w-full
                                    rounded-[25px]
                                    border-2
                                    border-[#fdc92f]
                                    py-3
                                    px-5
                                    h-48
                                    bg-white
                                    text-base text-body-color
                                    placeholder-[#ACB6BE]
                                    outline-none
                                    focus-visible:shadow-none
                                    focus:border-primary
                                    "

                        />
                    </div>

                    <div className="mb-6">
                        <textarea
                            value={refSource}
                            placeholder={"How they heard"}
                            onChange={(e) => {
                                setRefSource(e.target.value);
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
                                    h-24
                                    "

                        />
                        <textarea
                            value={salesPerson}
                            placeholder={"Sales Person"}
                            onChange={(e) => {
                                setSalesPerson(e.target.value);
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
                                    h-24
                                    "

                        />
                    </div>
                    <div className="mb-6">
                        <button
                            onClick={() => { addClient() }}
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
                    text-[#7d5c00]
                    cursor-pointer
                    hover:bg-opacity-90
                    transition
                                    ">
                            Add Client
                        </button>
                    </div>

                </div>}
            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div >

    )
};


export default AddClient
