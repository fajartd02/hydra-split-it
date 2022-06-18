import { useSelector } from "react-redux";

export default function Home() {
	const { name } = useSelector((state) => state.test);
	return <>asd</>;
}
