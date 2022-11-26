import { useState } from "react";

export default function LinkedInput() {
    const [firstVal, setFirstVal] = useState(0);
    const [secondVal, setSecondVal] = useState(0);
    const changeFirstValue = e => {
        setSecondVal(e.target.value);
        setFirstVal(e.target.value * 2);
    };

    const changeSecondValue = e => {
        setFirstVal(e.target.value);
        setSecondVal(e.target.value / 2);
    };

    return (
        <div>
            <input type="number" value={firstVal} onChange={changeSecondValue}></input>
            <input type="number" value={secondVal} onChange={changeFirstValue}></input>
        </div>
    );
}
