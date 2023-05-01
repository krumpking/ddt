import { collection } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";

// Main
export const API_ROUTE = 'API_ROUTE'

export const WHATSAPP_CONTACT = 'https://wa.me/263772263139?text=Hello%I%want%to%know%more%about%Digital%Data%Tree%I%got%your%number%from%whatsapp';

export const PRIMARY_COLOR = '#00947a';

export const SECONDARY_COLOR = '#0fa991';

export const THIRD_COLOR = '#0ead96';

export const FOURTH_COLOR = '#027f6d';

export const FIFTH_COLOR = '#fdc92f';

export const SIX_COLOR = '#7d5c00';

export const LIGHT_GRAY = '#ECECEC';


export const ADMINS_DB_REF = collection(firestore, "admins");
export const ADMINS_PAYMENTS_REF = collection(firestore, `payments`);

export const COOKIE_NAME = 'gMh88OSfz';
export const COOKIE_PHONE = 'jZmDw9V3i';
export const COOKIE_ORGANISATION = '6a7ZP6ZtJ';
export const COOKIE_EMAIL = '1OU2lbIQK';
export const COOKIE_ID = 'y5Kgz3qY';


export const TEMPLATES = [
    {
        id: "string",
        title: "Security Log Form",
        description: "Helps record all entrance and depatures into the building",
        elements: [1, 2, 3, 4, 5, 6, 7],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "string",
        title: "Insurence Claim Form",
        description: "Capture all information about your claim",
        elements: [1, 2, 3, 4, 5, 6, 7],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "string",
        title: "Farm Inspection Form",
        description: "See how the crops are doing in realtime",
        elements: [1, 2, 3, 4, 5, 6, 7],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "string",
        title: "Property Inspection Form",
        description: "Keep tabs on how well your properties are being handled",
        elements: [1, 2, 3, 4, 5, 6, 7],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "string",
        title: "Library Inventory Form",
        description: "Keep up to date with the books available in the library",
        elements: [1, 2, 3, 4, 5, 6, 7],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "string",
        title: "Doctor's Visit Form",
        description: "Get information to your doctor in a quick, secure and simple way",
        elements: [1, 2, 3, 4, 5, 6, 7],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "string",
        title: "string",
        description: "string",
        elements: [1, 2, 3, 4, 5, 6, 7],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "string",
        title: "string",
        description: "string",
        elements: [1, 2, 3, 4, 5, 6, 7],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "string",
        title: "string",
        description: "string",
        elements: [1, 2, 3, 4, 5, 6, 7],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
    {
        id: "string",
        title: "string",
        description: "string",
        elements: [1, 2, 3, 4, 5, 6, 7],
        ipAddress: "string",
        areasLocked: "string",
        dateCreated: "string"
    },
]

export const PRODUCTION_CLIENT_ID = "Aaj2goduVRQ4UAkq_OorphhSJmPCTAcFcL81iwNbYq8RJIHG8RwAMYIyOEVsd4K3bWY2xOQFkHXIYy5y";






