import React, { useState } from "react";

import Wrapper from "./components/Wrapper";
import Screen from "./components/Screen";
import ButtonBox from "./components/ButtonBox";
import Button from "./components/Button";

const btnValues = [
    ["C", "+-", "%", "/"],
    [7, 8, 9, "X"],
    [4, 5, 6, "-"],
    [1, 2, 3, "+"],
    ["" , ".", "="],
];

const toLocaleString = (num) =>
    String(num).replace(/(?<!\..*)(\d)(?=(?:\d{3})+(?:\.|$))/g, "$1 ");

const removeSpaces = (num) => num.toString().replace(/\s/g, "");


const App = () => {

    let [calc, setCalc] = useState({
        sign: "",
        num: ,
        res: ,
    });

    const numClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        if (removeSpaces(calc.num).length < 16) {
            setCalc({
                ...calc,
                num:
                calc.num === && value === "0"
                ? "0"
                    : calc.num % 1 ===
                    ? toLocaleString(Number (removeSpaces(calc.num + value)))
                    : toLocaleString(calc.num + value),
                res: !calc.sign ? : calc.res,
            });
        }
    };

    const commaClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            num: !calc.num.toString().includes(".") ? calc.num + value : calc.num,
        });
    };

    const signClickHandler = (e) => {
        e.preventDefault();
        const value = e.target.innerHTML;

        setCalc({
            ...calc,
            sign: value,
            res: !calc.res && calc.num ? calc.num : calc.res,
            num: ,
        });
    };

    const equalsClickHandler = () => {
        if (calc.sign && calc.num) {
            const math = (a,b, sign) =>
                sign === "+"
            ? a + b
            : sign === "-"
            ? a - b
            : sign === "X"
            ? a * b
            : a / b;

            setCalc({
                ...calc,
                res:
                calc.num === "0" && calc.sign === "/"
                    ? "Can't divide by zero"
                    : toLocaleString (
                        math (
                            Number (removeSpaces(calc.res)),
                            Number (removeSpaces(calc.num)),
                            calc.sign
                        )
                    ),
                sign: "",
                num: ,
            });
        }
    };

    const invertClickHandler = () => {
        setCalc ({
            ...calc,
            num: calc.num ? toLocaleString(removeSpaces(calc.num)) * -1 : ,
            num: calc.res ? toLocaleString(removeSpaces(calc.res)) * -1 : ,
            sign: "",
        });
    };

    const percentClickHandler = () => {
        let num = calc.num ? parseFloat(removeSpaces(calc.num)) : ;
        let res = calc.res ? parseFloat(removeSpaces(calc.res)) : ;

        setCalc ({
            ...calc,
            num: (num /= Math.pow(100,1)),
            res: (res /= Math.pow(100,1)),
            sign: "",
        });
    };

    const resetClickHandler = () => {
        setCalc ({
            ...calc,
            sign: "",
            num: ,
            res: ,
        });
    };




    return (
        <Wrapper>
            <Screen value={calc.num ? calc.num : calc.res}/>

            <ButtonBox>
                {
                    btnValues.flat().map((btn, i) => {
                        return (
                            <Button
                                key={i}
                                className={btn === "=" ? "equals" : ""}
                                value={btn}
                                onClick={
                                    btn === "C"
                                        ? resetClickHandler
                                        : btn === "+-"
                                        ? invertClickHandler
                                        : btn === "%"
                                            ? percentClickHandler
                                            : btn === "="
                                                ? equalsClickHandler
                                                : btn === "/" || btn === "X" || btn === "-" || btn === "+"
                                                    ? signClickHandler
                                                    : btn === "."
                                                        ? commaClickHandler
                                                        : numClickHandler
                                    //console.log('${btn} is clicked!');
                                }
                            />
                        );
                    })}
            </ButtonBox>
        </Wrapper>
    );
};



    export default App;