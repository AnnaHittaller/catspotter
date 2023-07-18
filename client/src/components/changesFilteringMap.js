
//put this modified fetchcats into a useEffect:

const fetchCats = async () => {
	try {
		const response = await axios.get("/cats/list", {
			params: {
				status: selectedStatus?.value,
				pattern: selectedPattern?.value,
				color: selectedColor?.value,
				date: selectedDate?.value,
				coatLength: selectedCoatLength?.value,
			},
		});

		if (response.data.success) { 
			dispatch({
				type: "LIST_CATS", // Or create another one LIST_FILTERED CATS and save them into the context separately
				payload: response.data.cats,
			});
		}

		setCats(response.data.cats);
	} catch (error) {
		console.log(error.message);
	}
};

// modify mongoose backend route

export const handleListFilteredCats = async (req, res) => {
	try {
		const { status, pattern, color, date, coatLength } = req.query;

		const query = {};

		if (status) {
			query.status = status;
		}

		if (pattern) {
			query.pattern = pattern;
		}

		if (Array.isArray(color)) {
			query.color = { $all: color, $size: color.length };
		}

		if (date) {
            const startDate = new Date();

            if(date === "day") {
                startDate.setDate(startDate.getDate() - 1);
            }
             if(date === "week") {
                startDate.setDate(startDate.getDate() - 7);
            }
             if(date === "month") {
                startDate.setDate(startDate.getDate() - 30);
            }
             if(date === "halfYear") {
                startDate.setMonth(startDate.getMonth() - 6);
            }
             if(date === "year") {
                startDate.setDate(startDate.getMonth() - 12);
            }
		
			query.date = { $gte: startDate };

            if(date === "all") {
                delete query.date;
            }
		}

		if (coatLength) {
			query.coatLength = coatLength;
		}

		const cats = await Cat.find(query).select("-__v").sort({ date: -1 });

		res.send({
			success: true,
			cats,
		});
	} catch (error) {
		console.log("error listing cats:", error.message);
		res.send({
			success: false,
			message: error.message,
		});
	}
};

