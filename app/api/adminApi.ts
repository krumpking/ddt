import { addDoc, collection, getCountFromServer, getDoc, getDocs, query, where } from "firebase/firestore";
import { ADMINS_DB_REF } from "../constants/constants";
import { IAdmin } from "../types/type";
import { writeBatch, doc } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";



export const addAdmin = async (admin: IAdmin) => {

    // Create a query against the collection.
    const q = query(ADMINS_DB_REF, where("phoneNumber", "==", admin.phoneNumber));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
        return null;
    } else {
        return await addDoc(ADMINS_DB_REF, admin);
    }


}

export const getUser = async (phone: string) => {
    const q = query(collection(firestore, "admins"), where("phoneNumber", "==", phone));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
        return null;
    } else {
        const querySnapshot = await getDocs(q);
        return querySnapshot;
    }


}


export const getFroms = async (id: string) => {

    // Create a query against the collection.
    const querySnapshot = await getDocs(collection(firestore, `/${id}/forms`));
    return querySnapshot;


}

export const getOneForm = async (adminId: string, formId: string) => {
    const ref = doc(firestore, adminId, formId);
    const docSnap = await getDoc(ref);
    if (docSnap.exists()) {
        return docSnap.data();
    } else {
        return null;
    }
}




