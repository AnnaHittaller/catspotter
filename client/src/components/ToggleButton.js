import { useState } from "react";
import { StyledToggleButton } from "../styles/styled/Styled_ToggleButton";

export default function ToggleButton({ value, onChange }) {
	const [checked, setChecked] = useState(false);
	console.log(checked, value);

	const handleChange = (e) => {
		    const newValue = e.target.checked;
			setChecked(newValue);
			onChange(newValue);
	};

	return (
		<StyledToggleButton>
			<label>
				<input
					type="checkbox"
					onChange={handleChange}
					checked={checked}
					value={value}
				/>
				<div>
					<p>on</p>
				</div>
			</label>
		</StyledToggleButton>
	);
}
