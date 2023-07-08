import { useContext, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
	BsBookmark,
	BsQuestionCircle,
	BsEnvelope,
	BsBookmarkFill,
	BsPerson,
	BsFillCaretLeftFill,
} from "react-icons/bs";
import { LuBell, LuCat } from "react-icons/lu";
import { IoSettingsOutline } from "react-icons/io5";
import { AiOutlineLogout, AiOutlineLogin, AiOutlineHome } from "react-icons/ai";
import { FiSearch, FiMapPin } from "react-icons/fi";
import logo_light from "../assets/logos/catspotter_logo_light.png";
import logo_small from "../assets/logos/catspotter_logo_small.png";
import default_profile from "../assets/appImages/default_profile_small.png";
import {
	StyledDivider,
	StyledLink,
	StyledLinkContainer,
	StyledLinkIcon,
	StyledLinkLabel,
	StyledLogo,
	StyledSidebar,
	StyledSidebarButton,
	StyledUserInfo,
} from "../styles/styled/Styled_Sidebar";
import { AuthContext } from "../context/AuthContext";
import { SidebarContext } from "../context/SidebarContext";
import { AppContext } from "../context/AppContext";
import axios from "axios";

export default function Sidebar() {
	const { state, dispatch } = useContext(AppContext);
	const { sidebaropen, setsidebaropen } = useContext(SidebarContext);
	const { pathname } = useLocation();
	const { isLoggedIn, logout } = useContext(AuthContext);
	const navigate = useNavigate();
	console.log(state);

	const handleLogout = async () => {
		const response = await axios.post("/users/logout");
		console.log("response:", response.data);

		dispatch({ type: "LOGOUT" });
		//navigate('/login')
	};

	return (
		<StyledSidebar isOpen={sidebaropen}>
			<StyledSidebarButton
				isOpen={sidebaropen}
				onClick={() => setsidebaropen((prev) => !prev)}>
				<BsFillCaretLeftFill />
			</StyledSidebarButton>
			<StyledLogo isOpen={sidebaropen}>
				<img
					src={sidebaropen ? logo_light : logo_small}
					alt="catspotter logo"
				/>
			</StyledLogo>
			<StyledUserInfo>
				<img src={default_profile} alt="user profile" />
				{sidebaropen && (
					<div>
						{state.user.username
							? `Hello, ${state.user.username}!`
							: "Hello, Guest!"}
					</div>
				)}
			</StyledUserInfo>
			<StyledDivider />

			<StyledLinkContainer isActive={pathname === "/"}>
				<StyledLink
					to="/"
					isActive={pathname === "/"}
					onClick={() => setsidebaropen(false)}>
					<StyledLinkIcon isActive={pathname === "/"}>
						<AiOutlineHome />
					</StyledLinkIcon>
					{sidebaropen && (
						<StyledLinkLabel isActive={pathname === "/"}>Home</StyledLinkLabel>
					)}
				</StyledLink>
			</StyledLinkContainer>

			<StyledLinkContainer isActive={pathname === "/map"}>
				<StyledLink
					to="/map"
					isActive={pathname === "/map"}
					onClick={() => setsidebaropen(false)}>
					<StyledLinkIcon isActive={pathname === "/map"}>
						<FiMapPin />
					</StyledLinkIcon>
					{sidebaropen && (
						<StyledLinkLabel isActive={pathname === "/map"}>
							Catspotting
						</StyledLinkLabel>
					)}
				</StyledLink>
			</StyledLinkContainer>

			{state.user.username && (
				<StyledLinkContainer isActive={pathname === "/upload"}>
					<StyledLink
						to="/upload"
						isActive={pathname === "/upload"}
						onClick={() => setsidebaropen(false)}>
						<StyledLinkIcon isActive={pathname === "/upload"}>
							<LuCat />
						</StyledLinkIcon>
						{sidebaropen && (
							<StyledLinkLabel isActive={pathname === "/upload"}>
								Register a cat
							</StyledLinkLabel>
						)}
					</StyledLink>
				</StyledLinkContainer>
			)}

			{state.user.username && (
				<StyledLinkContainer isActive={pathname === "/notifications"}>
					<StyledLink
						to="/notifications"
						isActive={pathname === "/notifications"}
						onClick={() => setsidebaropen(false)}>
						<StyledLinkIcon isActive={pathname === "/notifications"}>
							<LuBell />
						</StyledLinkIcon>
						{sidebaropen && (
							<StyledLinkLabel isActive={pathname === "/notifications"}>
								Notifications
							</StyledLinkLabel>
						)}
					</StyledLink>
				</StyledLinkContainer>
			)}

			{state.user.username && (
				<StyledLinkContainer isActive={pathname === "/bookmarks"}>
					<StyledLink
						to="/bookmarks"
						isActive={pathname === "/bookmarks"}
						onClick={() => setsidebaropen(false)}>
						<StyledLinkIcon isActive={pathname === "/bookmarks"}>
							<BsBookmark />
						</StyledLinkIcon>
						{sidebaropen && (
							<StyledLinkLabel isActive={pathname === "/bookmarks"}>
								Bookmarks
							</StyledLinkLabel>
						)}
					</StyledLink>
				</StyledLinkContainer>
			)}

			<StyledLinkContainer isActive={pathname === "/guides"}>
				<StyledLink
					to="/guides"
					isActive={pathname === "/guides"}
					onClick={() => setsidebaropen(false)}>
					<StyledLinkIcon isActive={pathname === "/guides"}>
						<BsQuestionCircle />
					</StyledLinkIcon>
					{sidebaropen && (
						<StyledLinkLabel isActive={pathname === "/guides"}>
							Guides
						</StyledLinkLabel>
					)}
				</StyledLink>
			</StyledLinkContainer>

			<StyledDivider />

			<StyledLinkContainer isActive={pathname === "/contact"}>
				<StyledLink
					to="/contact"
					isActive={pathname === "/contact"}
					onClick={() => setsidebaropen(false)}>
					<StyledLinkIcon isActive={pathname === "/contact"}>
						<BsEnvelope />
					</StyledLinkIcon>
					{sidebaropen && (
						<StyledLinkLabel isActive={pathname === "/contact"}>
							Contact
						</StyledLinkLabel>
					)}
				</StyledLink>
			</StyledLinkContainer>

			{state.user.username && (
				<StyledLinkContainer isActive={pathname === "/profile/:userId"}>
					<StyledLink
						to="/profile/:userId"
						isActive={pathname === "/profile/:userId"}
						onClick={() => setsidebaropen(false)}>
						<StyledLinkIcon isActive={pathname === "/profile/:userId"}>
							<BsPerson />
						</StyledLinkIcon>
						{sidebaropen && (
							<StyledLinkLabel isActive={pathname === "/profile/:userId"}>
								Profile
							</StyledLinkLabel>
						)}
					</StyledLink>
				</StyledLinkContainer>
			)}

			{state.user.username ? (
				<StyledLinkContainer onClick={() => setsidebaropen(false)}>
					<StyledLink to="/login" onClick={handleLogout}>
						<StyledLinkIcon>
							<AiOutlineLogout />
						</StyledLinkIcon>
						{sidebaropen && <StyledLinkLabel>Logout</StyledLinkLabel>}
					</StyledLink>
				</StyledLinkContainer>
			) : (
				<StyledLinkContainer isActive={pathname === "/login"}>
					<StyledLink
						to="/login"
						isActive={pathname === "/login"}
						onClick={() => setsidebaropen(false)}>
						<StyledLinkIcon isActive={pathname === "/login"}>
							<AiOutlineLogin />
						</StyledLinkIcon>
						{sidebaropen && (
							<StyledLinkLabel isActive={pathname === "/login"}>
								Login
							</StyledLinkLabel>
						)}
					</StyledLink>
				</StyledLinkContainer>
			)}
		</StyledSidebar>
	);
}
