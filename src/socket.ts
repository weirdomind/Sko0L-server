// server to client
export interface ServerToClientEvents {
    message: (message: string) => void;
    noArg: () => void;
}

// client to server
export interface ClientToServerEvents {
    message: (message: string) => void;
}

// server to server
export interface InterServerEvents {
    ping: () => void;
}

export interface SocketData {
    name: string;
    age: number;
}