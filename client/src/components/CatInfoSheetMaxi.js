import { BsBookmark, BsBookmarkFill } from "react-icons/bs";
import {
	StyledCatInfoSheetMaxi,
} from "../styles/styled/Styled_CatInfoSheet";
import {
	StyledDivBorder,
	StyledDivLabel,
	StyledDivSimple,
	StyledDivSimpleRounded,
} from "../styles/styled/Styled_Div";
import {
	StyledButton,
	StyledPrimaryButton,
} from "../styles/styled/Styled_Button";
import { StyledP, StyledPBig, StyledPBold } from "../styles/styled/Styled_Text";
import { StyledH3 } from "../styles/styled/Styled_Title";
import { v } from "../styles/Variables";
//import { CiMenuKebab } from "react-icons/ci";
import MapForOneCat from "./MapForOneCat";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import dateFormatter from "../utils/DateFormatter";
import { cloudinaryRoot } from "../utils/ImageUrlRoot";
import axios from "axios";
import { AppContext } from "../context/AppContext";
import { getCatSvgComponent } from "../utils/CatSvgHelper";
import MapCatInfoSheet from "./leaflet/MapCatInfoSheet";

export default function CatInfoSheetMaxi({ id }) {
	const { state, dispatch } = useContext(AppContext);
	console.log(state);
	const [cat, setCat] = useState("");
	console.log(cat);
	//const [bookmarked, setBookmarked] = useState(false);
	const navigate = useNavigate()

	const { formattedDate } = dateFormatter(cat?.date);
	const isBookmarked = state.user?.bookmarks?.includes(id);

	const handleBookmark = async () => {
		try {
			const response = await axios.post('/users/bookmark', {cat: id})
			console.log("response bookmark:", response)

			if(response.data.success) {
				dispatch({
					type: "BOOKMARK",
					payload: response.data.user
				})
			}

		} catch (error) {
			console.log(error.message)
		}
	};

	useEffect(() => {
		const fetchCat = async () => {
			try {
				const response = await axios.get(`/cats/listone/${id}`);
				console.log("response", response);
				if (response.data.success) {
					setCat(response.data.cat);
				}
			} catch (error) {
				console.log(error.message);
			}
		};
		fetchCat();
	}, id);

	const handleDeleteCat = async () => {
		const response = await axios.delete(`/cats/delete/${id}`)
		console.log('response:', response)

		if(!response.data.success && response.data.errorId === "jwt expired") {
			navigate("/login")
		}

		if(response.data.success) {
			dispatch({
				type: "DELETE_CAT",
				payload: id,
			})

			navigate("/")
		}
	}

	//put a spinner here
	if (!cat) {
		return <div>Loading...</div>; 
	}

	const catSVG = getCatSvgComponent(
		cat.pattern,
		cat.color[0],
		cat.color[1],
		cat.color[2]
	);


	return (
		<StyledCatInfoSheetMaxi>
			<StyledDivBorder flexDirection="column">
				{isBookmarked ? <BsBookmarkFill /> : <BsBookmark />}
				{cat?.status === "Lost" && (
					<StyledPBig>Keep an eye open for me!</StyledPBig>
				)}

				<StyledDivLabel>
					<label>{cat?.status}</label>
					<StyledH3>
						{" "}
						{cat?.pattern === "tortoiseshell" || cat?.pattern === "calico"
							? `${cat?.pattern.charAt(0).toUpperCase()}${cat?.pattern.slice(
									1
							  )}`
							: cat?.color
									?.map((color, index) => {
										if (index === 0) {
											return (
												color.charAt(0).toUpperCase() +
												color.slice(1).toLowerCase()
											);
										}
										return color.toLowerCase();
									})
									.join(" ")}
						{" cat in "}
						{cat?.address.city}
					</StyledH3>
				</StyledDivLabel>

				<StyledDivSimple padding="0">
					<StyledDivSimple padding="0" flexDirection="column">
						{cat?.image.length > 0 ? (
							<img
								src={cloudinaryRoot + cat?.image}
								alt="uploaded photo of the cat"
							/>
						) : (
							<StyledDivSimple className="cat-svg">{catSVG}</StyledDivSimple>
						)}

						<MapCatInfoSheet height="300px" cat={cat} />
					</StyledDivSimple>
					<StyledDivSimple padding="0" flexDirection="column">
						<StyledDivSimpleRounded
							bgColor={v.columbiaBlue}
							justify="center"
							padding=".5rem">
							<StyledP>
								{cat?.address?.road + ", "}
								{cat?.address?.suburb && cat?.address.suburb + ", "}
								{cat?.address?.city + ", "}
								{cat?.address?.postcode}
							</StyledP>
						</StyledDivSimpleRounded>
						<StyledDivSimpleRounded
							bgColor={v.columbiaBlue}
							justify="center"
							padding=".5rem">
							<StyledP>
								On {formattedDate}, at {cat.time}
							</StyledP>
						</StyledDivSimpleRounded>
						<StyledDivSimpleRounded
							bgColor={v.columbiaBlue}
							justify="center"
							padding=".5rem">
							<StyledP>
								{cat?.coatLength?.charAt(0)?.toUpperCase() +
									cat?.coatLength?.slice(1)}{" "}
								{cat?.pattern} cat: {cat?.color?.join(", ")}
							</StyledP>
						</StyledDivSimpleRounded>
						{cat?.notes && (
							<StyledDivSimpleRounded
								bgColor={v.columbiaBlue}
								justify="center"
								padding=".5rem">
								<StyledP>{cat.notes}</StyledP>
							</StyledDivSimpleRounded>
						)}
						{cat?.chipNr && (
							<StyledDivSimpleRounded
								bgColor={v.columbiaBlue}
								justify="center"
								padding=".5rem">
								<StyledPBold>Chip number:</StyledPBold>
								<StyledP>{cat.chipNr}</StyledP>
							</StyledDivSimpleRounded>
						)}
						{cat.reward && (
							<StyledDivSimpleRounded
								bgColor={v.columbiaBlue}
								justify="center"
								padding=".5rem"
								flexDirection="column"
								gap=".25rem">
								<StyledPBold>Finder's reward:</StyledPBold>
								<StyledP>{cat.reward} €</StyledP>
							</StyledDivSimpleRounded>
						)}
						{cat?.contact && (
							<StyledDivSimpleRounded
								bgColor={v.columbiaBlue}
								justify="center"
								padding=".5rem"
								flexDirection="column"
								gap=".25rem">
								<StyledPBold>Contact for the owner:</StyledPBold>
								<StyledP>
									<Link to="tel:">{cat?.contact}</Link>
								</StyledP>
							</StyledDivSimpleRounded>
						)}
					</StyledDivSimple>
				</StyledDivSimple>

				<StyledDivSimple padding="2rem 0 0 0" justify="center">
					{state.user._id === cat.uploader ? (
						<>
							<StyledButton onClick={handleDeleteCat}>Delete</StyledButton>
							<StyledButton>
								<Link to={`/updatecat/${id}`}>Edit data</Link>
							</StyledButton>
						</>
					) : null}
					{/* <StyledPrimaryButton onClick={() => setBookmarked((prev) => !prev)}> */}
						<StyledPrimaryButton onClick={handleBookmark}>
						{bookmarked ? "Delete bookmark" : "Add bookmark"}
					</StyledPrimaryButton>
				</StyledDivSimple>
			</StyledDivBorder>
		</StyledCatInfoSheetMaxi>
	);
}
