import { array } from 'prop-types';
import React from 'react';
import './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';

const burger = (props) => {
    /* since state in the burger builder is an object, we can't use 
       we can't use map instead we have to transform it into an array
       using the keys method */
    let transformedIngredients =Object.keys(props.ingredients)
    .map(igKey => {
        /*
        Array creates an array with length (n)
        This method creates an array of burger ingredients from an
        object[the ingredients] of key[how many] value pairs
        */
        return [...Array(props.ingredients[igKey])].map((_, i) => {
           return <BurgerIngredient key ={igKey +i} type ={igKey} />
        });
    })
    /* reduce() is an array function that turns a 2D array into a single array
    making it easier to determine whether it is empty */
    .reduce((arr, el) => {
        return arr.concat(el);
    }, []);

    //if the burger doesn't have any ingredients, there will be a message displayed
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start building your burger!</p>;
    }

    return (
        <div className='Burger'>
            <BurgerIngredient type="bread-top"/>
            {/* returns a function with {} */}
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;