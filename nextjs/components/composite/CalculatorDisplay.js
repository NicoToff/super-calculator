import Row from "../Row.js";
import Button from "../Button.js";
import { generateUUID } from "../../utils/helperFunctions.js";
import { ErrorRateFieldBox, ComplianceRateFieldBox } from "./CompositeFieldBox.js";
import { useState } from "react";

export default function CalculatorDisplay() {
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
        <>
            <div className="container">
                <div className="row">{boxList}</div>
            </div>
            <Button text="Rajouter des champs" onClick={addBoxes} color="success" otherClasses="btn-lg m-3" />
        </>
    );
}
