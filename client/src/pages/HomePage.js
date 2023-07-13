import {
	StyledFeatureIconDiv,
	StyledHero,
	StyledHeroData,
} from "../styles/styled/Styled_HomePage";
import { StyledDivSimple, StyledDivBorder } from "../styles/styled/Styled_Div";
import { StyledSection } from "../styles/styled/Styled_Section";
import { StyledPage } from "../styles/styled/Styled_Page";
import { StyledH2, StyledH2Underline } from "../styles/styled/Styled_Title";
import logo_dark from "../assets/logos/catspotter_logo_dark.png";
import {
	StyledButton,
	StyledPrimaryButton,
} from "../styles/styled/Styled_Button";
import arrow from "../assets/appImages/yellow_arrow.png";
import { v } from "../styles/Variables";
import { IoMapOutline, IoBookmarkOutline } from "react-icons/io5";
import {
	LuEdit,
	LuBellRing,
	LuFilter,
	LuBookmark,
	LuMap,
} from "react-icons/lu";

import { useContext, useEffect, useState } from "react";
import Toast from "../components/Toast";
import { Link, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import axios from "axios";

export default function HomePage() {
	const [showToast, setShowToast] = useState(false);
	const navigate = useNavigate();
	const { state, dispatch } = useContext(AppContext);
	const [cats, setCats] = useState([]);

	useEffect(() => {
		if (showToast) {
			const timer = setTimeout(() => {
				setShowToast(false);
			}, 6000);

			return () => {
				clearTimeout(timer);
			};
		}
	}, [showToast]);

		useEffect(() => {
			const fetchCats = async () => {
				try {
					const response = await axios.get("/cats/list");
					console.log("home page:", response.data);

					if (response.data.success) {
						dispatch({
							type: "LIST_CATS",
							payload: response.data.cats,
						});
					}

					setCats(response.data.cats); // map them directly from state contextt? then no need for passing them down as prop - TEST THIS
				} catch (error) {
					console.log(error.message);
				}
			};
			fetchCats();
		}, []);

	//const redirectToUpload = () => {
	//	navigate("/upload");
		// logic for checking authorization and if not logged in, set showtoast to true
	//};

	console.log("state:", state)
	
	return (
		<StyledPage>
			<StyledHero>
				<StyledHeroData>
					<img
						src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899573/catspotter-assets/catspotter_logo_dark_mur6nz.png"
						alt="catspotter logo"
					/>
					<p>
						Let's create a world together where no lost cat goes unnoticed. Help lost cats get safely back home! Spotted a cat? Load its data up
						and make it easier for the worrying owner to find it.
					</p>
					<p>
						Lost your cat? Upload its data and inform others in the area to be
						on the lookout for it.
					</p>
					<p>Keeping an eye open can save a life!</p>
					<div>
						<StyledPrimaryButton>
							{state.user._id ? (
								<Link to="/upload">Register a cat</Link>
							) : (
								<Link to="/login">Login to register a cat</Link>
							)}
						</StyledPrimaryButton>
					</div>
					{showToast && (
						<Toast>You have to be logged in to be able to upload cats.</Toast>
					)}
				</StyledHeroData>
			</StyledHero>
			<StyledSection>
				<StyledDivBorder page="home">
					<p>
						Keep your eyes open while going about your daily routine - on your way to work, running errands, or going to school. You may have noticed any unfamiliar cat turning up in your street garden - maybe it's missing from just a few streets away.{" "}
					</p>
					<img
						src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899559/catspotter-assets/yellow_arrow_v7eq7h.png"
						alt=""
						aria-hidden="true"
					/>
					<StyledH2Underline page="home">1. Spot it</StyledH2Underline>
				</StyledDivBorder>
				<StyledDivBorder page="home">
					<p>
						Don't just wonder if it's a lost cat or an outdoor explorer. Take action! Load its data into the catspotter database, and you have already increased its chances of finding its way home.
					</p>

					<img
						src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899559/catspotter-assets/yellow_arrow_v7eq7h.png"
						alt=""
						aria-hidden="true"
					/>

					<StyledH2Underline page="home">2. Register it</StyledH2Underline>
				</StyledDivBorder>
				<StyledDivBorder page="home">
					<p>
						When a lost cat's data matches a sighting, both the spotter and the owner receive notifications. Tthey can check the detailed infosheets, locations and photos. Be a voice for lost cats in your community and help them reunite with their worrying families!
					</p>
					<img
						src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899559/catspotter-assets/yellow_arrow_v7eq7h.png"
						alt=""
						aria-hidden="true"
					/>
					<span>
						<StyledH2Underline page="home">3. Help it </StyledH2Underline>

						<StyledH2Underline page="home"> get home</StyledH2Underline>
					</span>
				</StyledDivBorder>
			</StyledSection>
			<StyledSection bgColor={v.columbiaBlue} align="center" page="home">
				<StyledH2>Features</StyledH2>
				<div>
					<StyledDivSimple>
						<StyledFeatureIconDiv>
							<div>
								<LuBellRing />
							</div>
							<p>Notifications upon matching lost and spotted data</p>
						</StyledFeatureIconDiv>
						<StyledFeatureIconDiv>
							<div>
								<LuBookmark />
							</div>
							<p>Bookmark individual spottings</p>
						</StyledFeatureIconDiv>
						<StyledFeatureIconDiv>
							<div>
								<LuMap />
							</div>
							<p>Specify your area and get automatic notifications </p>
						</StyledFeatureIconDiv>
						<StyledFeatureIconDiv>
							<div>
								<LuFilter />
							</div>
							<p>
								Filtering data according to dates, locations or features of the
								cat
							</p>
						</StyledFeatureIconDiv>
						<StyledFeatureIconDiv>
							<div>
								<LuEdit />
							</div>
							<p>
								Adding notes to other users’ spottings and in-app messaging.
							</p>
						</StyledFeatureIconDiv>
					</StyledDivSimple>
				</div>
			</StyledSection>
		</StyledPage>
	);
}
