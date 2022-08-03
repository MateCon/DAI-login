import { createContext } from "react";

export interface UserInterface {
    token: string | null;
};

const UserContext = createContext<[UserInterface, Function]>(
    [{ token: null },
    () => {}]
);

export default UserContext;
