import React, {useState, useCallback, useEffect, useRef} from 'react';
import './Calculator.css';
import {Display} from "./Display";
import {InputField} from "./InputField";

export const Calculator = () => {
    const numberOneAsString = useRef("");
    const numberTwoAsString = useRef("");
    const operator = useRef('');
    const tempEqualSignPosition = useRef(-1);
    const tempOperatorPosition = useRef(-1);
    const willRerender = useRef(false);

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
                tempOperatorPosition.current = input.length - 1;
                // console.log("operatorPos: " + tempOperatorPosition.current);
                // console.log("equalSignPos at n1: " + tempEqualSignPosition.current);

                break;
            case '=':
                // console.log("input: " + input);
                let previousEqualSignPosition = tempEqualSignPosition.current;
                tempEqualSignPosition.current = input.length - 1;
                // console.log("n2str: " + numberTwoAsString.current);

                numberOneAsString.current = input.slice(previousEqualSignPosition + 1, tempEqualSignPosition.current).match(/[/*+=-]/) !== null
                    ? input.slice(previousEqualSignPosition + 1, tempOperatorPosition.current)
                    : input.slice(previousEqualSignPosition + 1, tempEqualSignPosition.current);
                // numberOneAsString.current = input.slice(previousEqualSignPosition + 1, tempOperatorPosition.current);
                // console.log("numberOneAsString: " + numberOneAsString.current);

                let numberOne = numberTwoAsString.current === "null" && numberOneAsString.current !== ""
                    ? parseFloat(numberOneAsString.current.replace(/[C/*+=-]+/, ""))
                    : result;
                console.log("numberOne: " + numberOne);
                // console.log("equalSignPos at n2: " + tempEqualSignPosition.current);
                // console.log("prevEqualSignPos at n2: " + previousEqualSignPosition);

                numberTwoAsString.current = input.slice(previousEqualSignPosition + 1, tempEqualSignPosition.current).match(/[/*+=-]/) !== null
                    ? input.slice(tempOperatorPosition.current + 1, tempEqualSignPosition.current)
                    : "";
                // console.log("input at n2str: " + input);
                // console.log("numberTwoAsString: " + numberTwoAsString.current);

                let numberTwo = parseFloat(numberTwoAsString.current.replace(/[C/*+=-]+/, ""));
                console.log("numberTwo: " + numberTwo);

                if (isNaN(numberTwo)) {
                    operator.current = '';
                }

                // if (willRerender.current) {
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
                            setResult(numberOne);
                            console.log("Invalid Operator");
                            break;
                    }
                    willRerender.current = false;
                // }
                console.log("operator: " + operator.current);
                // console.log("equalSignPos: " + tempEqualSignPosition.current);
                break;
            case 'C':
                // if (/\d/.test(input)) {
                operator.current = '';
                tempOperatorPosition.current = -1;
                tempEqualSignPosition.current = -1;
                setResult(0);
                setInput("");
                // }
                // console.log("result: " + result);
                // console.log("input: " + input);
                break;
            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '.':
                if (/\d/.test(input.slice(-1))) {
                    numberTwoAsString.current = "null";
                }
                // if (!willRerender.current) {
                //     willRerender.current = true;
                // }
                break;
            default:
                break;
        }                                           // eslint-disable-next-line
    }, [input]);
    // End of Calculation with onClick-Events

    return (
        <div className="Calculator" ref={focus} tabIndex="0" onKeyUp={e => {
            if (e.key.match(/^[0-9./*+=-]$/)) {
                setInput(input + e.key)
            } else if (e.key === "Enter") {
                setInput(input + "=");
            } else if (e.key === "Escape") {
                setInput(input + "C");
            } else if (e.key === ",") {
                setInput(input + ".");
            }
        }}>
            <Display result={result} output={input}/>
            <InputField callback={updateInput}/>
        </div>
    );
};
