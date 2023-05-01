import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Random from "../utils/random";
import Crypto from "../utils/crypto";
import { getCookie } from "react-use-cookie";
import { COOKIE_ID, COOKIE_PHONE } from "../constants/constants";
import { addPayment } from "../api/adminApi";

const PaypalCheckoutButton = (props: { product: any; }) => {
    const { product } = props;

    const [paidFor, setPaidFor] = useState(false);
    const [error, setError] = useState<any>();

    const handleApprove = (orderId: any) => {
        // Call backend function to fulfill order

        // if response is success
        setPaidFor(true);
        // Refresh user's account or subscription status

        // if response is error
        // setError("Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at support@designcode.io for assistance.");
    };

    if (paidFor) {
        // Display success message, modal or redirect user to success page
        alert("Thank you for your purchase!");
        toast.success('Payment received successfully');
        var id = "";
        if (getCookie(COOKIE_ID) !== "") {
            id = Crypto.decrypt(getCookie(COOKIE_ID), COOKIE_ID);

        }
        const key = id.substring(-13);
        const payment = {
            id: Random.randomString(13, "abcdefghijkhlmnopqrstuvwxz123456789"),
            userId: getCookie(COOKIE_ID),
            phoneNumber: Crypto.decrypt(getCookie(COOKIE_PHONE), COOKIE_ID),
            date: new Date().toString(),
            amount: product.amount
        }

        addPayment(id, payment).then((v) => {
            toast.success('Promo successfully added');
        }).catch((e) => {
            toast.error('There was an error adding your payment, please try again');

        });

    }

    if (error) {
        // Display error message, modal or redirect user to error page
        toast.error(error);
        toast.error('Your payment was processed successfully. However, we are unable to fulfill your purchase. Please contact us at billing@dacollectree.com for assistance.');
    }

    return (
        <>
            <PayPalButtons
                style={{
                    color: "silver",
                    layout: "horizontal",
                    height: 48,
                    tagline: false,
                    shape: "pill"
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

                        handleApprove(data.orderID);
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