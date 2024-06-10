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
  const initialUSer: UserData = userTokenStorage.checkLoginState()
    ? { loginStatus: true, productCounter: 0 }
    : { loginStatus: false, productCounter: 0 };

  let defaultState: UserState = { user: initialUSer, updateState: () => {} };

  if (props.state) {
    defaultState = props.state;
  }

  const [state, setState] = useState(defaultState);

  const updateState = (newState: Partial<UserState>) => {
    setState({ ...state, ...newState });
  };

  // const userContextValue: UserState = {
  //   updateState: updateState,
  //   user: state.user,
  // };

  // return (
  //   <UserContext.Provider value={userContextValue}>
  //     {props.children}
  //   </UserContext.Provider>
  // );

  return (
    <UserContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </UserContext.Provider>
  );
};
