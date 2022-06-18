import "bootstrap/dist/css/bootstrap.css";
import "../styles/globals.css";
import store from "../store/store";
import { useEffect } from "react";
import { Provider } from "react-redux";
import Layout from "../components/templates/layout/layout";

function MyApp({ Component, pageProps }) {
	useEffect(() => {
		import("bootstrap/dist/js/bootstrap");
	}, []);

	return (
		<>
			<Provider store={store}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</Provider>
		</>
	);
}

export default MyApp;
