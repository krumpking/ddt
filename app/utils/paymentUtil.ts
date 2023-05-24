import { getCookie } from "react-use-cookie";
import { getPayments } from "../api/adminApi";
import { COOKIE_ID } from "../constants/constants";
import DateMethods from "./date";
import { decrypt } from "./crypto";



export default class Payment {


    static async checkPaymentStatus(): Promise<boolean> {

        const v = await getPayments(getCookie(COOKIE_ID));

        var id = decrypt(getCookie(COOKIE_ID), COOKIE_ID);
        if (v !== null) {

            v.data.forEach(element => {


                const fromDb = element.data().userId;
                if (fromDb !== "") {

                    const idFromDB = decrypt(fromDb, COOKIE_ID);
                    if (idFromDB === id) {
                        const diff = DateMethods.diffDatesDays(element.data().date, new Date().toString());
                        if (diff > 31) {
                            return false;
                        } else {
                            return true;
                        }

                    }

                }



            });



            return false;


        } else {
            return false;
        }




    }
}