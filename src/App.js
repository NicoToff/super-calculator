import logo from "./img/logo.svg";
import "./css/App.css";
import "./css/solarBootswtach.min.css";
import Row from "./components/Row.js";
import Button from "./components/Button.js";
import { generateUUID } from "./helperFunctions.js";
import { ErrorRateFieldBox, ComplianceRateFieldBox } from "./components/composite/CompositeFieldBox.js";
import { useState } from "react";

export default function App() {
    const fieldBoxCss = "border rounded p-3 m-1 col-sm";

    // One can add new fields to the App with the press of a button
    const newRow = () => (
        <Row
            children={[
                <ErrorRateFieldBox classes={fieldBoxCss} key={generateUUID()} />,
                <ComplianceRateFieldBox classes={fieldBoxCss} key={generateUUID()} />,
            ]}
            key={generateUUID()}
        />
    );
    const [boxList, setBoxList] = useState([newRow()]);
    const addBoxes = () => setBoxList(boxList.concat(newRow()));

    return (
        <div className="App">
            <header className="App-header">
                <h1>Super React Calculator</h1>
                <img src={logo} className="App-logo" alt="React logo" />
                <div className="container">
                    <div className="row">{boxList}</div>
                </div>
                <Button
                    text="Rajouter des champs"
                    onClick={addBoxes}
                    color="success"
                    otherClasses="btn-lg m-3"
                />
            </header>
        </div>
    );
}
