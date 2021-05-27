import React, { useState } from 'react';
import Input from './Input';
import  './Search.css';
import {useHistory} from "react-router-dom";

export default function Search() {
  const [searchArgument, setSearchArgument] = useState('');
  const history = useHistory();

  const handleChange = (e) => {
    setSearchArgument(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    history.push(`/search/${searchArgument}`);
  };

  return (
    <div id="search-form">
      <form onSubmit={handleSubmit}>
        <Input name="search" value={searchArgument} onChange={handleChange} />
        <small id="emailHelp" className="form-text text-muted"/>
      </form>
    </div>
  );
}


