import "../../css/solarBootswtach.min.css";
import { InputField, OutputField } from "../Fields.js";
import { useState } from "react";
import FieldBox from "../FieldBox.js";
import Accordion from "../Accordion.js";
import { generateUUID } from "../../helperFunctions.js";

export function ErrorRateFieldBox() {
    let [nbrWords, setNbrWords] = useState(0);
    nbrWords = Number(nbrWords);
    let [nbrErrors, setNbrErrors] = useState(0);
    nbrErrors = Number(nbrErrors);
    let [maxGrade, setMaxGrade] = useState(10);
    maxGrade = Number(maxGrade);

    //#region Input Fields
    const nbrWordsInputField = (
        <InputField
            setter={setNbrWords}
            type="number"
            label="Nbr mots"
            small={true}
            key={generateUUID()}
            min="0"
        />
    );
    const nbrErrorsInputField = (
        <InputField
            setter={setNbrErrors}
            type="number"
            label="Nbr erreurs"
            small={true}
            key={generateUUID()}
            min="0"
        />
    );
    const maxGradeInputField = (
        <InputField
            setter={setMaxGrade}
            type="number"
            label="Résultat sur ..."
            defaultValue="10"
            min="1"
            key={generateUUID()}
        />
    );
    //#endregion

    const errorPercentage = {
        value: ((nbrErrors / nbrWords) * 100).removeTrailingZeros(2),
        label: "% erreurs",
        key: generateUUID(),
    };

    const grade = {
        value: ((10 - errorPercentage.value) * (maxGrade / 10)).removeTrailingZeros(2),
        label: "Résultat sur " + maxGrade,
        key: generateUUID(),
    };

    if (grade.value < 0) {
        grade.value = 0; // Setting min grade at 0
    }

    //#region Output field
    // Building OutputField dynamically --------------------------------------------------------------------
    // Conditionnally renders OutputFields based on the validity of the InputField states ------------------

    /* ERROR case */ if (nbrWords < nbrErrors || nbrWords < 0 || nbrErrors < 0) {
        errorPercentage.OutputField = (
            <OutputField
                value="Erreur"
                type="text"
                label={errorPercentage.label}
                classes="is-invalid"
                key={errorPercentage.key}
            />
        );
        grade.OutputField = (
            <OutputField
                value="Erreur"
                type="text"
                label={grade.label}
                classes="is-invalid"
                key={grade.key}
            />
        );
    } /* Load page case */ else if (nbrWords === 0) {
        errorPercentage.OutputField = (
            <OutputField
                value="Entrez les valeurs"
                type="text"
                label={errorPercentage.label}
                key={errorPercentage.key}
            />
        );
        grade.OutputField = (
            <OutputField value="Entrez les valeurs" type="text" label={grade.label} key={grade.key} />
        );
    } /* Correct input case */ else {
        errorPercentage.OutputField = (
            <OutputField
                value={errorPercentage.value + " %"}
                type="text"
                label={errorPercentage.label}
                classes="is-valid"
                key={errorPercentage.key}
            />
        );
        grade.OutputField = (
            <OutputField
                value={grade.value + " / " + maxGrade}
                type="text"
                label={grade.label}
                classes="is-valid"
                key={grade.key}
            />
        );
    }
    //#endregion

    return (
        <FieldBox
            title="Pourcentage d'erreurs"
            fields={[
                nbrWordsInputField,
                nbrErrorsInputField,
                errorPercentage.OutputField,
                grade.OutputField,
                <Accordion title="Options" body={maxGradeInputField} key={generateUUID()} />,
            ]}
        />
    );
}

export function ComplianceRateFieldBox() {
    let [requiredElements, setRequiredElements] = useState(0);
    requiredElements = Number(requiredElements);
    let [placedElements, setPlacedElements] = useState(0);
    placedElements = Number(placedElements);

    //#region Input Fields
    const requiredElementsInputField = (
        <InputField
            setter={setRequiredElements}
            type="number"
            label="Nbr exigé"
            small={true}
            min="0"
            key={generateUUID()}
        />
    );
    const placedElementsInputField = (
        <InputField
            setter={setPlacedElements}
            type="number"
            label="Nbr effectué"
            small={true}
            min="0"
            key={generateUUID()}
        />
    );
    //#endregion

    const complianceRate = {
        value: ((placedElements / requiredElements) * 100).removeTrailingZeros(2),
        label: "Respecté à ... %",
        key: generateUUID(),
    };

    //#region Output field
    // Building OutputField dynamically --------------------------------------------------------------------
    // Conditionnally renders OutputFields based on the validity of the InputField states ------------------
    /* Error case */ if (requiredElements < placedElements || requiredElements < 0 || placedElements < 0) {
        complianceRate.OutputField = (
            <OutputField
                value="Erreur"
                type="text"
                label={complianceRate.label}
                classes="is-invalid"
                key={complianceRate.key}
            />
        );
    } /* Page load case */ else if (requiredElements === 0) {
        complianceRate.OutputField = (
            <OutputField
                value="Entrez les valeurs"
                type="text"
                label={complianceRate.label}
                key={complianceRate.key}
            />
        );
    } /* Correct input case */ else {
        complianceRate.OutputField = (
            <OutputField
                value={complianceRate.value + " %"}
                type="text"
                label={complianceRate.label}
                classes="is-valid"
                key={complianceRate.key}
            />
        );
    }
    //#endregion

    return (
        <FieldBox
            title="Respect des consignes"
            fields={[requiredElementsInputField, placedElementsInputField, complianceRate.OutputField]}
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

/**
 * Removes trailing zeroes on a number.
 * @param {number} accuracy (Optional) Sets the max number of decimal digits (same as Number.prototype.toFixed())
 * @returns {number} The number
 */
Number.prototype.removeTrailingZeros = function (accuracy = null) {
    const num = this.valueOf();
    return isFloat(num) && accuracy != null ? num.toFixed(accuracy) : num;
};
