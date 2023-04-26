import { addDoc, collection, getCountFromServer, getDocs, query, where } from "firebase/firestore";
import { DB_REF } from "../constants/constants";
import { Admin } from "../types/type";
import { writeBatch, doc } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";



export const addAdmin = async (admin: Admin) => {


    const citiesRef = collection(firestore, "Admin");

    // Create a query against the collection.
    const q = query(citiesRef, where("phoneNumber", "==", admin.phoneNumber));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
        return false;
    } else {
        return await addDoc(DB_REF, admin);
    }


}




