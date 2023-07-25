import { getDaysFromSelectedDate } from "./GetDaysFromSelectedDate";

export const filterCats = (
	state,
	selectedStatus,
	selectedPattern,
	selectedColor,
	selectedCoatLength,
	selectedDate,
	chipNr,
	notesText
) => {
	let filteredCats = state.cats;

	if (selectedStatus) {
		filteredCats = filteredCats.filter(
			(cat) => cat.status === selectedStatus.value
		);
	}

	if (selectedPattern) {
		filteredCats = filteredCats.filter(
			(cat) => cat.pattern === selectedPattern.value
		);
	}

	if (selectedColor) {
		filteredCats = filteredCats.filter((cat) => {
			const catColors = cat.color;
			const selectedColorValues = selectedColor.map((color) => color.value);
			return selectedColorValues.every((color) => catColors.includes(color));
		});
	}

	if (selectedCoatLength) {
		filteredCats = filteredCats.filter(
			(cat) => cat.coatLength === selectedCoatLength.value
		);
	}

	if (selectedDate) {
		const today = new Date();
		const selectedDateValue = selectedDate.value;
		const selectedDays = getDaysFromSelectedDate(selectedDateValue);
		const minDate = new Date(
			today.getTime() - selectedDays * 24 * 60 * 60 * 1000
		).toISOString();

		filteredCats = filteredCats.filter((cat) => {
			const catDate = new Date(cat.date);
			return cat.date >= minDate;
		});
	}

	if (chipNr) {
		filteredCats = filteredCats.filter(
			(cat) => cat.chipNr.includes(chipNr)
		);
	}

	if (notesText) {
		filteredCats = filteredCats.filter((cat) => cat.notes.toLowerCase().split(" ").includes(notesText));
	}

	return filteredCats;
};
