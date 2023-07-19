export const getDaysFromSelectedDate = (selectedDateValue) => {
	switch (selectedDateValue) {
		case "day":
			return 1;
		case "week":
			return 7;
		case "month":
			return 30;
		case "halfYear":
			return 180;
		case "year":
			return 365;
		case "all":
			return 5000;
		default:
			return 0;
	}
};
