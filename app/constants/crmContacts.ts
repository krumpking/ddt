import { collection } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";



export const CRM_DB_REF = collection(firestore, "clients");