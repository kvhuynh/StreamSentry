import { HStack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuSearch } from "react-icons/lu";


export const SearchBar: React.FC = () => {
	const [input, setInput] = useState<string>();
	const navigate = useNavigate();
	const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const value = event.target.value;
		setInput(value);
		console.log(input);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log("sdfs");

		navigate(`/${input}`);
	};

	return (
			<form onSubmit={onSubmit}>
				<InputGroup>
					<InputLeftElement children={<LuSearch />} />
					<Input
                        color="black"
						placeholder="Search streamers"
						w={"25vw"}
						onChange={(event) => onChange(event)}
					/>
				</InputGroup>
			</form>
	);
};

export default SearchBar;
