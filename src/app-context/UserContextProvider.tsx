import React, { useState } from 'react';

import { userTokenStorage } from '../services/LocalStorage';

import { UserContext, UserData, UserState } from './UserContext';

export interface UserContextProps {
  children?: React.ReactNode;
  state?: UserState;
}

export const UserContextProvider: React.FunctionComponent<UserContextProps> = (
  props: UserContextProps,
): JSX.Element => {
  const initialUSer: UserData = userTokenStorage.checkTokens()
    ? { loginStatus: true }
    : { loginStatus: false };

  let defaultState: Partial<UserState> = { user: initialUSer };

  if (props.state) {
    defaultState = props.state;
  }

  const [state, setState] = useState(defaultState);

  const updateState = (newState: Partial<UserState>) => {
    setState({ ...state, ...newState });
  };

  return (
    <UserContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </UserContext.Provider>
  );
};
