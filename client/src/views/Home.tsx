import { useEffect, useState } from "react";
import { getPopularChannels } from "../services/twitch.service.api";
import {
	Card,
	CardBody,
	CardFooter,
	HStack,
	InputGroup,
	InputLeftElement,
	Flex,
	Heading,
	Image,
	Stack,
	Text,
	Wrap,
	Link,
	Input,
} from "@chakra-ui/react";
import { LuSearch } from "react-icons/lu";

import { NavLink } from "react-router-dom";
import { socket } from "../socket";

export const Home: React.FC = () => {
	const [channels, setChannels] = useState<Array<unknown>>([]);
	useEffect(() => {
		getPopularChannels().then((popularChannels: object) => {
			setChannels(popularChannels);
		});
		socket.on("connection", () => {
			console.log("connected to fronend");
		});
	}, []);
	return (
		<Flex
			// minHeight="100vh"
			direction="column"
			align="center"
			overflow="auto"
			// p={4}
		>
			{/* Centered Heading */}
			<Flex
				direction="column"
				justify="center"
				height="50vh"
				alignItems={"center"}
			>
				<Heading mb={10}>Stream Sentry</Heading>
				{/* <Input width="25vw" placeholder="filler"></Input>
				 */}
				<HStack gap="10" width="full">
					<InputGroup>
						<InputLeftElement
							children={<LuSearch/>}
						/>
						<Input placeholder="Search contacts" w={"25vw"} />
					</InputGroup>
				</HStack>
			</Flex>

			{/* Content Below */}
			<Wrap justify="center" pb={4}>
				{channels.map((channel: any, i: number) => {
					console.log(channel.user_id);

					return (
						<Link
							as={NavLink}
							to={channel.user_name}
							state={{ channel }}
							key={i}
						>
							<Card data-type="Card" maxW={400}>
								<CardBody data-type="CardBody">
									<Image
										src={channel.thumbnail_url
											.replace("{width}", "500")
											.replace("{height}", "300")}
										alt={channel.thumbnail_url}
										borderRadius="lg"
									/>
									<Stack data-type="Stack" mt="6" spacing="3">
										<Heading data-type="Heading" size="md">
											{channel.user_name}
										</Heading>
										<Text data-type="Text" noOfLines={1}>
											{channel.title}
										</Text>
									</Stack>
								</CardBody>
								<CardFooter data-type="CardFooter">
									<Text
										data-type="Text"
										color="red.600"
										fontSize="s"
										sx={{ wordWrap: "wrap" }}
									>
										{channel.viewer_count} viewers
									</Text>
								</CardFooter>
							</Card>
						</Link>
					);
				})}
			</Wrap>
		</Flex>
	);
};

export default Home;
