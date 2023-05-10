export interface GuestType {
  sender: string;
  img: number;
};


export interface SocketPropsType {
  name: string;
  img: number|string;
  roomNum: string;
  isHost: boolean;
}