import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Random from "../utils/random";
import { getCookie } from "react-use-cookie";
import { COOKIE_ID, COOKIE_PHONE } from "../constants/constants";
import { addPayment } from "../api/adminApi";
import { decrypt } from "../utils/crypto";

const PaypalCheckoutButton = (props: { product: any; }) => {
    const { product } = props;

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState<any>();
    const [iorder, setIorder] = useState<any>()
    const [refCode, setRefCode] = useState("");

    const handleApprove = (order: any) => {
        // Call backend function to fulfill order

        if (order.status == 'COMPLETED') {
            // Display success message, modal or redirect user to success page
            alert("Thank you for your purchase!");
            toast.success('Payment received successfully');
            var id = "";
            if (getCookie(COOKIE_ID) !== "") {
                id = decrypt(getCookie(COOKIE_ID), COOKIE_ID);

            }
            const key = id.substring(-13);
            const payment = {
                id: order.id,
                userId: getCookie(COOKIE_ID),
                phoneNumber: decrypt(getCookie(COOKIE_PHONE), key),
                date: new Date().toString(),
                amount: product.price,
                refCode: refCode
            }
            console.log(payment);

            addPayment(id, payment).then((v) => {
                toast.success('Promo successfully added');
            }).catch((e) => {
                toast.error('There was an error adding your payment, please try again');

            });
        } else {

        }

        // if response is success

        // Refresh user's account or subscription status

        // if response is error
        // setError("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
    };



    if (error) {
        // Display error message, modal or redirect user to error page
        toast.error(error);
        toast.error('Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at billing@dacollectree.com for assistance.');
    }

    return (
        <>
            <PayPalButtons
                style={{
                    color: "gold",
                    layout: "horizontal",
                    height: 55,
                    tagline: false,
                    shape: "pill",
                    label: "pay",

                }}
                onClick={(data, actions) => {
                    // Validate on button click, client or server side

                    return actions.resolve();

                }}
                createOrder={(data, actions) => {
                    return actions.order.create({
                        purchase_units: [
                            {
                                description: product.description,
                                amount: {
                                    value: product.price
                                }
                            }
                        ]
                    });
                }}
                onApprove={async (data, actions) => {

                    if (typeof actions.order !== 'undefined') {
                        const order = await actions.order.capture();
                        console.log("order", order);


                        handleApprove(order);
                    }

                }}
                onCancel={() => {
                    // Display cancel message, modal or redirect user to cancel page or back to cart
                    toast.warn('Payment was Cancelled');
                    //TODO Capture abandoned cart
                }}
                onError={(err) => {
                    setError(err);
                    console.error("PayPal Checkout onError", err);
                    toast.error('Payment check out error, please try again');
                }}
            />
            <ToastContainer
                position="top-right"
                autoClose={5000} />
        </>
    );
};

export default PaypalCheckoutButton;