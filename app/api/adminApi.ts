import { addDoc, collection, deleteDoc, getCountFromServer, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { ADMINS_DB_REF, ADMINS_PAYMENTS_REF, AFF_DB_REF, AFF_SALES_DB_REF, COOKIE_AFFILIATE_NUMBER, COOKIE_ID, COOKIE_PHONE } from "../constants/constants";
import { IAdmin, IAffiliate, IForm, IPayments } from "../types/types";
import { writeBatch, doc } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
import Random from "../utils/random";
import { getCookie, setCookie } from "react-use-cookie";
import { decrypt, encrypt } from "../utils/crypto";
import { print } from "../utils/console";



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
        return {
            data: querySnapshot,
            userType: 'admin'
        };
    } else {
        const q = query(collection(firestore, "affiliates"), where("phoneNumber", "==", phone));
        const snapshot = await getCountFromServer(q);
        if (snapshot.data().count > 0) {
            const querySnapshot = await getDocs(q);
            return {
                data: querySnapshot,
                userType: 'affiliate'
            };;
        } else {
            return null;
        }
    }


}


export const getUserById = async (id: string) => {

    const q = query(collection(firestore, "admins"), where("id", "==", id));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
        const querySnapshot = await getDocs(q);
        return {
            data: querySnapshot,
            userType: 'admin'
        };
    } else {
        const q = query(collection(firestore, "affiliates"), where("id", "==", id));
        const snapshot = await getCountFromServer(q);
        if (snapshot.data().count > 0) {
            const querySnapshot = await getDocs(q);
            return {
                data: querySnapshot,
                userType: 'affiliate'
            };;
        } else {
            return null;
        }
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

export const getOneForm = async (id: string) => {
    // Create a query against the collection.
    const docRef = doc(firestore, "forms", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {

        return {
            count: 1,
            data:
                snapshot
        };
    } else {
        return null;
    }
}


export const addForm = async (id: string, form: IForm) => {


    // Create a query against the collection.
    const ADMINS_FORM_REF = collection(firestore, `forms`);


    return await addDoc(ADMINS_FORM_REF, form);



}

export const updateForm = async (id: string, form: IForm) => {




    return await updateDoc(doc(firestore, "forms", id), form);



}


export const addPayment = async (payment: IPayments) => {

    // Create a query against the collection.


    return await addDoc(ADMINS_PAYMENTS_REF, payment);


}

export const getPayments = async (userIdEncry: string) => {


    var deId = decrypt(userIdEncry, COOKIE_ID);

    // Create a query against the collection.
    const q = query(collection(firestore, "payments"), where("userId", "==", deId));
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



export const getAllData = async (id: string) => {
    // Create a query against the collection.
    const q = query(collection(firestore, "data"), where("editorId", "==", id));
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


export const getSpecificData = async (id: string) => {

    // Create a query against the collection.

    const docRef = doc(firestore, "data", id);
    const snapshot = await getDoc(docRef);

    if (snapshot.exists()) {

        return {
            count: 1,
            data:
                snapshot
        };
    } else {
        return null;
    }
}


export const getPromo = async (code: string) => {

    // Create a query against the collection.
    const q = query(collection(firestore, "promo"), where("code", "==", code), where("used", "==", false));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach(async element => {
            console.log(element);
            await updateDoc(doc(firestore, "promo", element.id), {
                used: true
            });
        });



        return true;
    } else {
        return false;
    }


}


export const addAffiliate = async (affiliate: IAffiliate) => {



    // Create a query against the collection.
    const coll = collection(firestore, "affiliates");
    const snapshot = await getCountFromServer(coll);
    var affNo = snapshot.data().count + 4;


    const aff = {
        id: affiliate.id,
        name: affiliate.name,
        phoneNumber: affiliate.phoneNumber,
        createdDate: affiliate.createdDate,
        email: affiliate.email,
        affiliateNo: affNo
    }

    const key = affiliate.id.substring(-13);
    setCookie(COOKIE_AFFILIATE_NUMBER, encrypt(affNo.toString(), key), {
        days: 1,
        SameSite: 'Strict',
        Secure: true,
    });

    const q = query(AFF_DB_REF, where("phoneNumber", "==", aff.phoneNumber));
    const snapshotF = await getCountFromServer(q);
    if (snapshotF.data().count > 0) {
        return null;
    } else {
        await addDoc(AFF_DB_REF, aff);


        return affNo;
    }





}

export const checkAffiliate = async (affNo: number) => {
    // Create a query against the collection.
    const q = query(collection(firestore, "affiliates"), where("affilateNo", "==", affNo));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {

        return true;
    } else {
        return false;
    }
}

export const addAffiliateSale = async (affiliate: IAffiliate) => {

    await addDoc(AFF_SALES_DB_REF, affiliate);


}

export const deleteDocument = async (collection: string, id: string) => {
    await deleteDoc(doc(firestore, collection, id));
}




