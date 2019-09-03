import React, {useState, useCallback, useEffect, useRef} from 'react';
import './Calculator.css';
import {Display} from "./Display";
import {InputField} from "./InputField";

export const Calculator = () => {
    const numberOneAsString = useRef("");
    const numberTwoAsString = useRef("");
    const operator = useRef('');

    const focus = useCallback(node => {
        node.focus();
        // console.log("focus");
    }, []);

    const [input, setInput] = useState("");
    const [result, setResult] = useState(0);

    const updateInput = useCallback(e => {
        setInput(input + e.target.id);
    }, [input]);

    // Perform Calculation with onClick-Events
    useEffect(() => {
        switch (input.slice(-1)) {
            case '/':
            case '*':
            case '+':
            case '-':
                operator.current = input.slice(-1);
                // console.log("operatorPos: " + tempOperatorPosition.current);
                // console.log("equalSignPos at n1: " + tempEqualSignPosition.current);

                numberOneAsString.current = input.replace(/[C/*+=-]+/, "");
                numberOneAsString.current = numberOneAsString.current.replace(/[.][.]+/, ".");
                setInput("");
                // console.log("numberOneAsString: " + numberOneAsString.current);

                break;
            case '=':
                // console.log("input: " + input);
                // console.log("n2str: " + numberTwoAsString.current);

                let numberOne = numberOneAsString.current !== ""
                    ? parseFloat(numberOneAsString.current)
                    : result;
                console.log("numberOne: " + numberOne);

                numberTwoAsString.current = input.replace(/[C/*+=-]+/, "");
                numberTwoAsString.current = numberTwoAsString.current.replace(/[.][.]+/, ".");

                // console.log("input at n2str: " + input);
                // console.log("numberTwoAsString: " + numberTwoAsString.current);

                let numberTwo = parseFloat(numberTwoAsString.current);
                console.log("numberTwo: " + numberTwo);

                if (!isNaN(numberTwo)) {
                    switch (operator.current) {
                        case '/':
                            setResult(numberOne / numberTwo);
                            break;
                        case '*':
                            setResult(numberOne * numberTwo);
                            // console.log("a");
                            break;
                        case '+':
                            setResult(numberOne + numberTwo);
                            break;
                        case '-':
                            setResult(numberOne - numberTwo);
                            break;
                        default:
                            setResult(numberTwo);
                            console.log("Invalid Operator");
                            break;
                    }
                }
                console.log("operator: " + operator.current);
                operator.current = '';
                setInput("");
                break;
            case 'C':
                operator.current = '';
                setResult(0);
                setInput("");
                // console.log("result: " + result);
                // console.log("input: " + input);
                break;
            default:
                break;
        }                                           // eslint-disable-next-line
    }, [input]);
    // End of Calculation with onClick-Events

    const handleKeyInput = e => {
        if (e.key.match(/^[0-9./*+=-]$/)) {
            setInput(input + e.key)
        } else if (e.key === "Enter") {
            setInput(input + "=");
        } else if (e.key === "Escape") {
            setInput(input + "C");
        } else if (e.key === ",") {
            setInput(input + ".");
        }
    };

    return (
        <div className="Calculator" ref={focus} tabIndex="0" onKeyUp={handleKeyInput}>
            <Display result={result} output={input}/>
            <InputField callback={updateInput}/>
        </div>
    );
};
