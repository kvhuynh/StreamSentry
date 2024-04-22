import { Home } from "./views/Home";
// import "./App.css";
import { ChakraProvider } from '@chakra-ui/react'

function App() {


	return (
		<ChakraProvider>
			<Home></Home>
    </ChakraProvider>
	);
}

export default App;
