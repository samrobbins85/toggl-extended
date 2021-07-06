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
				value={{
					fetcher: (resource) =>
						fetch(
							`https://api.track.toggl.com${resource}?user_agent=samrobbinsgb@gmail.com&workspace_id=3087200`,
							{
								headers: {
									Authorization: `Basic ${process.env.NEXT_PUBLIC_TOGGL_KEY}`,
								},
							}
						).then((res) => res.json()),
					revalidateOnFocus: false,
				}}
			>
				<Component {...pageProps} />
			</SWRConfig>
		</>
	);
}

export default MyApp;
