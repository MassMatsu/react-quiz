import React, { useContext, createContext, useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
const AppContext = createContext();

//const API_ENDPOINT = 'https://opentdb.com/api.php?';
const tempURL =
  'https://opentdb.com/api.php?amount=10&category=21&difficulty=easy&type=multiple';

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);

  const fetchQuestions = async () => {
    //setLoading(true);
    const response = await axios(tempURL).catch((error) => console.log(error));
    console.log(response);

    if (response) {
      const data = response.data.results;
      console.log(data);
      if (data.length > 0) {
        setQuestions(data);
        setLoading(false);
        setError(false);
        setWaiting(false);
      } else {
        setError(true);
        setWaiting(true);
      }
    } else {
      setWaiting(true);
    }
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <AppContext.Provider
      value={{
        loading,
        questions,
        waiting,
        error,
        correct,
        index,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppProvider, useGlobalContext };
