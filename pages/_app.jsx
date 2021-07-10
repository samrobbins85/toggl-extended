import "../styles/index.css";
import Head from "next/head";
import { SWRConfig } from "swr";

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<link
					rel="preload"
					href="/fonts/Inter.var.woff2"
					as="font"
					type="font/woff2"
					crossOrigin="anonymous"
				/>
			</Head>
			<SWRConfig
				value={{ shouldRetryOnError: false, revalidateOnFocus: false }}
			>
				<Component {...pageProps} />
			</SWRConfig>
		</>
	);
}

export default MyApp;
