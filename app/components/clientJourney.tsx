import React, { Fragment, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { getCookie } from 'react-use-cookie';
import { IClient } from '../types/userTypes';
import { ADMIN_ID, COOKIE_ID, LIGHT_GRAY } from '../constants/constants';
import Loader from './loader';
import { getAllClientsToDB } from '../api/crmApi';
import { decrypt } from '../utils/crypto';
import Accordion from './accordion';






const ClientJourney = () => {
    const [loading, setLoading] = useState(false);
    const [clients, setClients] = useState<Map<any, any>>();
    const [contactMade, setContactMade] = useState([]);
    const [appointment, setAppointment] = useState([]);
    const [presentationMade, setPresentationMade] = useState([]);
    const [decisionMaker, setDecisionMaker] = useState([]);
    const [contractSent, setContractSent] = useState([]);
    const [contractSigned, setContractSigned] = useState([]);
    const [projectSigned, setProjectSigned] = useState([]);
    const [projectInProgress, setProjectInProgress] = useState([]);
    const [projectFinished, setProjectFinished] = useState([]);









    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;
        setContactMade([]);
        setAppointment([]);
        setPresentationMade([]);
        setDecisionMaker([]);
        setContractSent([]);
        setContractSigned([]);
        setProjectSigned([]);
        setProjectInProgress([]);
        setProjectFinished([]);
        getClientsFromDB();




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


    const getClientsFromDB = () => {
        setLoading(true);

        getAllClientsToDB().then((v) => {


            var infoFromCookie = "";
            if (getCookie(ADMIN_ID) == "") {
                infoFromCookie = getCookie(COOKIE_ID);
            } else {
                infoFromCookie = getCookie(ADMIN_ID);
            }
            var id = decrypt(infoFromCookie, COOKIE_ID)


            if (v !== null) {
                var sortedData = new Map();

                v.data.forEach(element => {

                    var notesA: any = [];
                    element.data().notes.forEach((el: string) => {
                        notesA.push(decrypt(el, id));
                    });


                    var prodA: any = [];
                    element.data().enquired.forEach((el: string) => {
                        prodA.push(decrypt(el, id));
                    });

                    var client = {
                        docId: element.id,
                        id: element.data().id,
                        adminId: element.data().adminId,
                        date: element.data().date,
                        name: decrypt(element.data().name, id),
                        contact: decrypt(element.data().contact, id),
                        organisation: decrypt(element.data().organisation, id),
                        stage: decrypt(element.data().stage, id),
                        notes: notesA,
                        refSource: decrypt(element.data().refSource, id),
                        enquired: prodA,
                        value: decrypt(element.data().value, id)
                    }
                    let curr: IClient[] = [];

                    if (sortedData.has(client.stage)) {
                        curr = sortedData.get(client.stage);
                        curr.push(client);
                        sortedData.set(client.stage, curr);
                    } else {
                        curr.push(client);
                        sortedData.set(client.stage, curr);
                    }


                });



                setClients(sortedData);
                setContactMade(sortedData.has("Contact Made") ? sortedData.get("Contact Made") : []);
                setAppointment(sortedData.has("Appointment Set") ? sortedData.get("Appointment Set") : []);
                setPresentationMade(sortedData.has("Presentation Made") ? sortedData.get("Presentation Made") : []);
                setDecisionMaker(sortedData.has("Decision Maker brought in") ? sortedData.get("Decision Maker brought in") : []);
                setContractSent(sortedData.has("Contract Sent") ? sortedData.get("Contract Sent") : []);
                setContractSigned(sortedData.has("Contract Signed") ? sortedData.get("Contract Signed") : []);
                setProjectSigned(sortedData.has("Project Started") ? sortedData.get("Project Started") : []);
                setProjectInProgress(sortedData.has("Project In Progress") ? sortedData.get("Project In Progress") : []);
                setProjectFinished(sortedData.has("Project Finished") ? sortedData.get("Project Finished") : []);

            }

            setLoading(false);
        }).catch((e) => {
            console.error(e);
            setLoading(false);
        });


    }




    return (
        <div>

            {loading ?
                <div className='flex flex-col items-center content-center'>
                    <Loader />
                </div> :
                <div>

                    {typeof clients !== 'undefined' ?
                        <div className='flex flex-nowrap overflow-x-auto space-x-8 whitespace-nowrap'>
                            <div className='w-96 h-full shadow-xl p-4 rounded-[15px]'>
                                <p>{contactMade.length} Contact Made </p>
                                {contactMade.map((v: { name: string; organisation: any; }) => {


                                    return (
                                        <Accordion key={v.name} title={v.name} description={v.organisation} />
                                    )
                                })}
                            </div>
                            <div className='w-96 h-full shadow-xl p-4 rounded-[15px]'>
                                <p>{appointment.length} Appointment Set</p>
                                {appointment.map((v: { name: string; organisation: any; }) => {


                                    return (
                                        <Accordion key={v.name} title={v.name} description={v.organisation} />
                                    )
                                })}
                            </div>
                            <div className='w-96 h-full shadow-xl p-4 rounded-[15px]'>
                                <p>{presentationMade.length} Presentation Made</p>
                                {presentationMade.map((v: { name: string; organisation: any; }) => {


                                    return (
                                        <Accordion key={v.name} title={v.name} description={v.organisation} />
                                    )
                                })}
                            </div>
                            <div className='w-96 h-full shadow-xl p-4 rounded-[15px]'>
                                <p> {decisionMaker.length} Decision Maker brought in</p>
                                {decisionMaker.map((v: { name: string; organisation: any; }) => {


                                    return (
                                        <Accordion key={v.name} title={v.name} description={v.organisation} />
                                    )
                                })}
                            </div>
                            <div className='w-96 h-full shadow-xl p-4 rounded-[15px]'>
                                <p>{contractSent.length} Contract Sent</p>
                                {contractSent.map((v: { name: string; organisation: any; }) => {


                                    return (
                                        <Accordion key={v.name} title={v.name} description={v.organisation} />
                                    )
                                })}
                            </div>
                            <div className='w-96 h-full shadow-xl p-4 rounded-[15px]'>
                                <p>{contractSigned.length} Contract Signed</p>
                                {contractSigned.map((v: { name: string; organisation: any; }) => {


                                    return (
                                        <Accordion key={v.name} title={v.name} description={v.organisation} />
                                    )
                                })}
                            </div>
                            <div className='w-96 h-full shadow-xl p-4 rounded-[15px]'>
                                <p>{projectSigned.length} Project Started</p>
                                {projectSigned.map((v: { name: string; organisation: any; }) => {


                                    return (
                                        <Accordion key={v.name} title={v.name} description={v.organisation} />
                                    )
                                })}
                            </div>
                            <div className='w-96 h-full shadow-xl p-4 rounded-[15px]'>
                                <p>{projectInProgress.length} Project In Progress</p>
                                {projectInProgress.map((v: { name: string; organisation: any; }) => {


                                    return (
                                        <Accordion key={v.name} title={v.name} description={v.organisation} />
                                    )
                                })}
                            </div>
                            <div className='w-96 h-full shadow-xl p-4 rounded-[15px]'>
                                <p>{projectFinished.length} Project Finished</p>
                                {projectFinished.map((v: { name: string; organisation: any; }) => {


                                    return (
                                        <Accordion key={v.name} title={v.name} description={v.organisation} />
                                    )
                                })}
                            </div>
                        </div> : <p>Error generating data please refresg</p>
                    }

                </div>}


            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div >

    )
};


export default ClientJourney


