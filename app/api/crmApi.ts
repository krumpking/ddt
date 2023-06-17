import { CRM_DB_REF } from "../constants/crmContacts";
import { addDoc, doc, getCountFromServer, getDocs, query, updateDoc, where } from "firebase/firestore";
import { IClient } from "../types/userTypes";
import { getCookie } from "react-use-cookie";
import { ADMIN_ID, COOKIE_ID } from "../constants/constants";
import { print } from "../utils/console";
import { decrypt } from "../utils/crypto";
import { firestore } from "../../firebase/clientApp";





export const addAClientToDB = async (client: IClient) => {
    // Create a query against the collection.

    return addDoc(CRM_DB_REF, client);



}


export const getAllClientsToDB = async () => {
    // Create a query against the collection.

    var infoFromCookie = "";
    if (getCookie(ADMIN_ID) == "") {
        infoFromCookie = getCookie(COOKIE_ID);
    } else {
        infoFromCookie = getCookie(ADMIN_ID);
    }

    print(infoFromCookie);
    const q = query(CRM_DB_REF, where("adminId", "==", decrypt(infoFromCookie, COOKIE_ID)));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {

        const querySnapshot = await getDocs(q);
        return {
            data: querySnapshot,
            count: snapshot.data().count
        }

    } else {
        return null;

    }



}


export const updateClientToDB = async (id: string, form: IClient) => {
    return await updateDoc(doc(firestore, "clients", id), form);

}



