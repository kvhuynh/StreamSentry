import { useEffect, useState } from "react";
import { getTopChannels } from "../services/twitch.service.api";
import { Button } from "@chakra-ui/react";

export const Home: React.FC = () => {
    const [channels] = useState(null);
    useEffect(() => {

    })

    const getTopChannelss = () => {
        getTopChannels()
    }

    return(
        <Button onClick={}>

            <div>yo</div>
        </Button>
    )
}

export default Home;