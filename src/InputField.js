import React from 'react';
import './InputField.css';

export const InputField = (props) => {

    return (
        <div className="InputField">
                <div id="C" className="clear Button Operation" onClick={props.callback}>C</div>
                <div id="/" className="divide Button Operation" onClick={props.callback}>/</div>
                <div id="7" className="seven Button Number" onClick={props.callback}>7</div>
                <div id="8" className="eight Button Number" onClick={props.callback}>8</div>
                <div id="9" className="nine Button Number" onClick={props.callback}>9</div>
                <div id="*" className="multiply Button Operation" onClick={props.callback}>*</div>
                <div id="4" className="four Button Number" onClick={props.callback}>4</div>
                <div id="5" className="five Button Number" onClick={props.callback}>5</div>
                <div id="6" className="six Button Number" onClick={props.callback}>6</div>
                <div id="-" className="subtract Button Operation" onClick={props.callback}>-</div>
                <div id="1" className="one Button Number" onClick={props.callback}>1</div>
                <div id="2" className="two Button Number" onClick={props.callback}>2</div>
                <div id="3" className="three Button Number" onClick={props.callback}>3</div>
                <div id="+" className="add Button Operation" onClick={props.callback}>+</div>
                <div id="0" className="zero Button Number" onClick={props.callback}>0</div>
                <div id="." className="dot Button Number" onClick={props.callback}>.</div>
                <div id="=" className="equals Button Operation" onClick={props.callback}>=</div>
        </div>
    );
};
