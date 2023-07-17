import Select from "react-select";
// for MapPage:

const [selectedStatus, setSelectedStatus] = useState(null);
const [selectedPattern, setSelectedPattern] = useState(null);
const [selectedColor, setSelectedColor] = useState(null);
const [selectedDate, setSelectedDate] = useState(null);
const [selectedCoatLength, setSelectedCoatLength] = useState(null);

//put this into another file

const handleSelectChange = (selectedOption, name) => {
	switch (name) {
		case "status":
			setSelectedStatus(selectedOption);
			break;
		case "pattern":
			setSelectedPattern(selectedOption);
			break;
		case "color":
			setSelectedColor(selectedOption);
			break;
		case "date":
			setSelectedDate(selectedOption);
			break;
		case "coatLength":
			setSelectedCoatLength(selectedOption);
			break;
		default:
			break;
	}
};

// add respective names to the select elements:
const justToAvoidErrors = () => {
	return (
		<>
			<Select
				options={optionsCat}
				onChange={(selectedOption) =>
					handleSelectChange(selectedOption, "status")
				}
				value={selectedStatus}
				placeholder="Select status"
				name="status"
			/>

			<Select
				options={optionsPattern}
				onChange={(selectedOption) =>
					handleSelectChange(selectedOption, "pattern")
				}
				value={selectedPattern}
				placeholder="Select pattern"
				name="pattern"
			/>

			<Select
				options={optionsColor}
				onChange={(selectedOption) =>
					handleSelectChange(selectedOption, "color")
				}
				value={selectedColor}
				placeholder="Select color"
				name="color"
			/>

			<Select
				options={optionsDate}
				onChange={(selectedOption) =>
					handleSelectChange(selectedOption, "date")
				}
				value={selectedDate}
				placeholder="Select date"
				name="date"
			/>

			<Select
				options={optionsCoatLength}
				onChange={(selectedOption) =>
					handleSelectChange(selectedOption, "coatLength")
				}
				value={selectedCoatLength}
				placeholder="Select coat length"
				name="coatLength"
			/>
		</>
	);
};


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

