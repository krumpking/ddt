import { addDoc, collection, doc, getCountFromServer, getDoc, getDocs, query, updateDoc, where } from "firebase/firestore";
import { firestore } from "../../firebase/clientApp";
import { IAttendee, IBookingEvent } from "../types/bookingsTypes";
import { getCookie } from "react-use-cookie";
import { ADMIN_ID, COOKIE_ID } from "../constants/constants";
import { decrypt } from "../utils/crypto";




export const addBookingEvent = async (bookingEvent: IBookingEvent) => {


    // Create a query against the collection.
    const BOOKINS_DB_REF = collection(firestore, `booking_event`);


    return await addDoc(BOOKINS_DB_REF, bookingEvent);



}


export const getMyEvents = async () => {


    var infoFromCookie = "";
    if (getCookie(ADMIN_ID) == "") {
        infoFromCookie = getCookie(COOKIE_ID);
    } else {
        infoFromCookie = getCookie(ADMIN_ID);
    }
    const BOOKINS_DB_REF = collection(firestore, `booking_event`);
    let id = decrypt(infoFromCookie, COOKIE_ID);
    const q = query(BOOKINS_DB_REF, where("adminId", "==", id));
    const snapshot = await getCountFromServer(q);
    if (snapshot.data().count > 0) {
        var results: any = [];
        const querySnapshot = await getDocs(q);

        return {
            data: querySnapshot,
            count: results.length
        }

    } else {
        return null;

    }



}


export const getOneBookingEvent = async (id: string) => {
    // Create a query against the collection.
    const docRef = doc(firestore, "booking_event", id);
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


export const addBookingToEvent = async (id: string, attendes: IAttendee[]) => {

    return await updateDoc(doc(firestore, "booking_event", id), {
        bookings: attendes
    });

}