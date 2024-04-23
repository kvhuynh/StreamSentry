import { useEffect, useState } from "react";
import { getPopularChannels } from "../services/twitch.service.api";
import { Button } from "@chakra-ui/react";



export const Home: React.FC = () => {
    const [channels, setChannels] = useState<unknown>([]);
    useEffect(() => {
        getPopularChannels()
        .then((popularChannels: object) => {
            setChannels(popularChannels);
        })

    }, [])
    return(
        <>
            {channels.map((channel: unknown) => {
                return (
                    <div>
                        {channel.game_name}
                    </div>
                )
            })}

        </>
    )
}

export default Home;