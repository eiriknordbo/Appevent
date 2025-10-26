import User from "./user";

export default interface privateParticipants {
  privateParticipants: User[];
  setPrivateParticipants: React.Dispatch<React.SetStateAction<User[]>>;
}
