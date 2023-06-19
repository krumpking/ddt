import React, { useEffect, useState } from 'react'
import { LIGHT_GRAY, PRIMARY_COLOR } from '../app/constants/constants';
import Loader from '../app/components/loader';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router'
import ClientNav from '../app/components/clientNav';
import ReactGA from 'react-ga';
import { Tab } from '@headlessui/react';
import GenerateQuotation from '../app/components/generateQuotation';

function classNames(...classes: string[]) {
    return classes.filter(Boolean).join(' ')
}

const Accounting = () => {
    const [phone, setPhone] = useState("");
    const [accessCode, setAccessCode] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const router = useRouter();
    const [tabs, setTabs] = useState([
        "Add Quotation",
        "Add Invoice",
        // "Add Expenses",
        // "Client Journey",
        "Reports",
        "Custom Data Collection"
    ])




    useEffect(() => {
        document.body.style.backgroundColor = LIGHT_GRAY;
        ReactGA.initialize('AW-11208371394');
        ReactGA.pageview(window.location.pathname + window.location.search);

        return () => {

        }

    }, []);






    return (
        <div>
            <div className='grid grid-cols-12'>

                <div className='col-span-3'>
                    <ClientNav organisationName={'Vision Is Primary'} url={'accounting'} />
                </div>

                <div className="w-full m-2 px-2 py-8 sm:px-0 col-span-9 ">
                    <Tab.Group>
                        <Tab.List className="flex space-x-1 rounded-[25px] bg-green-900/20 p-1">
                            {tabs.map((category) => (
                                <Tab
                                    key={category}
                                    className={({ selected }) =>
                                        classNames(
                                            'w-full  py-2.5 text-sm font-medium leading-5 text-[#00947a] rounded-[25px]',
                                            'ring-white ring-opacity-60 ring-offset-2 ring-offset-[#00947a] focus:outline-none focus:ring-2',
                                            selected
                                                ? 'bg-white shadow'
                                                : 'text-blue-100 hover:bg-white/[0.12] hover:text-white'
                                        )
                                    }
                                >
                                    {category}
                                </Tab>
                            ))}
                        </Tab.List>
                        <Tab.Panels className="mt-2 ">

                            <Tab.Panel

                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
                                )}
                            >
                                <GenerateQuotation />
                            </Tab.Panel>
                            <Tab.Panel

                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
                                )}
                            >
                                {/* <ClientProfile /> */}
                            </Tab.Panel>
                            <Tab.Panel

                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white ring-opacity-60 ring-offset-2 focus:outline-none focus:ring-2'
                                )}
                            >
                                {/* <CRMTasks /> */}
                            </Tab.Panel>
                            <Tab.Panel

                                className={classNames(
                                    'rounded-xl bg-white p-3',
                                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none focus:ring-2'
                                )}
                            >
                                <p>Custom Data Collection</p>
                            </Tab.Panel>

                        </Tab.Panels>
                    </Tab.Group>
                </div>




            </div>

            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </div>

    )
};


export default Accounting
