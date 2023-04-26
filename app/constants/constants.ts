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


export const DB_REF = collection(firestore, "admins");