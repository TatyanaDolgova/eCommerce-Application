import React from 'react';

const initialState: UserState = {
  user: {},
  updateState: (newState?: Partial<UserState>) => {},
};

export interface UserData {
  firstName?: string;
  id?: number;
  loginStatus?: boolean;
  username?: string;
}

export interface UserState {
  updateState: (newState: Partial<UserState>) => void;
  user?: UserData;
}

export const UserContext = React.createContext<UserState>(initialState);
