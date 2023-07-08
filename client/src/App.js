import MainLayout from "./layout/MainLayout";
import { GlobalStyle } from "./styles/GlobalStyle";
import AllRoutes from "./AllRoutes";

function App() {
	return (
		<>
			<GlobalStyle />
			<MainLayout>
				<AllRoutes />
			</MainLayout>
		</>
	);
}

export default App;
