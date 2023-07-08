import { v } from "../styles/Variables";

export const customStyles = {
	control: (base, state) => ({
		...base,
		background: "transparent",
		borderRadius: "10px",
		borderWidth: "2px",
		minWidth: "150px",
		color: v.charcoal,
		borderColor: state.hasValue ? v.sunGlow : v.columbiaBlue,
		// Removes weird border around container
		boxShadow: state.isFocused ? null : null,
		"&:hover": {
			// Overwrites the different states of border
			borderColor: v.sunGlow,
		},
	}),
	multiValue: (base, state) => ({
		...base,
		backgroundColor: v.columbiaBlue,
		fontSize: "1rem",
	}),
	singleValue: (base, state) => ({
		...base,
		fontWeight: 600,
		color: v.charcoal,
	}),
	option: (base, state) => ({
		...base,
		backgroundColor: state.isFocused ? v.columbiaBlue : "transparent",
		color: v.charcoal,
	}),
	placeholder: (base, state) => ({
		...base,
		color: v.cadetGrey,
	}),
	menu: (base, state) => ({
		...base,
		zIndex: 2000,
	}),
};

export const customStylesForUploadForm = {
	control: (base, state) => ({
		...base,
		background: "transparent",
		borderRadius: "10px",
		borderWidth: "2px",
		minWidth: "220px",
		width: "100%",
		padding: ".25rem .5rem",
		color: v.charcoal,
		borderColor: state.hasValue ? v.sunGlow : v.columbiaBlue,
		// Removes weird border around container
		boxShadow: state.isFocused ? null : null,
		"&:hover": {
			// Overwrites the different states of border
			borderColor: v.sunGlow,
		},
	}),
	multiValue: (base, state) => ({
		...base,
		backgroundColor: v.columbiaBlue,
		fontSize: "1rem",
		zIndex: 10,
	}),
	singleValue: (base, state) => ({
		...base,
		fontWeight: 600,
		color: v.charcoal,
	}),
	option: (base, state) => ({
		...base,
		backgroundColor: state.isFocused ? v.columbiaBlue : "transparent",
		color: v.charcoal,
	}),
	placeholder: (base, state) => ({
		...base,
		color: v.cadetGrey,
	}),
	menu: (base, state) => ({
		...base,
		zIndex: 2000,
	}),
};
