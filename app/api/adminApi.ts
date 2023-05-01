import { addDoc, collection, getCountFromServer, getDoc, getDocs, query, where } from "firebase/firestore";
import { ADMINS_DB_REF } from "../constants/constants";
import { IAdmin, IForm } from "../types/types";
import { writeBatch, doc } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";



export const addAdmin = async (admin: IAdmin) => {

    // Create a query against the collection.
    const q = query(ADMINS_DB_REF, where("phoneNumber", "==", admin.phoneNumber));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
        return null;
    } else {
        return addDoc(ADMINS_DB_REF, admin);
    }


}

export const getUser = async (phone: string) => {

    const q = query(collection(firestore, "admins"), where("phoneNumber", "==", phone));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {

        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } else {
        return null;
    }


}


export const getForms = async (id: string) => {

    // Create a query against the collection.
    const q = query(collection(firestore, "forms"), where("creatorId", "==", id));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
        const querySnapshot = await getDocs(q);
        return {
            count: snapshot.data().count,
            data:
                querySnapshot
        };
    } else {
        return null;
    }


}

export const getOneForm = async (id: string, formId: string) => {
    // Create a query against the collection.
    const q = query(collection(firestore, "forms"), where("creatorId", "==", id), where("id", "==", formId));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    } else {
        return null;
    }
}


export const addForm = async (id: string, form: IForm) => {


    // Create a query against the collection.
    const ADMINS_FORM_REF = collection(firestore, `forms`);


    return await addDoc(ADMINS_FORM_REF, form);



}



