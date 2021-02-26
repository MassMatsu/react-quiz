import React from 'react';
import { useGlobalContext } from './context';

const SetupForm = () => {
  const { handleSubmit, handleChange, quiz, error } = useGlobalContext();
  return (
    <section className='quiz quiz-small'>
      <form className='setup-form' onSubmit={handleSubmit}>
        <h2 className='title'>quiz challenge</h2>
        <div className='form-control'>
          <label htmlFor='amount'> number of quwstions</label>
          <input
            type='number'
            id='amount'
            name='amount'
            className='form-input'
            min='1'
            max='50'
            onChange={handleChange}
            value={quiz.amount}
          />
        </div>
        <div className='form-control'>
          <label htmlFor='category'>category</label>
          <select
            name='category'
            id='category'
            className='form-input'
            onChange={handleChange}
            value={quiz.category}
          >
            <option value='sports'>sports</option>
            <option value='history'>history</option>
            <option value='politics'>politics</option>
            <option value='jpAnime'>Japanese Anime</option>
          </select>
        </div>
        <div className='form-control'>
          <label htmlFor='difficulty'>select difficulty</label>
          <select
            name='difficulty'
            id='difficulty'
            className='form-input'
            onChange={handleChange}
            value={quiz.difficulty}
          >
            <option value='easy'>easy</option>
            <option value='medium'>medium</option>
            <option value='hard'>hard</option>
          </select>
        </div>
        {error && (
          <p className='error'>
            cannot generate quiz, please try different options.
          </p>
        )}
        <button className='submit-btn'>start</button>
      </form>
    </section>
  );
};

export default SetupForm;
