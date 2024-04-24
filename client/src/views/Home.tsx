import { useEffect, useState } from "react";
import { getPopularChannels } from "../services/twitch.service.api";
import {
	Box,
	Button,
	ButtonGroup,
	Card,
	CardBody,
	CardFooter,
	CardHeader,
	Center,
	Flex,
	Heading,
	Image,
	SimpleGrid,
	Spacer,
	Stack,
	Text,
	Wrap,
	WrapItem,
	Link,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export const Home: React.FC = () => {
	const [channels, setChannels] = useState<Array<unknown>>([]);
	useEffect(() => {
		getPopularChannels().then((popularChannels: object) => {
			setChannels(popularChannels);
		});
	}, []);
	return (
		<Wrap justify={"center"}>
			{/* <Center> */}
			{channels.map((channel: unknown, i: number) => {
				return (
					<Link
						as={NavLink}
						to={channel.user_name}
                        state={{ channel }}
					>
						<Card data-type="Card" maxW={400} key={i}>
							<CardBody data-type="CardBody">
								<Image
									src={channel.thumbnail_url
										.replace("{width}", 500)
										.replace("{height}", 300)}
									alt={channel.thumbnail_url}
									borderRadius="lg"
								></Image>
								<Stack data-type="Stack" mt="6" spacing="3">
									<Heading data-type="Heading" size="md">
										{channel.user_name}
									</Heading>
									<Text data-type="Text" noOfLines={1}>
										{channel.title}{" "}
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
			{/* </Center> */}
		</Wrap>
	);
};

export default Home;
