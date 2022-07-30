import "../../css/solarBootswtach.min.css";
import { InputField, OutputField } from "../Fields.js";
import { useState } from "react";
import FieldBox from "../FieldBox.js";
import Accordion from "../Accordion.js";

export function ErrorRateFieldBox() {
    let [nbrWords, setNbrWords] = useState(0);
    nbrWords = Number(nbrWords);
    let [nbrErrors, setNbrErrors] = useState(0);
    nbrErrors = Number(nbrErrors);
    let [maxGrade, setMaxGrade] = useState(10);
    maxGrade = Number(maxGrade);

    // Calculating and formatting error % ------------------------------------------------------------------
    let errorPercentage = ((nbrErrors / nbrWords) * 100).removeTrailingZeros(2);

    // Building OutputField dynamically --------------------------------------------------------------------
    let errorPercentageOutputField;
    const [epofLabel, epofKey] = ["% erreurs", "3"];
    // Calculating and formatting grading out of 10, initially ---------------------------------------------
    // This value can be dynamically changed with the Option field -----------------------------------------
    let grade = ((10 - errorPercentage) * (maxGrade / 10)).removeTrailingZeros(2);
    if (grade <= 0) {
        grade = 0; // Setting min grade at 0
    }
    let gradeOutputField;
    const [gofLabel, gofKey] = ["Résultat sur " + maxGrade, "4"];

    // Conditionnally renders OutputFields based on the validity of the InputField states ------------------
    if (nbrWords < nbrErrors || nbrWords < 0 || nbrErrors < 0) {
        errorPercentageOutputField = (
            <OutputField value="Erreur" type="text" label={epofLabel} classes="is-invalid" key={epofKey} />
        );
        gradeOutputField = (
            <OutputField value="Erreur" type="text" label={gofLabel} classes="is-invalid" key={gofKey} />
        );
    } else if (nbrWords === 0) {
        errorPercentageOutputField = (
            <OutputField value="Entrez les valeurs" type="text" label={epofLabel} key={epofKey} />
        );
        gradeOutputField = (
            <OutputField value="Entrez les valeurs" type="text" label={gofLabel} key={gofKey} />
        );
    } else {
        errorPercentageOutputField = (
            <OutputField
                value={errorPercentage + " %"}
                type="text"
                label={epofLabel}
                classes="is-valid"
                key={epofKey}
            />
        );
        gradeOutputField = (
            <OutputField
                value={grade + " / " + maxGrade}
                type="text"
                label={gofLabel}
                classes="is-valid"
                key={gofKey}
            />
        );
    }

    return (
        <FieldBox
            title="Pourcentage d'erreurs"
            fields={[
                <InputField
                    setter={setNbrWords}
                    type="number"
                    label="Nbr mots"
                    small={true}
                    key="1"
                    min="0"
                />,
                <InputField
                    setter={setNbrErrors}
                    type="number"
                    label="Nbr erreurs"
                    small={true}
                    key="2"
                    min="0"
                />,
                errorPercentageOutputField,
                gradeOutputField,
                <Accordion
                    title="Options"
                    body={
                        <InputField
                            setter={setMaxGrade}
                            type="number"
                            label="Résultat sur ..."
                            defaultValue="10"
                            min="1"
                            key="6"
                        />
                    }
                    key="5"
                />,
            ]}
        />
    );
}

export function ComplianceRateFieldBox() {
    let [requiredElements, setRequiredElements] = useState(0);
    requiredElements = Number(requiredElements);
    let [placedElements, setPlacedElements] = useState(0);
    placedElements = Number(placedElements);

    // Calculating and formatting compliance % -------------------------------------------------------------
    const compliancePercentage = ((placedElements / requiredElements) * 100).toFixed(2);
    const compliancePercentageString = compliancePercentage + " %";

    // Building OutputField dynamically --------------------------------------------------------------------
    let complianceRateOutputField;
    const [crofLabel, crofKey] = ["Respecté à ... %", "3"];

    // Conditionnally renders OutputFields based on the validity of the InputField states ------------------
    if (requiredElements < placedElements || requiredElements < 0 || placedElements < 0) {
        complianceRateOutputField = (
            <OutputField value="Erreur" type="text" label={crofLabel} classes="is-invalid" key={crofKey} />
        );
    } else if (requiredElements === 0) {
        complianceRateOutputField = (
            <OutputField value="Entrez les valeurs" type="text" label={crofLabel} key={crofKey} />
        );
    } else {
        complianceRateOutputField = (
            <OutputField
                value={compliancePercentageString}
                type="text"
                label={crofLabel}
                classes="is-valid"
                key={crofKey}
            />
        );
    }

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
                complianceRateOutputField,
                <Accordion title="Options" key="4" />,
            ]}
        />
    );
}

/**
 * Checks if a value is a float
 * @param {any} n
 * @returns {boolean} true if the argument is a non-integer number
 */
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

Number.prototype.removeTrailingZeros = function (accuracy = null) {
    let num = Number(this.valueOf());
    if (isNaN(num)) {
        return this.valueOf();
    } else {
        return isFloat(num) && accuracy != null ? num.toFixed(accuracy) : num;
    }
};
