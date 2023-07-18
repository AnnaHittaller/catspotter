
// in component:
//const [loading, setLoading] = useState(true);
// and pass down these: <Spinner loading={loading} setLoading={setLoading}/>

import { v } from "../styles/Variables.js";
import FadeLoader from "react-spinners/MoonLoader";

export default function Spinner({ loading, setLoading }) {
	return (
	
		<FadeLoader
			color={v.cadetGrey}
			cssOverride={{ margin: "45vh auto" }}
			radius={5}
		/>
	);
}
