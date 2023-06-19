import React, { useState } from 'react'
import { FC } from 'react';
import { createId } from '../utils/stringM';
import { getCookie } from 'react-use-cookie';
import { ADMIN_ID, COOKIE_ID } from '../constants/constants';
import { decrypt, encrypt } from '../utils/crypto';
import { addAClientToDB } from '../api/crmApi';
import Loader from './loader';
import { ToastContainer, toast } from 'react-toastify';
import MyQuotation from './quotations';
import InvoiceForm from './quotation/invoiceForm';




const GenerateQuotation = () => {
    const [fullName, setFullName] = useState("");
    const [contact, setContact] = useState("");
    const [organisation, setOrganisation] = useState("");
    const [stage, setStage] = useState("");
    const [notes, setNotes] = useState("");
    const [refSource, setRefSource] = useState("");
    const [loading, setLoading] = useState(false);
    const [products, setProducts] = useState("");
    const [totalAmount, setTotalAmount] = useState("");


    const addClient = () => {
        setLoading(true);
        var infoFromCookie = "";
        if (getCookie(ADMIN_ID) == "") {
            infoFromCookie = getCookie(COOKIE_ID);
        } else {
            infoFromCookie = getCookie(ADMIN_ID);
        }

        var id = decrypt(getCookie(COOKIE_ID), COOKIE_ID);

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
            id: id,
            adminId: decrypt(infoFromCookie, COOKIE_ID),
            date: new Date().toDateString(),
            name: encrypt(fullName, id),
            contact: encrypt(contact, id),
            organisation: encrypt(organisation, id),
            stage: encrypt(stage, id),
            notes: notesA,
            refSource: encrypt(refSource, id),
            enquired: prodA,
            value: encrypt(totalAmount, id),
            encryption: 2
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
                : <>
                    <InvoiceForm />
                </>}
            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div >

    )
};


export default GenerateQuotation
