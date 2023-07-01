import React, { Fragment, useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import { LIGHT_GRAY, URL_LOCK_ID } from '../../app/constants/constants';
import Payment from '../../app/utils/paymentUtil';
import ClientNav from '../../app/components/clientNav';
import ReactTable from "react-table";

import { IData, IDynamicObject } from '../../app/types/types';
import { forEach } from 'lodash';
import { decrypt, simpleDecrypt } from '../../app/utils/crypto';
import Loader from '../../app/components/loader';
import { getDate, getMonth, isBase64 } from '../../app/utils/stringM';
import { downloadExcel } from '../../app/utils/excel';
import { Dialog, Transition } from '@headlessui/react';
import ReturnElements from '../../app/components/returnElements';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Document, ImageRun, Packer, Paragraph, TextRun } from 'docx';
import fs from 'fs';
import { saveAs } from 'file-saver';
import { getUrl } from '../../app/utils/getImageUrl';
import { HexColorPicker } from "react-colorful";
import { getSpecificData } from '../../app/api/formApi';
import { print } from '../utils/console';


const ConfirmSotck = () => {
    const router = useRouter();
    const [label, setLabel] = useState<any[]>([{"date", "category", "name", "price", "number"}]);
    const [data, setData] = useState<any[]>([
        {
            date: "26 June 2023",
            category: "Nike",
            name: "Ball",
            price: "500",
            number: "600"
        }
    ]);
    const [loading, setLoading] = useState(true);
    const [imageBase64, setImageBase64] = useState("");
    const [excelData, setExcelData] = useState<any>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [columnLayout, setColumnLayout] = useState(true);
    const [rowInfo, setRowInfo] = useState<any[]>([]);
    const ref = React.createRef();
    const [changedLayout, setChangedLayout] = useState(true);

    return (
        <div>
            <div className='flex flex-col'>


                {loading ?
                    <div className='flex flex-col justify-center items-center w-full col-span-8'>
                        <Loader />
                    </div> :
                    <div className='p-4 lg:p-8 2xl:p-16 rounded-md flex flex-col'>
                        <div className="overflow-x-auto whitespace-nowrap">
                            <table className="table-auto border-separate border-spacing-1 ">
                                <thead className='bg-[#00947a] text-white font-bold w-full '>
                                    <tr>
                                        {data.map((v: any) => (
                                            <th key={v.label} className='text-left'>{v.label}</th>
                                        ))}
                                    </tr>


                                </thead>
                                <tbody>

                                    {
                                        label.map((value: any, index: number) => {
                                            return (
                                                <tr key={index}
                                                    className={'odd:bg-white even:bg-slate-50 hover:bg-[#0ead96] hover:text-white hover:cursor-pointer'}>
                                                    {data.map((v: any) => 
                                                </tr>
                                                    )
                                        }
                                    }


                                </tbody>
                            </table>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setLoading(true);

                                    var exlD: any[] = [];
                                   
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
                            >Download Table as Excel File</button>
                        </div>

                    </div>}




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default ConfirmSotck




