import Document, { Html, Head, Main, NextScript, DocumentContext } from 'next/document'
import Script from 'next/script'
import { NEXT_PUBLIC_GOOGLE_ANALYTICS } from '../app/constants/constants'

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx)
        return { ...initialProps }
    }

    render() {
        return (
            <Html>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Comfortaa:wght@700&display=swap" rel="stylesheet" />
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" />
                    <link href="https://fonts.googleapis.com/css2?family=Rubik+Gemstones&display=swap" rel="stylesheet" />
                    <link rel="shortcut icon" href={'./images/logo.png'} />
                    <title>Digital Data Tree</title>
                    <meta name="keywords" content={"Form builder, Paper to Digital, Data Bank, Bank Level Encryption,"} />
                    <meta name="description" content={"Go Paperless at a click, with a simple and effective way to collect and organise you business information"} />

                    {/* Global Site Tag (gtag.js) - Google Analytics */}
                    <script
                        async
                        src={`https://www.googletagmanager.com/gtag/js?id=${NEXT_PUBLIC_GOOGLE_ANALYTICS}`}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                window.dataLayer = window.dataLayer || [];
                                function gtag(){dataLayer.push(arguments);}
                                gtag('js', new Date());
                                gtag('config', '${NEXT_PUBLIC_GOOGLE_ANALYTICS}', {
                                page_path: window.location.pathname,
                                });
                            `,
                        }}
                    />
                    <script
                        dangerouslySetInnerHTML={{
                            __html: `
                                gtag('event', 'conversion', {
                                    'send_to': 'AW-11208371394/x56hCMz_v6gYEMLZyOAp',
                                    'event_callback': callback
                                });
                            `,
                        }}
                    />



                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        )
    }
}

export default MyDocument