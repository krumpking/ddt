import React, { Fragment, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ReactGA from 'react-ga';
import { getCookie } from 'react-use-cookie';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { IClient } from '../types/userTypes';
import { ADMIN_ID, COOKIE_ID, LIGHT_GRAY } from '../constants/constants';
import ClientNav from './clientNav';
import Loader from './loader';
import { addTasksToDB, getAllClientsToDB, getAllTasksToDB, updateClientToDB } from '../api/crmApi';
import { print } from '../utils/console';
import { searchStringInMembers } from '../utils/stringM';
import DateMethods from '../utils/date';
import { decrypt, encrypt } from '../utils/crypto';
import DataSummary from './dataSummary';
import Pill from './pill';
import TaskAccordion from './taskAccordian';
import { ITask } from '../types/taskTypes';





const CRMTasks = () => {
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [selected, setSelected] = useState([]);
    const [role, setRole] = useState("Admin");
    const [fullName, setFullName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [tasks, setTasks] = useState<ITask[]>([]);
    const [labels, setLabels] = useState(['Created', 'Name', 'Contact', 'Stage', 'Organisation']);
    const [open, setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const [editMember, setEditMember] = useState<any>();
    const [search, setSearch] = useState("");
    const [sortDateUp, setSortDateUp] = useState(false);
    const [tempClients, setTempClients] = useState<IClient[]>([]);
    const [contact, setContact] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [stage, setStage] = useState("");
    const [openDialog, setOpenDialog] = useState(false);
    const [view, setView] = useState(0);
    const [notes, setNotes] = useState("");
    const [refSource, setRefSource] = useState("");
    const [products, setProducts] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const [docId, setDocId] = useState("");
    const [title, setTitle] = useState("");
    const [email, setEmail] = useState("");
    const [priority, setPriority] = useState("");
    const [reminder, setReminder] = useState(0);
    const [description, setDescription] = useState("");







    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;
        ReactGA.initialize('AW-11208371394');
        ReactGA.pageview(window.location.pathname + window.location.search);
        setTasks([]);
        getTasksFromDB();




    }, []);









    // const deleteMemb = (id: string) => {
    //     setLoading(true);
    //     deleteClientById(id).then((v) => {
    //         setUsers([]);
    //         getUsersFromDB();
    //     }).catch((e) => {
    //         console.error(e);
    //     })

    // }


    const getTasksFromDB = () => {
        setLoading(true);

        getAllTasksToDB().then((v) => {

            var id = decrypt(getCookie(COOKIE_ID), COOKIE_ID);
            if (v !== null) {
                var clnts: any[] = [];
                v.data.forEach(element => {

                    var client = getClient(element.data().client, id);

                    var task = {
                        docId: element.id,
                        id: element.data().id,
                        adminId: element.data().adminId,
                        date: element.data().date,
                        description: decrypt(element.data().description, id),
                        email: decrypt(element.data().email, id),
                        priority: decrypt(element.data().priority, id),
                        reminder: decrypt(element.data().reminder, id),
                        client: client,
                        title: decrypt(element.data().title, id),

                    }

                    clnts.push(task);

                });
                setTasks(clnts);


            }

            setLoading(false);
        }).catch((e) => {
            console.error(e);
            setLoading(false);
        });


    }

    const getClient = (client: any, id: string) => {
        var notesA: any = [];
        client.notes.forEach((el: string) => {
            notesA.push(decrypt(el, id));
        });


        var prodA: any = [];
        client.enquired.forEach((el: string) => {
            prodA.push(decrypt(el, id));
        });

        var clientF = {
            id: client.id,
            adminId: client.adminId,
            date: client.date,
            name: decrypt(client.name, id),
            contact: decrypt(client.contact, id),
            organisation: decrypt(client.organisation, id),
            stage: decrypt(client.stage, id),
            notes: notesA,
            refSource: decrypt(client.refSource, id),
            enquired: prodA,
            value: decrypt(client.value, id)
        }

        return clientF;
    }






    const updateStage = () => {
        setOpenDialog(false);
        setTempClients([]);
        if (typeof editMember !== 'undefined') {
            setLoading(true);
            var infoFromCookie = "";
            if (getCookie(ADMIN_ID) == "") {
                infoFromCookie = getCookie(COOKIE_ID);
            } else {
                infoFromCookie = getCookie(ADMIN_ID);
            }

            var id = decrypt(infoFromCookie, COOKIE_ID);


            var notesA: any = [];
            var notesAr = editMember.notes;
            notesAr.forEach((el: any) => {

                notesA.push(encrypt(el, id))
            })


            var prodA: any = [];

            var prodAr = editMember.enquired;
            prodAr.forEach((el: any) => {
                prodA.push(encrypt(el, id));
            })




            var client = {
                id: editMember.id,
                adminId: editMember.adminId,
                date: editMember.date,
                name: encrypt(editMember.name, id),
                contact: encrypt(editMember.contact, id),
                organisation: encrypt(editMember.organisation, id),
                stage: encrypt(stage, id),
                notes: notesA,
                refSource: encrypt(editMember.refSource, id),
                enquired: prodA,
                value: encrypt(editMember.value, id),
                encryption: 2
            }

            updateClientToDB(editMember.docId, client).then((r) => {
                // getClientsFromDB();
            }).catch((e) => {
                toast.error("There was an error adding client please try again");
                setLoading(false);
                console.error(e);
            });
        }
    }

    const addNotes = () => {
        setOpenDialog(false);
        setTempClients([]);
        if (typeof editMember !== 'undefined') {
            setLoading(true);
            var infoFromCookie = "";
            if (getCookie(ADMIN_ID) == "") {
                infoFromCookie = getCookie(COOKIE_ID);
            } else {
                infoFromCookie = getCookie(ADMIN_ID);
            }

            var id = decrypt(infoFromCookie, COOKIE_ID);


            var notesA: any = [];
            var notesAr = editMember.notes;
            notesAr.forEach((el: any) => {

                notesA.push(encrypt(el, id))
            });
            notesA.push(encrypt(notes, id));

            var prodA: any = [];

            var prodAr = editMember.enquired;
            prodAr.forEach((el: any) => {
                prodA.push(encrypt(el, id));
            })





            var client = {
                id: editMember.id,
                adminId: editMember.adminId,
                date: editMember.date,
                name: encrypt(editMember.name, id),
                contact: encrypt(editMember.contact, id),
                organisation: encrypt(editMember.organisation, id),
                stage: encrypt(editMember.stage, id),
                notes: notesA,
                refSource: encrypt(editMember.refSource, id),
                enquired: prodA,
                value: encrypt(editMember.value, id),
                encryption: 2
            }

            updateClientToDB(editMember.docId, client).then((r) => {
                // getClientsFromDB();
            }).catch((e) => {
                toast.error("There was an error adding client please try again");
                setLoading(false);
                console.error(e);
            });
        }
    }

    const sortClients = () => {
        setLoading(true);
        setSortDateUp(!sortDateUp);
        setTempClients([]);
        var res = DateMethods.sortObjectsByDate(tempClients, sortDateUp);
        setTimeout(() => {
            setTempClients(res);
            setLoading(false);
        }, 2000);
    }

    const addTasks = () => {


    }

    const getView = () => {



        switch (view) {
            case 0:

                return (
                    <div className='flex flex-col'>
                        <Pill title={`${editMember?.name}`} description={'Name'} />
                        <Pill title={`${editMember?.contact}`} description={'Contact'} />
                        <Pill title={`${editMember?.organisation}`} description={'Organization'} />
                        <Pill title={`${editMember?.refSource}`} description={'Came to us through'} />
                        <Pill title={`${editMember?.enquired}`} description={'Enquired About'} />
                        <Pill title={`${editMember?.value}`} description={'Total Value'} />
                        <Pill title={`${editMember?.stage}`} description={'Stage'} />
                        <Pill title={`${editMember?.notes}`} description={'Notes'} />
                    </div>
                );
            case 1:

                return (
                    <div className='flex flex-col space-y-2 '>
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
                                        Stage of communication
                                    </option>
                                    <option value="Contact">
                                        Contact Made
                                    </option>
                                    <option value="Appointment" >
                                        Appointment Set
                                    </option>
                                    <option value="Presentation" >
                                        Presentation Made
                                    </option>
                                    <option value="Decision" >
                                        Decision Maker brought in
                                    </option>
                                    <option value="Contract" >
                                        Contract Sent
                                    </option>
                                    <option value="Signed" >
                                        Contract Signed
                                    </option>
                                    <option value="Started" >
                                        Project Started
                                    </option>
                                    <option value="Progressed" >
                                        Project In Progress
                                    </option>
                                    <option value="Finished" >
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
                                    h-48
                                    "

                            />
                        </div>
                        <div className="mb-6">
                            <button
                                onClick={() => { }}
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
                                Update Client
                            </button>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className='flex flex-col space-y-2 '>
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
                                        Stage of communication
                                    </option>
                                    <option value="Contact Made">
                                        Contact Made
                                    </option>
                                    <option value="Appointment Set" >
                                        Appointment Set
                                    </option>
                                    <option value="Presentation Made" >
                                        Presentation Made
                                    </option>
                                    <option value="Decision Maker brought in" >
                                        Decision Maker brought in
                                    </option>
                                    <option value="Contract Sent" >
                                        Contract Sent
                                    </option>
                                    <option value="Contract Signed" >
                                        Contract Signed
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
                            <button
                                onClick={() => { updateStage() }}
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
                                Update Stage
                            </button>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className='flex flex-col space-y-2 '>
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
                            <button
                                onClick={() => { addNotes() }}
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
                                Add Notes
                            </button>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className='grid grid-cols-1 gap-4'>
                        <div className="mb-6">
                            <input
                                type="text"
                                value={title}
                                placeholder={"Title of task"}
                                onChange={(e) => {
                                    setTitle(e.target.value);

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

                            />
                        </div>
                        <div className='mb-6'>
                            <button className='font-bold rounded-[25px] border-2  bg-white px-4 py-3 w-full' >
                                <select
                                    value={priority}
                                    onChange={(e) => {
                                        setPriority(e.target.value);
                                    }}
                                    className='bg-white w-full'
                                    data-required="1"
                                    required>
                                    <option value="title" hidden>
                                        Select Priority
                                    </option>
                                    <option value="High">
                                        High
                                    </option>
                                    <option value="Medium">
                                        Medium
                                    </option>
                                    <option value="Low" >
                                        Low
                                    </option>

                                </select>
                            </button>

                        </div>
                        <div className="mb-6">
                            <p className='text-xs text-center'>Reminder cycle in days</p>
                            <input
                                type='number'
                                value={reminder}
                                placeholder={"Set reminder cycle in days"}
                                onChange={(e) => {
                                    setReminder(parseInt(e.target.value));
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
                                value={description}
                                placeholder={"Description"}
                                onChange={(e) => {
                                    setDescription(e.target.value);
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
                            <button
                                onClick={() => { addTasks() }}
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
                                Add Task
                            </button>
                        </div>

                    </div>
                )
            default:
                return (
                    <div className='flex flex-col'>
                        <Pill title={`${editMember?.name}`} description={'Name'} />
                        <Pill title={`${editMember?.contact}`} description={'Contact'} />
                        <Pill title={`${editMember?.organisation}`} description={'Organization'} />
                        <Pill title={`${editMember?.refSource}`} description={'Came to us through'} />
                        <Pill title={`${editMember?.enquired}`} description={'Enquired About'} />
                        <Pill title={`${editMember?.value}`} description={'Total Value'} />
                        <Pill title={`${editMember?.stage}`} description={'Stage'} />
                        <Pill title={`${editMember?.notes}`} description={'Notes'} />
                    </div>
                );
                break;
        }
    }



    return (
        <div>

            {loading ?
                <div className='flex flex-col items-center content-center'>
                    <Loader />
                </div> :
                <div className='flex flex-col'>

                    <div className='grid grid-cols-2 p-4'>
                        <div>
                            <p className='text-base'>Total number of tasks {tasks.length}</p>
                        </div>
                    </div>

                    <div className='w-full overscroll-contain'>
                        {
                            tasks.map((value, index) => {

                                return (
                                    <TaskAccordion title={value.title} task={value} />

                                )
                            })
                        }
                    </div>



                </div>}


            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div >

    )
};


export default CRMTasks


