import React from 'react';
import {useHistory} from 'react-router-dom';
import {useState, useEffect} from 'react';
import {axios, axiosSpring} from '../../common/axios';
import Cookies from '../../../node_modules/js-cookie';
import {toast} from 'react-toastify';
import './Details.css';
import './Cart.css';

export default function Cart() {
    const [total, setTotal] = useState();
    const [cartMealsWithPrices, setCartMealsWithPrices] = useState([]);
    const history = useHistory();

    const getMealsApi = async cartSelections => {
        let dataApi = [];
        for (let i = 0; i < cartSelections.length; i++) {
            const response = await axios
                .get(`/lookup.php?i=${cartSelections[i].mealId}`)
                .catch((err) => console.log('Error:', err));
            if (response && response.data) {
                const mealWithPrice = response.data.meals[0];
                mealWithPrice.price = cartSelections[i].price;
                mealWithPrice.quantity = cartSelections[i].quantity;
                mealWithPrice.mealId = mealWithPrice.idMeal;
                dataApi.push(mealWithPrice);
            }
        }
        setCartMealsWithPrices(dataApi);
        getTotal();
    };

    const getCartMealsDb = async () => {
        const response = await axiosSpring
            .get('/cart', {
                headers: {
                    Authorization: 'Bearer ' + Cookies.get('token'),
                },
            })
            .catch((err) => console.log('Error:', err));
        if (response && response.data) {
            return response.data;
        }
    };


    const getTotal = () => {
        let sum = cartMealsWithPrices
            .map((cartItem) => cartItem.price * cartItem.quantity)
            .reduce((a, b) => a + b, 0);
        setTotal(sum);
    };

    const showMeals = async () => {
        await getCartMealsDb().then(r => getMealsApi(r));
        getTotal();
    };


    const reduction = async (mealId) => {
        setCartMealsWithPrices(cartMealsWithPrices.map(c => {
            if (c.idMeal === mealId) {
                c.quantity--;
            }
            return c;
        }).filter(c => c.quantity !== 0))
        getTotal()

    };

    const increase = async (mealId) => {
        setCartMealsWithPrices(cartMealsWithPrices.map(c => {
            if (c.idMeal === mealId) {
                c.quantity++;
            }
            return c;
        }))
        getTotal()

    };

    const removeProduct = async (mealId) => {
        setCartMealsWithPrices(cartMealsWithPrices.filter(c => c.idMeal !== mealId))
        getTotal()
    };

    const handleGoToPayment = () => {
        updateCart()
        history.push("/payment")

    }

    const updateCart = async () => {
        const response = await axiosSpring
            .post(`/cart/update-cart`, cartMealsWithPrices, {
                headers: {
                    Authorization: 'Bearer ' + Cookies.get('token'),
                },
            })
            .catch((err) => console.log('Error:', err));
        if (response.status === 201) {
            return 'ok';
        } else {
            toast.error('Check connection with the server');
        }
    };


    useEffect(() => {
        showMeals();
    }, []);

    if (cartMealsWithPrices.length === 0) {
        return <h2 style={{textAlign: 'center'}}>The cart is empty</h2>;
    } else {
        return (
            <section className="cart-box">
                {cartMealsWithPrices.map((item) => (
                    <div className="details cart" key={item.idMeal}>
                        <img src={item.strMealThumb} alt=""/>
                        <div className="box">
                            <div className="row">
                                <h2>{item.strMeal}</h2>

                            </div>
                            <p>
                                Category: <b>{item.strCategory}</b>
                            </p>
                            <p>
                                Cuisine: <b>{item.strArea}</b>
                            </p>

                            <div className="amount">

                                <button
                                    className="count"
                                    onClick={() => reduction(item.idMeal)}
                                >
                                    {' '}
                                    -{' '}
                                </button>
                                <span>
                  {
                      item.quantity
                  }
                </span>
                                <button className="count" onClick={() => increase(item.idMeal)}>
                                    {' '}
                                    +{' '}
                                </button>
                                <span className="total_price_quantity">
                 ${item.price * item.quantity}
                </span>
                            </div>

                        </div>
                        <div className="delete" onClick={() => removeProduct(item.idMeal)}>
                            X
                        </div>
                    </div>
                ))}
                <div className="details cart">
                    <div className="total">
                        <button className="btn btn-dark" onClick={handleGoToPayment}>Payment</button>
                        <h1>Total: ${total} </h1>
                    </div>
                </div>
            </section>
        );
    }
}
