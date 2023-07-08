import { StyledP } from "../styles/styled/Styled_Text";
import { StyledToast } from "../styles/styled/Styled_Toast";
import { RiCloseFill } from "react-icons/ri";

export default function Toast({ children, type, setShowToast, setError }) {

	  const handleClose = () => {
			if (setShowToast) {
				setShowToast(null);
			}
			if (setError) {
				setError(null);
			}
		};
	
	return (
		<StyledToast type={type}>
			<RiCloseFill onClick={handleClose}/>
			<StyledP>{children}</StyledP>
		</StyledToast>
	);
}


//pass down as prop the setShowToast and give the svg an onClick function to set it false