import logo from "./img/logo.svg";
import "./css/App.css";
import "./css/solarBootswtach.min.css";

import Button from "./components/Button.js";
import Row from "./components/Row.js";
import { ErrorRateFieldBox, ComplianceRateFieldBox } from "./components/composite/CompositeFieldBox.js";
import { generateUUID } from "./helperFunctions.js";
import { useState } from "react";

export default function App() {
    const cssClasses = "border rounded p-3 m-1 col-sm";
    const newRow = () => (
        <Row
            children={[
                <ErrorRateFieldBox classes={cssClasses} key={generateUUID()} />,
                <ComplianceRateFieldBox classes={cssClasses} key={generateUUID()} />,
            ]}
            key={generateUUID()}
        />
    );
    const [boxList, setBoxList] = useState([newRow()]);
    const addBoxes = () => {
        setBoxList(boxList.concat(newRow()));
    };

    return (
        <div className="App">
            <header className="App-header">
                <h1>Super React Calculator</h1>
                <img src={logo} className="App-logo" alt="React logo" />
                <Button
                    text="Rajouter des champs"
                    onClick={addBoxes}
                    color="success"
                    otherClasses="btn-lg m-5"
                />
                <div className="container">{boxList}</div>
            </header>
        </div>
    );
}
