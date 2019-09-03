import React, {useState, useRef, useEffect} from 'react';
import './Display.css';

export const Display = (props) => {
    let tempOutputRef = useRef(props.output);

    const [output, setOutput] = useState(""); // 22. Zeichen
    const [result, setResult] = useState(0);
    // console.log("output ref: " + tempOutputRef.current);
    // console.log("output props: " + props.output);

    useEffect(() => {
        if (tempOutputRef.current.length > 20) {
            tempOutputRef.current = tempOutputRef.current.slice(1, tempOutputRef.current.length);
            tempOutputRef.current = tempOutputRef.current + props.output.slice(-1);
        } else {
            tempOutputRef.current = tempOutputRef.current + props.output.slice(-1);
        }
        if (tempOutputRef.current.slice(-1).match(/[=C]/)) {
            tempOutputRef.current = "";
        }
        setOutput(tempOutputRef.current);
    }, [props.output]);

    useEffect(() => {
        if (props.result.toString().length > 10) {
            setResult(props.result.toExponential(2));
        } else {
            setResult(props.result);
        }
    }, [props.result]);

    return (
        <>
            <div className="Display element">{result}</div>
            <div className="DisplayOperations element">{output}</div>
        </>
    );
};
