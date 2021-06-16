import useAsync from "../../getData/misc/useAsync";
import Cookies from '../../../node_modules/js-cookie';
import {useParams} from "react-router-dom";
import {useContext, useState} from "react";
import axios from "axios";
import {AuthContext} from "../authentication/AuthContext";


const DetailMeal = () => {
        let token = Cookies.get('token');
        const param = useParams();
        const {auth} = useContext(AuthContext);
        const [readMore, setReadMore] = useState(false);


        const state = useAsync(async () => {
            const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${param.id}`);
            const result = await response.json();
            return result.meals[0]
        }, []);
        const price = useAsync(async () => {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/prices/id/${param.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: 'Bearer ' + token
                    }
                }
            );
            return await response.json()
        }, []);

        const handleAdd = async () => {
            await axios({
                method: 'post',
                url: process.env.REACT_APP_API_URL + '/favorite/addMeal',
                data: {mealId: param.id},
                headers: {
                    Authorization: 'Bearer ' + token
                }
            }).catch((err) => console.log('Error:', err));

        }

        return (
            <>
                {state.loading
                    ? <div>Loading...</div>
                    : state.error
                        ? <div>Error: {state.error.message}</div>
                        : <div className="detail-mail-container">
                            <div className="header-detailMeal">
                                <div className="text-name-detail-meal">
                                    <h3>{state.value.strMeal}</h3>
                                </div>
                                <div className="detailMeal-page">
                                    <div>
                                        <img
                                            src={state.value.strMealThumb}
                                            className="photo"
                                            alt={state.value.strMeal}
                                        />
                                    </div>
                                    <div>
                                        <h5>Instructions:</h5>
                                        <p className="description-meal">
                                            {readMore
                                                ? state.value.strInstructions
                                                : `${state.value.strInstructions.substring(0, 200)}...`}
                                            <button
                                                className="showBtn"
                                                onClick={() => setReadMore(!readMore)}
                                            >
                                                {readMore ? 'show less' : 'read more'}
                                            </button>
                                        </p>
                                        <h5>Area food: {state.value.strArea}</h5>

                                        <div className="price">
                                            {price.loading
                                                ? <div>Loading...</div>
                                                : price.error
                                                    ? <div>Error: {price.error.message}</div>
                                                    : <div>Price {price.value}$</div>
                                            }

                                        </div>
                                        {auth ? (<div>
                                            <button className="btn-detail-meal" onClick={handleAdd}>
                                                {' '}
                                                add fav
                                            </button>
                                        </div>) : (<div/>)}

                                    </div>

                                </div>
                            </div>
                        </div>
                }


            </>

        );
    }
;
export default DetailMeal;
