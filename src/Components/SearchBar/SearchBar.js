import { useState } from 'react';
import PropTypes from 'prop-types';
import { toast } from 'react-toastify';
import s from './SearchBar.module.css';

const SearchBar = ({ onClick }) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleInput = evt => {
    setSearchQuery(evt.target.value);
  };

  const handleClick = evt => {
    evt.preventDefault();

    if (searchQuery === '') {
      toast.error('Nothing to find. Check input field please');
      return;
    }
    onClick(searchQuery);
  };

  return (
    <form className={s.searchBar} onSubmit={handleClick}>
      <label>
        <input
          className={s.input}
          type="text"
          autoComplete="off"
          placeholder="Search movie"
          value={searchQuery}
          onChange={handleInput}
        ></input>
      </label>
      <button className={s.button} type="submin">
        Search
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default SearchBar;
