import React from 'react';

const initialState: UserState = {
  user: {
    productCounter: 0,
  },
  updateState: (newState?: Partial<UserState>) => {},
};

export interface UserData {
  loginStatus?: boolean;
  productCounter: number;
}

export interface UserState {
  updateState: (newState: Partial<UserState>) => void;
  user: UserData;
}

export const UserContext = React.createContext<UserState>(initialState);
