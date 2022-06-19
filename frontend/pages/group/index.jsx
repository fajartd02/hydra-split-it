import Group from "../../components/templates/group";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect } from "react";

const Index = () => {
	const { loggedIn } = useSelector((state) => state.user);
	const router = useRouter();

	useEffect(() => {
		if (!loggedIn) router.push("/");
	}, []);

	return <>{loggedIn && <Group />}</>;
};

export default Index;
