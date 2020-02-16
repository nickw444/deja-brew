import React from 'react';


export const withOnUnmount = (action: () => void) => (Inner: React.ComponentType) => React.memo(() => {
  React.useEffect(() => action);
  return <Inner/>;
});
