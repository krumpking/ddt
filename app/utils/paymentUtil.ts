import { getCookie } from "react-use-cookie";
import { ADMIN_ID, COOKIE_ID } from "../constants/constants";
import DateMethods from "./date";
import { decrypt } from "./crypto";
import { print } from "./console";
import { getPayments } from "../api/paymentApi";



export default class Payment {


    static async checkPaymentStatus(): Promise<boolean> {

        var result = false;


        var infoFromCookie = "";
        if (getCookie(ADMIN_ID) == "") {
            infoFromCookie = getCookie(COOKIE_ID);
        } else {
            infoFromCookie = getCookie(ADMIN_ID);
        }
        if (typeof infoFromCookie !== 'undefined') {


            if (infoFromCookie.length > 0) {

                const v = await getPayments(infoFromCookie);

                var id = decrypt(getCookie(COOKIE_ID), COOKIE_ID);

                if (v !== null) {

                    v.data.forEach(element => {


                        const idFromDB = element.data().userId;
                        if (idFromDB !== "") {


                            if (idFromDB === id) {
                                const diff = DateMethods.diffDatesDays(element.data().date, new Date().toString());

                                if (diff < 31) {

                                    result = true;
                                    return;
                                }

                            }

                        }



                    });






                }
            }


        }

        return result;






    }
}