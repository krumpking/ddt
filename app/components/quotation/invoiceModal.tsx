import React, { FC, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { toPng } from "html-to-image";
import { jsPDF } from "jspdf";
import { addAClientToDB } from "../../api/crmApi";
import { getCookie } from "react-use-cookie";
import { ADMIN_ID, COOKIE_ID } from "../../constants/constants";
import { decrypt, encrypt } from "../../utils/crypto";


interface MyProps {
  isOpen: any,
  setIsOpen: any,
  invoiceInfo: any,
  items: any,
  onAddNextInvoice: any,
  onEditItem: (event: any) => void,
}



const InvoiceModal: FC<MyProps> = ({
  isOpen,
  setIsOpen,
  invoiceInfo,
  items,
  onAddNextInvoice,
}) => {
  function closeModal() {
    setIsOpen(false);
  }

  const addNextInvoiceHandler = () => {
    setIsOpen(false);
    onAddNextInvoice();
  };

  const SaveAsPDFHandler = () => {

    var infoFromCookie = "";
    if (getCookie(ADMIN_ID) == "") {
      infoFromCookie = getCookie(COOKIE_ID);
    } else {
      infoFromCookie = getCookie(ADMIN_ID);
    }

    var id = decrypt(getCookie(COOKIE_ID), COOKIE_ID);


    var prodA: any = [];

    items.forEach((el: any) => {
      prodA.push(encrypt(el.name, id))
    })


    var client = {
      id: id,
      adminId: decrypt(infoFromCookie, COOKIE_ID),
      date: new Date().toDateString(),
      name: encrypt(invoiceInfo.customerName, id),
      contact: encrypt(invoiceInfo.customerContact, id),
      organisation: encrypt(invoiceInfo.customerOrgainsation, id),
      stage: "",
      notes: [],
      refSource: "",
      enquired: prodA,
      value: "",
      encryption: 2,
      salesPerson: encrypt(invoiceInfo.cashierName, id),
    }

    addAClientToDB(client).then((r) => {
      alert('Client Added')


    }).catch((e) => {
      ;

      console.error(e);
    })


    const dom = document.getElementById("print");
    if (dom !== null) {
      toPng(dom)
        .then((dataUrl) => {
          const img = new Image();
          img.crossOrigin = "annoymous";
          img.src = dataUrl;
          img.onload = () => {
            // Initialize the PDF.
            const pdf = new jsPDF({
              orientation: "portrait",
              unit: "in",
              format: [5.5, 8.5],
            });

            // Define reused data
            const imgProps = pdf.getImageProperties(img);
            const imageType = imgProps.fileType;
            const pdfWidth = pdf.internal.pageSize.getWidth();

            // Calculate the number of pages.
            const pxFullHeight = imgProps.height;
            const pxPageHeight = Math.floor((imgProps.width * 8.5) / 5.5);
            const nPages = Math.ceil(pxFullHeight / pxPageHeight);

            // Define pageHeight separately so it can be trimmed on the final page.
            let pageHeight = pdf.internal.pageSize.getHeight();

            // Create a one-page canvas to split up the full image.
            const pageCanvas = document.createElement("canvas");
            const pageCtx = pageCanvas.getContext("2d");
            pageCanvas.width = imgProps.width;
            pageCanvas.height = pxPageHeight;

            for (let page = 0; page < nPages; page++) {
              // Trim the final page to reduce file size.
              if (page === nPages - 1 && pxFullHeight % pxPageHeight !== 0) {
                pageCanvas.height = pxFullHeight % pxPageHeight;
                pageHeight = (pageCanvas.height * pdfWidth) / pageCanvas.width;
              }
              // Display the page.
              const w = pageCanvas.width;
              const h = pageCanvas.height;
              if (pageCtx !== null) {
                pageCtx.fillStyle = "white";
                pageCtx.fillRect(0, 0, w, h);
                pageCtx.drawImage(img, 0, page * pxPageHeight, w, h, 0, 0, w, h);

                // Add the page to the PDF.
                if (page) pdf.addPage();

                const imgData = pageCanvas.toDataURL(`image/${imageType}`, 1);
                pdf.addImage(imgData, imageType, 0, 0, pdfWidth, pageHeight);
              }

            }
            // Output / Save
            pdf.save(`invoice-${invoiceInfo.invoiceNumber}.pdf`);
          };
        })
        .catch((error) => {
          console.error("oops, something went wrong!", error);
        });
    }

  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="my-8 inline-block w-full transform overflow-hidden rounded-lg bg-white text-left align-middle shadow-xl transition-all">
              <div className="p-16 border-2 border-black m-4" id="print">
                <h1 className="text-center text-lg font-bold text-gray-900 border-black border-2 text-bold">
                  Quotation
                </h1>
                <div className="grid grid-cols-2 border-y-2 border-black p-4">
                  <div className="flex flex-col border-r-2 border-black">
                    <h1 className="text-red-500 font-bold text-2xl"> DURAROOF </h1>
                    <h1>ZIMBABWE (PVT) LTD</h1>
                    <p>56 Edison Crescent, Graniteside Harare</p>
                    <p>ZIMBABWE</p>
                    <p>E-Mail: sales@duraroofcom.co.zw</p>
                    <p>TEL: +263 779 748 897/ +242 787 794</p>
                    <p>Vat No 10057846</p>
                  </div>
                  <div>
                    <img src="/images/logo.png" className="max-h-24 border-b-2 border-black w-full" />
                    <p className="border-black border-l-2 mx-4">Date </p>
                    <div className="mt-5 flex flex-row justify-between">
                      <p>{invoiceInfo.today}</p>
                      <p>Our refference</p>
                      <p>{invoiceInfo.cashierName}</p>
                    </div>

                  </div>
                </div>
                <div className="mt-6">
                  <div className="mb-4 grid grid-cols-2 border-y-2 p-4 border-black">

                    <div>
                      <p>{invoiceInfo.customerName}</p>
                      <p>{invoiceInfo.organisation}</p>
                      <p>{invoiceInfo.customerContact}</p>
                    </div>
                    <div className="border-l-2 border-black px-2">
                      <p>REF:{invoiceInfo.cashierName}</p>
                      <p>CELL:{invoiceInfo.spContact}</p>
                      <p>EMAIL:{invoiceInfo.email}</p>
                    </div>

                  </div>
                  <div className="grid grid-cols-2">
                    <div className="p-4">
                      <p className="font-bold">Please Note</p>
                      <ol className="list-decimal ">
                        <li>We take utmost care to give correct estimation on quantities but we shall not be held responsible for any shortfall or surplus</li>

                        <li>We do not offer flishing and guttering servivces</li>
                        <li>Our prices are inclusive of VAT</li>
                        <li>PRICES ARE SUBJECT TO CHANGE</li>
                        <li className="font-bold">This quotation is for ORIGINAL CHROMADEK</li>
                        <li className="text-red-500">We need 72 hours after payment for manufacturing</li>
                      </ol>
                    </div>
                    <div>

                      <table className="w-full text-left ">
                        <thead>
                          <tr className=" text-sm md:text-base p-4">
                            <th>ITEM</th>
                            <th className="text-center">QTY</th>
                            <th className="text-right">PRICE</th>
                            <th className="text-right">AMOUNT</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item: any) => (
                            <tr key={item.id}>
                              <td className="w-full">{item.name}</td>
                              <td className="min-w-[50px] text-center">
                                {item.qty}
                              </td>
                              <td className="min-w-[80px] text-right">
                                ${Number(item.price).toFixed(2)}
                              </td>
                              <td className="min-w-[90px] text-right">
                                ${Number(item.price * item.qty).toFixed(2)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="mt-4 flex flex-col items-end space-y-2">
                        <div className="flex w-full justify-between border-t border-black/10 pt-2">
                          <span className="font-bold">Subtotal:</span>
                          <span>${invoiceInfo.subtotal.toFixed(2)}</span>
                        </div>
                        <div className="flex w-full justify-between">
                          {/* TO BE CORRECTED */}
                          <span className="font-bold">Discount:</span>
                          <span>${typeof invoiceInfo.discountRate === "number" ? 0 : invoiceInfo.discountRate.toFixed(2)}</span>
                        </div>
                        <div className="flex w-full justify-between">
                          <span className="font-bold">Tax:</span>
                          <span>${invoiceInfo.taxRate.toFixed(2)}</span>
                        </div>
                        <div className="flex w-full justify-between border-t border-black/10 py-2">
                          <span className="font-bold">Total:</span>
                          <span className="font-bold">
                            $
                            {invoiceInfo.total % 1 === 0
                              ? invoiceInfo.total
                              : invoiceInfo.total.toFixed(2)}
                          </span>
                        </div>
                      </div>

                    </div>

                  </div>
                  <div className="w-full text-center border-t-2 border-black">
                    <p className="text-red-500">WE VALUE YOUR BUSINESS</p>
                  </div>

                </div>
              </div>
              <div className="mt-4 flex space-x-2 px-4 pb-6">
                <button
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
                  onClick={SaveAsPDFHandler}
                >

                  <span>Download</span>
                </button>

              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog >
    </Transition >
  );
};

export default InvoiceModal;
