import { io } from 'socket.io-client';

// "undefined" means the URL will be computed from the `window.location` object
// const URL: string = 'http://localhost:8000';

export const socket = io("http://localhost:8000", {
    transports: ["websocket"],
});

// export socket;