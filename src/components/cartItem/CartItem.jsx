import React from 'react';

const CartItem = props => {
    return (
        <>
            <div className="details cart" key={item.idMeal} >
                <img src={item.strMealThumb} alt="" />
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
                      cart.filter((cartItem) => {
                          return cartItem.mealId == item.idMeal;
                      })[0].quantity
                  }
                </span>
                        <button className="count" onClick={() => increase(item.idMeal)}>
                            {' '}
                            +{' '}
                        </button>
                        <span className="total_price_quantity">
                 ${cart.filter((cartItem) => {
                            return cartItem.mealId == item.idMeal;
                        })[0].price *
                        cart.filter((cartItem) => {
                            return cartItem.mealId == item.idMeal;
                        })[0].quantity}
                </span>
                    </div>

                </div>
                <div className="delete" onClick={() => removeProduct(item.idMeal)}>
                    X
                </div>
            </div>
        </>
    );
};

export default CartItem;
