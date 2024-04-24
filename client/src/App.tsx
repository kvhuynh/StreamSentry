import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { ChakraProvider } from "@chakra-ui/react";
import { Channel } from "./views/Channel";

function App() {
	return (
		<ChakraProvider>
			<Routes>
				<Route path="/" element={<Home />}></Route>
				<Route path=":name" element={<Channel />}></Route>
			</Routes>
		</ChakraProvider>
	);
}

export default App;
