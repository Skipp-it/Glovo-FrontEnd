import React from 'react';

import Carusel from '../carusel/Carusel';
import Categories from '../category/Categories';
import Search from '../search/Search';


const MainPage = () => {

  return (
    <>
      <div>
        <div>
          <Carusel />
        </div>
        <Search />
        <div className="">
          <Categories />
        </div>
      </div>
    </>
  );
};

export default MainPage;
