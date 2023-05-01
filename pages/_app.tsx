
import type { AppProps } from 'next/app'
import '../styles/index.css'
import { Provider } from 'react-redux';
import { store } from '../app/store/store';
import { PayPalScriptProvider } from "@paypal/react-paypal-js";
import { PRODUCTION_CLIENT_ID } from '../app/constants/constants';

const initialOptions = {
  "client-id": PRODUCTION_CLIENT_ID,
  currency: "USD",
  intent: "capture",
  "data-client-token": "abc123xyz==",
};


function MyApp({ Component, pageProps }: AppProps) {
  return (
    <PayPalScriptProvider options={initialOptions}>
      <Provider store={store}>
        < Component {...pageProps} />
      </Provider>
    </PayPalScriptProvider>



  )

}

export default MyApp
