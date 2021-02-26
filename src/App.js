import React from 'react';
import { useGlobalContext } from './context';
import Loading from './Loading';
import Modal from './Modal';
import SetupForm from './SetupForm';

function App() {
  const {
    loading,
    questions,
    correct,
    index,
    nextQuestion,
    checkAnswer,
    waiting,
  } = useGlobalContext();

  if (waiting) {
    return <SetupForm />;
  }

  if (loading) {
    return <Loading />;
  }
  //console.log(questions);

  const { question, correct_answer, incorrect_answers } = questions[index];
  const answers = [...incorrect_answers, correct_answer];

  return (
    <main>
      <Modal />
      <section className='quiz'>
        <p className='correct-answers'>
          correct answers : {correct} / {index}
        </p>
        <article className='container'>
          <h2 dangerouslySetInnerHTML={{ __html: question }}></h2>
          <div className='btn-container'>
            {answers.map((answer, index) => {
              return (
                <button
                  className='answer-btn'
                  key={index}
                  dangerouslySetInnerHTML={{ __html: answer }}
                  onClick={() => checkAnswer(answer === correct_answer)}
                ></button>
              );
            })}
          </div>
        </article>
        <button className='next-question' onClick={nextQuestion}>
          next question
        </button>
      </section>
    </main>
  );
}

export default App;
