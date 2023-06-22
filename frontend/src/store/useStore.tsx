import { log } from "console";
import {
  createContext,
  Dispatch,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";
import { clearToken } from "../utils/localstorage";
import api from "../config/api";
export type TActions =
  | "STORE_USER"
  | "AUTHENTICATE"
  | "LOGOUT"
  | "INITIALIZE_STORE"
  | "UPDATE_BALANCE"
  | "UPDATE_USER";
type TStore = {
  isAuthenticated: boolean;
  user: {
    balance: string;
    id: number;
    name: string;
    email: string;
    address?: string;
    token: string;
  };
};

type TStoreContext = {
  state: TStore;
  dispatch: Dispatch<{
    type: TActions;
    payload: any;
  }>;
};

export const StoreContext = createContext<any>({});
const initialState: TStore = {
  isAuthenticated: false,
  user: {
    id: null,
    name: "",
    balance: "0",
    email: "",
    address: "",
    token: "",
  },
};

const reducer = (
  state: TStore = initialState,
  action: { type: TActions; payload: any }
): TStore => {
  console.log(action);
  switch (action.type) {
    case "AUTHENTICATE": {
      return {
        ...state,
        isAuthenticated: action.payload,
      };
    }
    case "STORE_USER": {
      return {
        ...state,
        user: action.payload,
      };
    }
    case "LOGOUT": {
      clearToken();
      return initialState;
    }
    case "INITIALIZE_STORE": {
      return {
        ...state,
        ...action.payload,
      };
    }
    case "UPDATE_BALANCE": {
      state.user.balance = action.payload;
      return {
        ...state,
      };
    }
    case "UPDATE_USER": {
      return { ...state, ...action.payload };
    }
    default:
      return state;
  }
};
export const StoreProvider = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {props.children}
    </StoreContext.Provider>
  );
};
export const useStore = () => useContext(StoreContext) as TStoreContext;
