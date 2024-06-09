import React from 'react';
import { useDispatch } from 'react-redux';
import { setCategoryState } from '../app/GlobalRedux/Feautures/category-slice';

const Filter = () => {
  const dispatch = useDispatch();
  const categories = ['All', 'Cats', 'Dogs', 'Birds', 'Others'];

  return (
    <div className="flex flex-wrap justify-center sm:justify-start space-x-4">
      {categories.map((category) => (
        <button
          key={category}
          data-cy="adotp-page-filter-btn"
          onClick={() => dispatch(setCategoryState(category))}
          type="button"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Filter;
