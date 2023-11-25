import React, { createContext, useContext, useReducer } from 'react';

const AppStateContext = createContext();

export const useAppState = () => {
    return useContext(AppStateContext);
};

export const AppStateProvider = ({ children }) => {
    const initialState = {
        displayName: "",
        email: "",
        phoneNumber: "",
        uid: "",
        role: "",
        data: null,
    };

    const reducer = (state, action) => {
        // Xử lý các action để cập nhật trạng thái
        switch (action.type) {
            case "SET_USER": {
                return {
                    ...state,
                    displayName: action.payload.displayName,
                    email: action.payload.email,
                    phoneNumber: action.payload.phoneNumber,
                    uid: action.payload.uid,
                }
            }
            case "SET_DATA": {
                return {
                    ...state,
                    data: action.payload,
                }
            }
            case "SET_ROLE": {
                return {
                    ...state,
                    role: action.payload,
                }
            }
            default:
                return state;
        }
    };

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppStateContext.Provider value={{ state, dispatch }}>
            {children}
        </AppStateContext.Provider>
    );
};
