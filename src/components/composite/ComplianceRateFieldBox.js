import "../../css/solarBootswtach.min.css";
import { InputField, OutputField } from "../Fields.js";
import { useState } from "react";
import FieldBox from "../FieldBox.js";
import Accordion from "../Accordion";

export default function ComplianceRateFieldBox() {
    let [requiredElements, setRequiredElements] = useState(0);
    let [placedElements, setPlacedElements] = useState(0);

    return (
        <FieldBox
            title="Respect des consignes"
            fields={[
                <InputField label="Nbr exigé" small={true} key="1" />,
                <InputField label="Nbr effectué" small={true} key="2" />,
                <OutputField label="Pourcentage" key="3" />,
                <Accordion title="Options" key="4" />,
            ]}
        />
    );
}
