import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from 'react-router-dom';
import {axios, axiosSpring} from '../../common/axios';
import Cookies from '../../../node_modules/js-cookie';
import Meal from '../meals/Meal';
import PageLoader from "../loading/Loading";

export default function SearchItems() {
    const [loading, setLoading] = useState(true);
    const [mealPrices, setMealPrices] = useState([]);
    // const [favorite, setFavorite] = useState();
    const history = useHistory();
    const param = useParams();
    const ingredient = param.mainIngredient;

    const getMealsApi = async () => {
        const response = await axios
            .get(`/filter.php?i=${ingredient}`)
            .catch((err) => {
                console.log(err)
                history.push('/')
            });
        if (response && response.data) {
            return response.data.meals;
        }
    };

    const getMealPrices = async (meals) => {
        let searchedMealsWithPrices = [];
        if (meals ) {
            for (let i = 0; i < meals.length; i++) {
                const response = await axiosSpring
                    .get(`/prices/id/${meals[i].idMeal}`, {
                        headers: {
                            Authorization: 'Bearer ' + Cookies.get('token'),
                        },
                    })
                    .catch((err) => console.log('Error:', err));
                if (response && response.data) {
                    const mealWithPrice = meals[i]
                    mealWithPrice.price = response.data
                    searchedMealsWithPrices.push(mealWithPrice)
                }
            }
        }
        setMealPrices(searchedMealsWithPrices);
    };

    const handleAdd = async (id, price) => {
        let res = await axiosSpring.post('/favorites', {
            id: `${id}`,
            price: `${price}`,
        });
        if (res.status !== 200) {
        }
        // setFavorite({ id: id, price: price });
    };

    const matchingPrices = async () => {
        setLoading(true);
        await getMealsApi().then(r => getMealPrices(r));
        setLoading(false);
    };

    useEffect(() => {
        matchingPrices();
    }, []);

    if (loading) {
        return (
            <main>
                <PageLoader/>
            </main>
        );
    }

    return (
        <>
            <div className="category-meals">
                <h2>Selections having: "{ingredient}"</h2>
                <div className="meals-category">
                    {mealPrices.map((meal) => {
                        return (
                            <Meal
                                key={meal.idMeal}
                                handleAdd={handleAdd}
                                {...meal}
                                price={
                                    parseInt(meal.price)
                                }
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
}
