// server to client
interface ServerToClientEvents {
    message: (message: string) => void;
    noArg: () => void;
}

// client to server
interface ClientToServerEvents {
    message: (message: string) => void;
}

// server to server
interface InterServerEvents {
    ping: () => void;
}

interface SocketData {
    name: string;
    age: number;
}