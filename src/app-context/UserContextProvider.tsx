import React, { useState } from 'react';

import { UserContext, UserState } from './UserContext';

interface Props {
  children: React.ReactNode;
}

export const UserContextProvider: React.FunctionComponent<Props> = (
  props: Props,
): JSX.Element => {
  const [state, setState] = useState({});

  const updateState = (newState: Partial<UserState>) => {
    setState({ ...state, ...newState });
  };

  return (
    <UserContext.Provider value={{ ...state, updateState }}>
      {props.children}
    </UserContext.Provider>
  );
};
