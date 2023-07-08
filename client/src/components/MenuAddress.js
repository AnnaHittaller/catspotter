import { StyledMenuAddress } from "../styles/styled/Styled_Menu";
import { StyledP, StyledPBold } from "../styles/styled/Styled_Text";

export default function MenuAddress({ r }) {
	const { address } = r.properties;

	const formatAddressLine1 = () => {
		if (address.house_number && address.road) {
			return `${address.house_number} ${address.road}`;
		} else if (address.road) {
			return `${address.road}`;
		} else if (!address.road) {
			return `${r.center.lat}, ${r.center.lng}`;
		} else {
			return "";
		}
	};

	const formatAddressLine2 = () => {
		const components = [];
		if (address.city) {
			components.push(address.city);
		}
		if (address.suburb) {
			components.push(address.suburb);
		}
		if (address.postcode) {
			components.push(address.postcode);
		}
		return components.join(", ");
	};

	return (
		<StyledMenuAddress>
			<div>
				<StyledPBold>{formatAddressLine1()}</StyledPBold>
			</div>
			<div></div>
			<div>
				<StyledP>{formatAddressLine2()}</StyledP>
			</div>
		</StyledMenuAddress>
	);
}
