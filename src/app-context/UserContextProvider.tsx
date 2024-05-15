import { State } from '@commercetools/platform-sdk';
import React, { useState } from 'react';

import { UserContext, UserState } from './UserContext';

export interface UserContextProps {
  children?: React.ReactNode;
  state?: UserState;
}

export const UserContextProvider: React.FunctionComponent<UserContextProps> = (
  props: UserContextProps,
): JSX.Element => {
  let defaultState = {};

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
