import React, { useEffect, useState } from 'react';
import { FC } from 'react';
import { createId } from '../utils/stringM';
import { getCookie } from 'react-use-cookie';
import { ADMIN_ID, COOKIE_ID, PERSON_ROLE } from '../constants/constants';
import { decrypt, encrypt } from '../utils/crypto';
import { addAClientToDB } from '../api/crmApi';
import Loader from './loader';
import { ToastContainer, toast } from 'react-toastify';
import { print } from '../utils/console';
import { useRouter } from 'next/router';
import { IBookingEvent } from '../types/bookingsTypes';
import { addBookingEvent, updateOrganizationInfo } from '../api/bookingsApi';
import { getOrgInfoFromDB } from '../api/orgApi';

const AddGeneralBookingInfo = () => {
    const [info, setInfo] = useState("Venue");
    const [addedInfo, setAddedInfo] = useState("");
    const [loading, setLoading] = useState(false);
    const [docId, setDocId] = useState("");
    const [vat, setVat] = useState(0);
    const router = useRouter();
    const [events, setEvents] = useState<any[]>([]);
    const [venues, setVenues] = useState<any[]>([]);
    const [adminIdde, setAdminIdde] = useState("");


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
                getOrgInfo();

            }
        }



    }, []);

    const getOrgInfo = () => {
        setLoading(true);
        getOrgInfoFromDB().then((r) => {

            var infoFromCookie = "";
            if (getCookie(ADMIN_ID) == "") {
                infoFromCookie = getCookie(COOKIE_ID);
            } else {
                infoFromCookie = getCookie(ADMIN_ID);
            }
            var id = decrypt(infoFromCookie, COOKIE_ID);
            setAdminIdde(id);

            if (r !== null) {

                r.data.forEach(element => {

                    setDocId(element.id);
                    //Check for any venues in the database and add them
                    if (typeof element.data().venues !== "undefined") {

                        let venuesA: any = [];
                        element.data().venues.forEach((e: any) => {
                            venuesA.push(e);
                        });
                        setVenues(venuesA);
                    }

                    //Check for any events in the database and add them
                    if (typeof element.data().events !== "undefined") {
                        let evnts: any = [];
                        element.data().events.forEach((e: any) => {
                            evnts.push(e);
                        });
                        setEvents(evnts);
                    }


                });

            }
            setLoading(false);

        }).catch((e) => {
            console.error(e);
            setLoading(false);
        });
    }


    const addInfo = () => {
        setLoading(true);
        var infoFromCookie = "";
        if (getCookie(ADMIN_ID) == "") {
            infoFromCookie = getCookie(COOKIE_ID);
        } else {
            infoFromCookie = getCookie(ADMIN_ID);
        }
        var adminId = decrypt(infoFromCookie, COOKIE_ID);

        let bookingInfo = {};
        let infoA: any = [];
        if (info == "Venue") {
            // If there are venues add them to the new ones
            if (venues.length > 0) {
                venues.forEach((e) => {
                    infoA.push(e);
                });
            }

            // Add Venues
            if (addedInfo.split(",").length > 0) {

                addedInfo.split(",").forEach(element => {
                    infoA.push(encrypt(element, adminId));
                });
                bookingInfo = { venues: infoA };
            } else {
                infoA.push(encrypt(addedInfo, adminId));
                bookingInfo = { venues: infoA };
            }
        } else {

            // If there are events add them to the new ones
            if (events.length > 0) {
                events.forEach((e) => {
                    infoA.push(e);
                });
            }

            // Add events to the database
            if (addedInfo.split(",").length > 0) {

                addedInfo.split(",").forEach(element => {

                    infoA.push(encrypt(element, adminId));
                });


                bookingInfo = { events: infoA };
            } else {
                infoA.push(encrypt(addedInfo, adminId));
                bookingInfo = { events: infoA };
            }

        }


        updateOrganizationInfo(docId, bookingInfo).then((r) => {
            setLoading(false);
            toast.success(`${info} added Successfully`);
        }).catch((e) => {
            toast.error('There was an error adding event, please try again');
            console.error(e)
        });


    };


    const deleteItem = (itemType: number, index: number) => {
        if (itemType == 1) {
            let v = venues;
            delete v[index];
            // print(v);
            setVenues(v);

        } else {
            let e = events;
            delete e[index];
            setEvents(e);
        }
        addInfo();
    }

    return (
        <div>
            {loading ? (
                <div className="flex flex-col items-center content-center">
                    <Loader />
                </div>
            ) : (
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <div className='flex flex-col w-full'>
                            <p className=' text-xs text-black font-bold'>Added Venues</p>
                            <div className='border-2 rounded-[25px] p-4 border-[#fdc92f]'>
                                {venues.map((v, index) => (
                                    <div className='grid grid-cols-6' key={index}>
                                        <div className='col-span-5'>
                                            <p>{decrypt(v, adminIdde)}</p>
                                            {/* <p>{v}</p> */}
                                        </div>
                                        <div>
                                            <button onClick={() => { deleteItem(1, index) }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>

                                            </button>
                                        </div>

                                    </div>
                                ))}
                            </div>

                        </div>
                        <div className='flex flex-col mt-5'>
                            <p className='text-xs text-black font-bold'>Added Events</p>
                            <div className='border-2 rounded-[25px] p-4 border-[#fdc92f]'>
                                {events.map((v, index) => (
                                    <div className='grid grid-cols-6' key={index}>
                                        <div className='col-span-5'>
                                            <p>{decrypt(v, adminIdde)}</p>
                                            {/* <p>{v}</p> */}
                                        </div>
                                        <div>
                                            <button onClick={() => { deleteItem(2, index); }}>
                                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                                                    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                                                </svg>

                                            </button>
                                        </div>

                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>

                    <div>
                        <p className='text-center text-xs text-black font-bold'>Add Venues and Events</p>
                        <div className="mb-6 w-full">
                            <button className=' w-full
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
                                    focus:border-primary' onClick={(e) => e.preventDefault()}>
                                <select
                                    value={info}
                                    onChange={(e) => {
                                        setInfo(e.target.value);
                                    }}
                                    className='bg-white w-full'
                                    required
                                >
                                    <option value="Category" hidden>
                                        Category
                                    </option>
                                    <option value="Venue">Venue</option>
                                    <option value="Events">Events</option>
                                </select>
                            </button>

                        </div>
                        <div className="mb-6 ">
                            <p className='text-center text-xs text-gray-300 mb-4 font-bold'>Separate each {info} with a comma</p>
                            <textarea
                                value={addedInfo}
                                placeholder={`${info} to save`}
                                onChange={(e) => {
                                    setAddedInfo(e.target.value);
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
                            <button
                                onClick={() => {
                                    addInfo();
                                }}
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
                                    "
                            >
                                Add {info}
                            </button>
                        </div>
                    </div>

                </div>
            )}
            <ToastContainer position="top-right" autoClose={5000} />
        </div>
    );
};

export default AddGeneralBookingInfo;
