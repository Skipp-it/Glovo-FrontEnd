import React, {useEffect, useState} from 'react';
import {useParams} from 'react-router-dom';
import {axios, axiosSpring} from '../../common/axios';
import Meal from './Meal';
import {toast} from 'react-toastify';
import Cookies from '../../../node_modules/js-cookie';
import Axios from "axios";
import MealFilterByPrice from "./MealFilterByPrice"

const Meals = () => {

    let token = Cookies.get('token');
    const param = useParams();
    const category = param.strCategory;

    const [data, setData] = useState([]);
    const [filterData, setFilterData] = useState([]);


    const fetchData = () => {
        const api = `https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`
        const db =`${process.env.REACT_APP_API_URL}/prices/category/${category}`

        const getApiData = Axios.get(api)
        const getPrice = Axios.get(db, {headers: {Authorization: 'Bearer ' + token}})

        Axios.all([getApiData, getPrice]).then(
            Axios.spread((...allData) => {
                const dataApi = allData[0].data.meals;
                const dataPrice = allData[1].data;

                //>>>>method for creating a state from 2 data apis<<<<<

                for (let i = 0; i < dataApi.length; i++) {
                    let matching = dataPrice.find((item) => parseInt(item.idMeal) === parseInt(dataApi[i].idMeal))
                    if (matching) {
                        dataApi[i].price = matching.price
                    }
                }
                setData(dataApi.sort((a, b) => a.price > b.price ? 1 : -1))
                setFilterData(dataApi.sort((a, b) => a.price > b.price ? 1 : -1));
            })
        )
    }
    useEffect(() => {
        fetchData();
    }, [])

    const handleAdd = async (id, price) => {
        await axios({
            method: 'post',
            url: process.env.REACT_APP_API_URL + '/favorite/addMeal',
            data: {mealId: id, price: price},
            headers: {
                Authorization: 'Bearer ' + token,
            },
        }).catch((err) => console.log('Error:', err));
    };

    const handleAddToCart = async (id, price) => {
        const object = {
            mealId: `${id}`,
            price: `${price}`,
            quantity: 1,
        };
        let res = await axiosSpring
            .post('/cart/add-meal', object, {
                headers: {
                    Authorization: 'Bearer ' + Cookies.get('token'),
                },
            })
            .catch(() => {
                toast.error();
            });

        if (res.status === 201 && res.data) {
            toast.success('Add successful in Meals!');
        }
        // setCart({ id: id, price: price });
    };

    const handleChange = (e) => {
        let value = e.target.value;
        if (value === "low") {
            setFilterData(data.filter(data => data.price <= 20))
            console.log(data)
        } else if (value === "medium") {
            setFilterData(data.filter(data => data.price >= 21 && data.price <= 50))
        } else if (value === "high") {
            setFilterData(data.filter(data => data.price >= 51))
        }
    }


    return (
        <>
            <h2 className="title-category">{category}</h2>
            <div className="meals-category-display">
                <div className="category-meals" id="meals-category">
                    <div className="meal-sort-by-price">
                        <MealFilterByPrice handleChange={handleChange}/>
                    </div>
                    <div className="meals-category">
                        {filterData.map((meal) => {
                            return (
                                <Meal
                                    key={meal.idMeal}
                                    handleAddToFav={handleAdd}
                                    handleAddToCart={handleAddToCart}
                                    {...meal}
                                    price={meal.price}
                                />
                            );
                        })}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Meals;
