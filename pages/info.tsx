import React, { useCallback, useEffect, useState } from 'react'
import { ADMIN_ID, COOKIE_ID, LIGHT_GRAY, PERSON_ROLE, PRIMARY_COLOR } from '../app/constants/constants';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ClientNav from '../app/components/clientNav';
import { useDropzone } from 'react-dropzone'
import { getBase64 } from '../app/utils/fileMethods';
import { getCookie } from 'react-use-cookie';
import { addOrgToDB, getOrgInfoFromDB } from '../app/api/orgApi';
import { decrypt, encrypt } from '../app/utils/crypto';
import { print } from '../app/utils/console';


const Support = () => {
    const [organizationName, setOrganizationName] = useState("");
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");
    const [call, setCall] = useState("");
    const [landline, setLandline] = useState("");
    const [vat, setVat] = useState(0);
    const [image, setImage] = useState<any>()
    const [imageAdded, setImageAdded] = useState(false);
    const [loading, setLoading] = useState(false);
    const [quotation, setQuotation] = useState("");
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
                if (roleTitle == "Editor") { // "Viewer" //"Editor"
                    router.push('/home');
                    toast.info("You do not have permission to access this page");
                }

            }
        }



    }, [])


    const onDrop = useCallback((acceptedFiles: any[]) => {

        var reader = new FileReader();
        reader.readAsDataURL(acceptedFiles[0]);
        reader.onload = function () {
            if (reader.result !== null) {
                setImage(reader.result);
                setImageAdded(true);
            }

        };
        reader.onerror = function (error) {
            console.log('Error: ', error);
        };
        // Do something with the files





    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({ onDrop });


    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;
        getOrgInfo();



    }, [])


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


            if (r !== null) {

                r.data.forEach(element => {

                    setOrganizationName(decrypt(element.data().organizationName, id));
                    setAddress(decrypt(element.data().address, id));
                    setEmail(decrypt(element.data().email, id));
                    setCall(decrypt(element.data().call, id));
                    setLandline(decrypt(element.data().landline, id));
                    setVat(parseInt(decrypt(element.data().vat, id)));
                    setImage(element.data().image);
                    setQuotation(decrypt(element.data().quotation, id))
                });

            }
            setLoading(false);

        }).catch((e) => {
            console.error(e);
            setLoading(false);
        });
    }




    const addOrg = () => {
        setLoading(true);
        var infoFromCookie = "";
        if (getCookie(ADMIN_ID) == "") {
            infoFromCookie = getCookie(COOKIE_ID);
        } else {
            infoFromCookie = getCookie(ADMIN_ID);
        }
        var id = decrypt(infoFromCookie, COOKIE_ID);
        var org = {
            image: image,
            adminId: id,
            organizationName: encrypt(organizationName, id),
            address: encrypt(address, id),
            email: encrypt(email, id),
            call: encrypt(call, id),
            landline: encrypt(landline, id),
            vat: encrypt(vat.toString(), id),
            encryption: 2,
            quotation: encrypt(quotation, id)
        }

        addOrgToDB(org).then((e) => {
            setLoading(false);
            toast.success("Added Successfully");
        }).catch((e: any) => {
            console.error(e);
            setLoading(false);
            toast.error("There was an error adding information please try again");
        })
    }


    return (
        <div>
            <div className='flex flex-col lg:grid lg:grid-cols-12'>

                <div className='lg:col-span-3'>
                    <ClientNav organisationName={'Vision Is Primary'} url={'info'} />
                </div>


                <div className='bg-white col-span-9 m-8 rounded-[30px]  p-8'>

                    {loading ?
                        <div className='w-full flex flex-col items-center content-center'>
                            <Loader />

                        </div>
                        : <div className='grid grid-cols-1 lg:grid-cols-2'>
                            <div className='flex flex-col items-center space-y-4'>
                                <img src={imageAdded ? image : `${image}`} className='rounded-[25px] shadow-md w-48 h-48' />
                                <h1>
                                    {organizationName}
                                </h1>
                                <h1>
                                    {address}
                                </h1>
                                <h1>
                                    Email: {email}
                                </h1>
                                <h1>
                                    Tel: {call} /{landline}
                                </h1>
                                <h1>
                                    Tax No {vat}
                                </h1>
                                {quotation.includes(",") ?
                                    <ul className="list-decimal">
                                        {quotation.split(",").map((v) => (
                                            <li key={v}>{v}</li>
                                        ))}
                                    </ul>
                                    : <p>{quotation}</p>
                                }
                            </div>
                            <div className='flex flex-col items-center space-y-2 w-full'>
                                <p className='text-center text-xs text-gray-300 mb-4 font-bold'>Update Organization Info</p>

                                <div {...getRootProps()} className='border-dashed h-48 w-64 border-2 p-8 flex content-center items-center text-center' >
                                    <input {...getInputProps()} />
                                    <>
                                        {imageAdded ? <p>Logo added</p>
                                            : <>
                                                {
                                                    isDragActive ?
                                                        <p>Drop the logo here ...</p> :
                                                        <p> Drag &lsquo;n&lsquo; drop some logo here, or click to select image</p>
                                                }
                                            </>
                                        }
                                    </>

                                </div>

                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={organizationName}
                                        placeholder={"Organization Name"}
                                        onChange={(e) => {
                                            setOrganizationName(e.target.value);
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
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={address}
                                        placeholder={"Address"}
                                        onChange={(e) => {
                                            setAddress(e.target.value);
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
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={email}
                                        placeholder={"Main email"}
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
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={call}
                                        placeholder={"Main Phone"}
                                        onChange={(e) => {
                                            setCall(e.target.value);
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
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="text"
                                        value={landline}
                                        placeholder={"Landline"}
                                        onChange={(e) => {
                                            setLandline(e.target.value);
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
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <input
                                        type="number"
                                        value={vat}
                                        placeholder={"VAT Number"}
                                        onChange={(e) => {
                                            setVat(parseInt(e.target.value));
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
                                        required
                                    />
                                </div>
                                <div className="mb-6">
                                    <textarea
                                        value={quotation}
                                        placeholder={"Quotation Terms"}
                                        onChange={(e) => {
                                            setQuotation(e.target.value);
                                        }}
                                        className="
                                        h-48
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
                                        required
                                    />
                                </div>

                                <button
                                    onClick={() => { addOrg() }}
                                    className="
                                        font-bold
                                        w-ful
                                        rounded-[25px]
                                        border-2
                                        border-[#fdc92f]
                                        border-primary
                                        py-3
                                        px-10
                                        bg-[#fdc92f]
                                        text-base 
                                        text-[#7d5c00]
                                        cursor-pointer
                                        hover:bg-opacity-90
                                        transition
                                    ">
                                    Add Organization Info
                                </button>

                            </div>
                        </div>}


                </div>




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default Support
