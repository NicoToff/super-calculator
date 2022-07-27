import "../../css/solarBootswtach.min.css";
import { InputField, OutputField } from "../Fields.js";
import { useState } from "react";
import FieldBox from "../FieldBox.js";
import Accordion from "../Accordion";

export default function ComplianceRateFieldBox() {
    let [requiredElements, setRequiredElements] = useState(0);
    requiredElements = Number(requiredElements);
    let [placedElements, setPlacedElements] = useState(0);
    placedElements = Number(placedElements);

    // Calculating and formatting compliance % -------------------------------------------------------------
    const compliancePercentage = ((placedElements / requiredElements) * 100).toFixed(2);
    const compliancePercentageString = compliancePercentage + " %";

    return (
        <FieldBox
            title="Respect des consignes"
            fields={[
                <InputField
                    setter={setRequiredElements}
                    type="number"
                    label="Nbr exigé"
                    small={true}
                    min="0"
                    key="1"
                />,
                <InputField
                    setter={setPlacedElements}
                    type="number"
                    label="Nbr effectué"
                    small={true}
                    min="0"
                    key="2"
                />,
                <OutputField label="Pourcentage" key="3" />,
                <Accordion title="Options" key="4" />,
            ]}
        />
    );
}
