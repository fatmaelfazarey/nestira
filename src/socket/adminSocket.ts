import { IP } from "@/store/Path";
import { io } from "socket.io-client";

export const adminSocket = io(IP, {
  transports: ["websocket"],
  autoConnect: false,
});
