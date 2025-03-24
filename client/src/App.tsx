import { Route, Routes } from "react-router-dom";
import { Home } from "./views/Home";
import { ChakraProvider, Box } from "@chakra-ui/react";
import { Channel } from "./views/Channel";

function App() {
	return (
		<ChakraProvider>
			<Box margin={"0 auto"}>
				<Routes>
					<Route path="/" element={<Home />}></Route>
					<Route path="/:channelName" element={<Channel />}></Route>
				</Routes>
			</Box>
		</ChakraProvider>
	);
}

export default App;
