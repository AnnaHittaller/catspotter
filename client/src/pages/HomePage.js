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

export default function HomePage() {
	const [showToast, setShowToast] = useState(false);
	const navigate = useNavigate();
	const { state } = useContext(AppContext);

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

	const redirectToUpload = () => {
		navigate("/upload");
		// logic for checking authorization and if not logged in, set showtoast to true
	};

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
						Help lost cats get safely back home! Spotted a cat? Load its data up
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
						Seen a cat while on your way to the workplace, running errands or
						going to school? Or an unfamiliar cat started to turn up in your
						garden?{" "}
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
						Don’t just worry about whether it’s an outside cat or actually lost:
						load it up to the database and you already made it’s chances to get
						home higher.
					</p>

					<img
						src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899559/catspotter-assets/yellow_arrow_v7eq7h.png"
						alt=""
						aria-hidden="true"
					/>

					<StyledH2Underline page="home">2. Upload it</StyledH2Underline>
				</StyledDivBorder>
				<StyledDivBorder page="home">
					<p>
						If the data of a lost cat and a spotted cat match, both the spotter
						and the owner gets notified, so they can check the detailed
						infosheet, location and photos.
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
