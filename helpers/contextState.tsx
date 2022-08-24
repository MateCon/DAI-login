import { createContext, FC, useContext, useReducer } from "react";

interface State {
    token: string | null;
    platos: any[];
}

export const initialState = {
    token: null,
    platos: []
}

export enum ActionType {
    SetToken = "SET_TOKEN",
    AddPlato = "ADD_PLATO",
    DelPlato = "DEL_PLATO"
}

export interface Action {
    type: ActionType,
    payload: any
}

export const reducer = (state: State = initialState, action: Action): State => {
    switch (action.type) {
        case ActionType.AddPlato:
            console.log(action)
            return ({
                ...state,
                platos: [ ...state.platos, action.payload ]
            })
        case ActionType.DelPlato:
            return ({
                ...state,
                platos: state.platos.filter((p: any) => p.id !== action.payload)
            })
        case ActionType.SetToken:
            return ({
                ...state,
                token: action.payload
            });
        default:
            return state;
    }
}

export const initialContext = {
    contextState: initialState,
    setContextState: () => {}
}

interface Props {
    initial?: State;
}

const Cont = createContext<{ contextState: State, setContextState: Function }>(initialContext);

export const ContextProvider: FC<Props> = ({ children, initial = initialState }) => {
    const [state, dispatch] = useReducer(reducer, initial);

    const contextState = state;
    const setContextState = dispatch;

    return (
        <Cont.Provider value={{ contextState, setContextState }}>{children}</Cont.Provider>
    )
}

export const useContextState = () => useContext(Cont);
