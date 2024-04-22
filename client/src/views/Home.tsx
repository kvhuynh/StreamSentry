import { useEffect, useState } from "react";
import { getPopularChannels } from "../services/twitch.service.api";
import { Button } from "@chakra-ui/react";

export const Home: React.FC = () => {
    // const [channels] = useState(null);
    // useEffect(() => {

    // })

    const handleGetPopularChannels = () => {
        getPopularChannels()
    }

    return(
        <Button onClick={handleGetPopularChannels}>

            <div>yo</div>
        </Button>
    )
}

export default Home;