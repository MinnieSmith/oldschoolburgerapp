import React from 'react';
import './Input.css';

const input = (props) => {
    let inputElement = null;
    /**
     * Sets the general className of the inputs to Input element
     * If invalid and shouldValidate, then the invalid is appended
     * to the inputElement and will display the invalid css class
     * attributes
     */
    const InputClasses = ['InputElement'];  

    if(props.invalid && props.shouldValidate && props.touched) {
        InputClasses.push('Invalid'); 
    }

    //check input types
    switch (props.elementType) {
        case ('input'):
            inputElement =
                <input className={InputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value} 
                    onChange={props.changed}/>;
            break;
        case ('textarea'):
            inputElement =
                <textarea className={InputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value}
                    onChange={props.changed} />;
            break;
        case ('select'):
            inputElement = (
                <select className={InputClasses.join(' ')}
                    value={props.value} 
                    onChange={props.changed}>
                    {props.elementConfig.options.map(option =>
                        <option key= {option.value}
                        value={option.value}>
                            {option.displayValue}
                        </option>)}
                </select>);
            break;
        default:
            inputElement =
                <input className={InputClasses.join(' ')}
                    {...props.elementConfig}
                    value={props.value} />;
    }

    return (
        <div className='Input'>
            <label className='Label'>{props.label}</label>
            {inputElement}
        </div>
    );


};

export default input;