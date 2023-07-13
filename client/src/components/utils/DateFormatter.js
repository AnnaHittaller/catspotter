const dateFormatter = (dateStr) => {
	const dateTime = new Date(dateStr);

	// Extract the date component in the desired format
	const formattedDate = dateTime
		.toLocaleDateString("en-US", {
			year: "numeric",
			month: "2-digit",
			day: "2-digit",
		})
		.replace(/\//g, ". ");

	// Extract the time component in the desired format
	const formattedTime = dateTime.toLocaleTimeString("en-US", {
		hour: "2-digit",
		minute: "2-digit",
	});

	return {
		formattedDate,
		formattedTime,
	};
};

export default dateFormatter;
