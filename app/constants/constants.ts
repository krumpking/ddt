import { collection } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
import { createId } from "../utils/stringM";

// Main
export const API_ROUTE = 'API_ROUTE'

export const WHATSAPP_CONTACT = 'https://wa.me/263713020524?text=Hello%I%want%to%know%more%about%Digital%Data%Tree%I%got%your%number%from%whatsapp';

export const DOWNLOAD_APP = 'https://play.google.com/store/apps/details?id=com.visionisprimary.digitaldatatree';

export const PRIMARY_COLOR = '#00947a';

export const SECONDARY_COLOR = '#0fa991';

export const THIRD_COLOR = '#0ead96';

export const FOURTH_COLOR = '#027f6d';

export const FIFTH_COLOR = '#fdc92f';

export const SIX_COLOR = '#7d5c00';

export const LIGHT_GRAY = '#ECECEC';


export const ADMINS_DB_REF = collection(firestore, "admins");
export const ADMINS_PAYMENTS_REF = collection(firestore, `payments`);
export const AFF_DB_REF = collection(firestore, "affiliates");
export const AFF_SALES_DB_REF = collection(firestore, "affiliates-sales");
export const COOKIE_NAME = 'gMh88OSfz';
export const COOKIE_PHONE = 'jZmDw9V3i';
export const COOKIE_ORGANISATION = '6a7ZP6ZtJ';
export const COOKIE_AFFILIATE_NUMBER = '7894236150jklasdfghjkl';
export const COOKIE_EMAIL = '1OU2lbIQK';
export const COOKIE_ID = 'y5Kgz3qY';
export const URL_LOCK_ID = 'AaM2a1VHtTXZWjcVw7hjrsM7aR8SJ6L5OL00rYUdf';


export const TEMPLATES = [
    {
        id: "vistorslog",
        title: "Visitors Log Form",
        description: "Helps record all entrance and depatures into the building",
        elements: [
            {
                id: createId(),
                elementId: 10,
                label: "Date",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 7,
                label: "Time In",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 0,
                label: "Name of visitor",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 1,
                label: "Reason for visit",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 0,
                label: "Person Visiting",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 7,
                label: "Time Out",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 0,
                label: "Nation ID No",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 17,
                label: "Signature",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 0,
                label: "Security Initials",
                arg1: "",
                arg2: "",
                arg3: "",
            },

        ],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "inventorytracking",
        title: "Inventory Tracking",
        description: "Helps record all entrance and depatures into the building",
        elements: [
            {
                id: createId(),
                elementId: 2,
                label: "Item Number",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Description",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Quantity",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 10,
                label: "Last Date Updated",
                arg1: "",
                arg2: "",
                arg3: "",
            },


        ],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "employeetimesheet",
        title: "Employee Timesheet",
        description: "Record Employee time spent at work",
        elements: [
            {
                id: createId(),
                elementId: 0,
                label: "Employee Title",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Employee Identification Number",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 0,
                label: "Employee Type",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 0,
                label: "Department / Team",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 0,
                label: "Active Supervisor",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 10,
                label: "Date",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 7,
                label: "Start Time",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 7,
                label: "End Time",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Regular hours",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Overtime",
                arg1: "",
                arg2: "",
                arg3: "",
            },



        ],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "employeebasicinfo",
        title: "Employee Basic Info",
        description: "Record Employee Basic Information",
        elements: [
            {
                id: createId(),
                elementId: 0,
                label: "Employee Full Name",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 1,
                label: "Address",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Home Phone",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Cell Phone",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 3,
                label: "Email",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 0,
                label: "National ID",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 10,
                label: "Date of Birth",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 5,
                label: "Marital Status",
                arg1: ['Married', 'Single'],
                arg2: ['Married', 'Single'],
                arg3: ['Married', 'Single'],
            },
            {
                id: createId(),
                elementId: 0,
                label: "Next of Kin Name",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Next of Kin Phone Number",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Next of Kin Address",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Next of Kin relationship",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 0,
                label: "Job Title",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 0,
                label: "Supervisor",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 0,
                label: "Work Location",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 3,
                label: "Email Address",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Work Phone",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 10,
                label: "Start Date",
                arg1: "",
                arg2: "",
                arg3: "",
            },
            {
                id: createId(),
                elementId: 2,
                label: "Salary",
                arg1: "",
                arg2: "",
                arg3: "",
            },



        ],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    }

]

export const PRODUCTION_CLIENT_ID = "AaM2a1VHtTXZWjcVw7hjrsM7aR8SJ6L5OL00rYUdf_3BeTONzf7FvQrFvRwLq4T0X-9xaliSbRRwRTKX";


export const NEXT_PUBLIC_GOOGLE_ANALYTICS = 'G-EG2R1271VF'





