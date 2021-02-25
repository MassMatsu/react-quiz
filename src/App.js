import React from 'react';
import { useGlobalContext } from './context';

const App = () => {
  const data = useGlobalContext();

  return <div>App {data}</div>;
};

export default App;
