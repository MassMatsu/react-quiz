import React, { useContext, createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const AppContext = createContext();

//const API_ENDPOINT = 'https://opentdb.com/api.php?';
const tempURL =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [questions, setQuestions] = useState([]);
  // const [waiting, setWaiting] = useState(false)
  // const [error, setError] = useState(false)

  const fetchQuestions = async () => {
    const response = await axios(tempURL).catch((error) => console.log(error));
    console.log(response);
    const data = response.data.results;
    console.log(data);
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return <AppContext.Provider value='state'>{children}</AppContext.Provider>;
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
