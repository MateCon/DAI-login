import { createContext } from "react";

export interface UserInterface {
    token: string | null;
    platos: any[];
};

const UserContext = createContext<[UserInterface, Function]>([
    { token: null, platos: [] },
    () => {}
]);

export default UserContext;
