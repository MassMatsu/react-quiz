import React, { useContext, createContext, useState } from 'react';
import axios from 'axios';

const AppContext = createContext();

const API_ENDPOINT = 'https://opentdb.com/api.php?';

const AppProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [questions, setQuestions] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const [error, setError] = useState(false);
  const [correct, setCorrect] = useState(0);
  const [index, setIndex] = useState(0);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quiz, setQuiz] = useState({
    amount: 10,
    category: 'sports',
    difficulty: 'easy',
  });

  const table = {
    sports: 21,
    history: 23,
    politics: 24,
    jpAnime: 31,
  };

  const fetchQuestions = async (url) => {
    const response = await axios(url).catch((error) => console.log(error));
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

  const nextQuestion = () => {
    setIndex((prev) => {
      let newIndex = prev + 1;
      if (newIndex > questions.length - 1) {
        setIsModalOpen(true);
        newIndex = 0;
      }
      return newIndex;
    });
  };

  const checkAnswer = (auth) => {
    if (auth) {
      setCorrect((prev) => {
        return prev + 1;
      });
    }
    nextQuestion();
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setWaiting(true);
    setCorrect(0);
  };

  const handleChange = (e) => {
    setQuiz({ ...quiz, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //console.log(e.target.amount.value);
    const url = `${API_ENDPOINT}amount=${quiz.amount}&category=${
      table[quiz.category]
    }&difficulty=${quiz.difficulty}&type=multiple`;

    fetchQuestions(url);
  };

  return (
    <AppContext.Provider
      value={{
        loading,
        questions,
        waiting,
        error,
        correct,
        index,
        nextQuestion,
        checkAnswer,
        isModalOpen,
        closeModal,
        handleChange,
        handleSubmit,
        quiz,
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
