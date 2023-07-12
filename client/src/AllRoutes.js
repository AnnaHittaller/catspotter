import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import MapPage from "./pages/MapPage";
import NotFound from "./pages/NotFound";
import ProfilePage from "./pages/ProfilePage";
import GuidesPage from "./pages/GuidesPage";
import BookmarksPage from "./pages/BookmarksPage";
import ContactPage from "./pages/ContactPage";
import NotificationsPage from "./pages/NotificationsPage";
import CatUploadPage from "./pages/CatUploadPage";
import UserUpdatePage from "./pages/UserUpdatePage";
import CatPage from "./pages/CatPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import EmailConfirmPage from "./pages/EmailConfirmPage";
import ProtectedLayout from "./layout/ProtectedLayout";

const AllRoutes = () => {
	return (
		<Routes>
			<Route exact path="/" element={<HomePage />} />
			<Route path="/login" element={<LoginPage />} />
			<Route path="/map" element={<MapPage />} />
			<Route path="/guides" element={<GuidesPage />} />
			<Route element={<ProtectedLayout/>}>
				<Route path="/bookmarks" element={<BookmarksPage />} />
				<Route path="/notifications" element={<NotificationsPage />} />
				<Route path="/upload" element={<CatUploadPage />} />
				<Route path="/profile" element={<ProfilePage />} />
				<Route path="/updateprofile" element={<UserUpdatePage />} />
			</Route>
			<Route path="/contact" element={<ContactPage />} />
			<Route path="/forgotpassword" element={<ForgotPasswordPage />} />
			<Route path="/cat/:id" element={<CatPage />} />
			<Route path="/emailconfirm/:token" element={<EmailConfirmPage />} />
			<Route path="/forgotpassword/" element={<ForgotPasswordPage />} />
			<Route path="/resetpassword/:token" element={<ResetPasswordPage />} />
			<Route path="*" element={<NotFound />} />
		</Routes>
	);
};

export default AllRoutes;
