import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import store from "../store/store";
import { useEffect } from "react";
import { Provider } from "react-redux";
import Layout from "../components/templates/layout/layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		import("bootstrap/dist/js/bootstrap");
	}, []);

	return (
		<>
			<Head>
				<title>Split it!</title>
				<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1" />
			</Head>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</>
	);
}

export default MyApp;
