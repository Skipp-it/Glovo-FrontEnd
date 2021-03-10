import React, { useEffect, useState } from 'react';
import Category from './Category';
import { axios } from '../../common/axios';
import Loading from '../loading/Loading';
import "./Category.css";

const Categories = () => {
  const [loading, setLoading] = useState(true);
  const [categoriesApi, setCategoriesApi] = useState();

  const getCategoriesApi = async () => {
    setLoading(true);
    const response = await axios
      .get('/categories.php')
      .catch((err) => console.log('Error:', err));
    if (response && response.data) {
      setCategoriesApi(response.data.categories);
        setLoading(false);
    }
  };
  useEffect(() => {
    getCategoriesApi();
  }, []);

  if (loading) {
    return (
      <main>
        <Loading />
      </main>
    );
  }
  return (
    <div  className="categories">
      <h2 >Categories</h2>
      <div className="display-categories" >
        {categoriesApi.map((category) => {
          return <Category key={category.idCategory} {...category} />;
        })}
      </div>
    </div>
  );
};

export default Categories;
