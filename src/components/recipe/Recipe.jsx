import React, {useState} from 'react';
import Cookies from 'js-cookie';
import './StyleProvider.scss'

const Recipe = ({id, name, description, userFirstName, userId, image, handleDeleteRecipeById}) => {
    const [readMore, setReadMore] = useState(false);


    return (
        <div className='recipe-item'>
            <div className="posted-title-recipe">
                <h6>Recipe posted by: {userFirstName}</h6>
                <h2 className="name-recipe">{name}</h2>
                <p className="description-meal">
                    {readMore
                        ? description
                        : `${description.substring(0, 10)}...`}
                    <button
                        className="showBtn"
                        onClick={() => setReadMore(!readMore)}>
                        {readMore ? 'show less' : 'read more'}
                    </button>
                </p>
            </div>
            <div >
                <img className="image-recipe" src={image} alt='description'/>
            </div>
            <div>
                {userId === parseInt(Cookies.get("id_user_DB")) ?
                    <div>
                        <button  className="btn btn-danger" onClick={() => handleDeleteRecipeById(id)}>REMOVE</button>
                    </div> :
                    null
                }

            </div>
        </div>
    );
};

export default Recipe;
