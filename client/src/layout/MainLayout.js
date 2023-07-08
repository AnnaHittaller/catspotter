import { useContext } from "react";
import { useLocation } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import { SidebarContext } from "../context/SidebarContext";
import { StyledLayout, StyledMain } from "../styles/styled/Styled_MainLayout";

export default function MainLayout({ children }) {
	const { sidebaropen, setsidebaropen } = useContext(SidebarContext);
	const location = useLocation();
	// console.log(location.pathname);

	return (
		<ThemeProvider theme={{ sidebaropen, setsidebaropen }}>
			<StyledLayout>
				<Sidebar />
				<StyledMain location={location}>
					{children}
					<Footer />
				</StyledMain>
			</StyledLayout>
		</ThemeProvider>
	);
}
