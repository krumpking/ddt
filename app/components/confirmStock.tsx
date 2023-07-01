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
    const [data, setData] = useState<any>();
    const [loading, setLoading] = useState(true);
    const [imageBase64, setImageBase64] = useState("");
    const [excelData, setExcelData] = useState<any>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [columnLayout, setColumnLayout] = useState(true);
    const [rowInfo, setRowInfo] = useState<any[]>([]);
    const ref = React.createRef();
    const [changedLayout, setChangedLayout] = useState(true);





    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;


        checkPayment();

        if (router.isReady) {
            print("Hello");
        }





    }, [router.isReady]);

    const checkPayment = async () => {
        const paymentStatus = await Payment.checkPaymentStatus();
        if (!paymentStatus) {
            toast.warn('It appears your payment is due, please pay up to continue enjoying Digital Data Tree');

            setTimeout(() => {
                router.push({
                    pathname: '/payments',
                });
            }, 5000);

        }
    }



    const downloadPdf = () => {
        const input = document.getElementById('divToPrint');
        if (input !== null) {
            html2canvas(input, { useCORS: true })
                .then((canvas) => {
                    const imgData = canvas.toDataURL('image/png');
                    const pdf = new jsPDF();
                    const imgProperties = pdf.getImageProperties(canvas);
                    const pdfWidth = pdf.internal.pageSize.getWidth();
                    const pdfHeight =
                        (imgProperties.height * pdfWidth) / imgProperties.width;
                    pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, pdfHeight);
                    // pdf.output('dataurlnewwindow');
                    pdf.save(`${data?.title}.pdf`);
                })
        }

    }


    const downloadWordDoc = async () => {
        const dataFromRow: Paragraph[] = [];

        rowInfo.forEach(async (element) => {


            if (element.element == 11) {

                if (typeof data !== 'undefined') {


                    var imageBuffer = await getUrl(`/${data.infoId}/11/${simpleDecrypt(element.info, data.infoId + data.infoId + data.infoId)}`);
                    if (imageBuffer !== null) {
                        dataFromRow.push(new Paragraph({
                            children: [
                                new ImageRun({
                                    data: imageBuffer,
                                    transformation: {
                                        width: 903,
                                        height: 1149,
                                    },
                                }),
                            ]
                        }));
                    }

                }

            } else if (element.element == 17) {
                dataFromRow.push(new Paragraph({
                    children: [


                        new TextRun('Signature')


                    ]
                }));
            } else {
                if (typeof data !== 'undefined') {
                    dataFromRow.push(new Paragraph({
                        children: [


                            new TextRun(simpleDecrypt(element.info, `${data.infoId + data.infoId + data.infoId}`))


                        ]
                    }));
                }
            }


        });


        const doc = new Document({
            sections: [
                {
                    properties: {},
                    children: dataFromRow,
                }
            ]

        });



        Packer.toBlob(doc).then((buffer) => {

            saveAs(buffer, `${data?.title}.docx`);
            // fs.writeFileSync(`${data?.title}.docx`, buffer);

        });


    }






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
                                        data.map((value: any, index: number) => {
                                            return (
                                                <tr key={index}
                                                    className={'odd:bg-white even:bg-slate-50 hover:bg-[#0ead96] hover:text-white hover:cursor-pointer'}
                                                    onClick={() => { setIsOpen(true); setRowInfo(data.info[index].data) }}>
                                                    {data?.info[index].data.map((v: any) => {
                                                        var resInfo = simpleDecrypt(v.info, data.infoId + data.infoId + data.infoId);


                                                        if (v.element == 17) {
                                                            return (
                                                                <td className='text-left' key={v.info}>Signature</td>
                                                            )

                                                        } else if (v.element == 8) {
                                                            var totalString = simpleDecrypt(v.info, data.infoId + data.infoId + data.infoId);
                                                            var firstString = totalString.substring(0, totalString.indexOf(" - "));
                                                            var secString = totalString.substring(totalString.indexOf(" - ") + 2, totalString.length);
                                                            return (
                                                                <td key={v.info}>{getDate(firstString)} - {getDate(secString)} </td>
                                                            )

                                                        } else if (v.element == 9) {

                                                            return (
                                                                <td key={v.info}>{getMonth(simpleDecrypt(v.info, data.infoId + data.infoId + data.infoId))}</td>
                                                            )
                                                        } else if (v.element == 10) {

                                                            return (
                                                                <td key={v.info}>{getDate(simpleDecrypt(v.info, data.infoId + data.infoId + data.infoId))}</td>
                                                            )

                                                        } else if (v.element == 16) {
                                                            return (
                                                                <td key={v.info}>
                                                                    <p>Location</p>
                                                                </td>
                                                            )
                                                        } else {
                                                            return (
                                                                <td className='text-left' key={v.info}>{resInfo}</td>
                                                            )
                                                        }




                                                    })

                                                    }

                                                </tr>
                                            )
                                        })
                                    }


                                </tbody>
                            </table>
                        </div>
                        <div>
                            <button
                                onClick={() => {
                                    setLoading(true);

                                    var exlD: any[] = [];
                                    // data?.info.forEach(element => {
                                    //     const object: IDynamicObject = {};
                                    //     element.data.forEach((el: any) => {
                                    //         var resInfo = simpleDecrypt(el.info, data.infoId + data.infoId + data.infoId);
                                    //         object[el.label] = resInfo;
                                    //     });
                                    //     exlD.push(object);


                                    // });

                                    downloadExcel(exlD, typeof data?.title === 'undefined' ? 'info' : data?.title);
                                    setLoading(false);
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




