import "../../css/solarBootswtach.min.css";
import { InputField, OutputField } from "../Fields.js";
import { useState } from "react";
import FieldBox from "../FieldBox.js";
import Accordion from "../Accordion.js";

export function ErrorRateFieldBox({ classes = undefined }) {
    let [nbrWords, setNbrWords] = useState(0);
    nbrWords = Number(nbrWords);
    let [nbrErrors, setNbrErrors] = useState(0);
    nbrErrors = Number(nbrErrors);
    let [maxGrade, setMaxGrade] = useState(10);
    maxGrade = Number(maxGrade);
    let [penaltyPercent, setPenaltyPercent] = useState(0);
    penaltyPercent = Number(penaltyPercent);
    let [penaltySubtract, setPenaltySubtract] = useState(0);
    penaltySubtract = Number(penaltySubtract);

    //#region Input Fields
    const nbrWordsInputField = (
        <InputField setter={setNbrWords} type="number" label="Nbr mots" small={true} key="1" min="0" />
    );
    const nbrErrorsInputField = (
        <InputField setter={setNbrErrors} type="number" label="Nbr erreurs" small={true} key="2" min="0" />
    );
    /* Field found under "Options" */
    const maxGradeInputField = (
        <InputField
            setter={setMaxGrade}
            type="number"
            label="Résultat sur ..."
            defaultValue="10"
            min="1"
            key="6"
        />
    );
    const penaltyPercentInputField = (
        <InputField
            setter={setPenaltyPercent}
            type="number"
            label="Malus sur la note (en %)"
            defaultValue="0"
            min="0"
            max="100"
            key="7"
        />
    );
    const penaltySubtractInputField = (
        <InputField
            setter={setPenaltySubtract}
            type="number"
            label={`Malus soustrait (en %)`}
            defaultValue="0"
            min="0"
            max={maxGrade}
            key="8"
        />
    );
    //#endregion

    const errorPercentage = {
        value: makePercentage(nbrErrors, nbrWords, 2),
        label: "% erreurs",
        key: "3",
    };

    const grade = {
        value: (
            (10 - errorPercentage.value) * (maxGrade / 10) * (1 - penaltyPercent / 100) -
            (penaltySubtract / 100) * maxGrade
        ).removeTrailingZeroes(2),
        label: `Résultat sur ${maxGrade}`,
        key: "4",
    };

    if (grade.value < 0) {
        grade.value = 0; // Min grade cannot be lower than 0
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
                value={`${errorPercentage.value} %`}
                type="text"
                label={errorPercentage.label}
                classes="is-valid"
                key={errorPercentage.key}
            />
        );
        grade.OutputField = (
            <OutputField
                value={`${grade.value} / ${maxGrade}`}
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
                <Accordion
                    title="Options"
                    body={[maxGradeInputField, penaltyPercentInputField, penaltySubtractInputField]}
                    key="5"
                />,
            ]}
            classes={classes}
        />
    );
}

export function ComplianceRateFieldBox({ classes = undefined }) {
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
            key="1"
        />
    );
    const placedElementsInputField = (
        <InputField
            setter={setPlacedElements}
            type="number"
            label="Nbr effectué"
            small={true}
            min="0"
            key="2"
        />
    );
    //#endregion

    const complianceRate = {
        value: makePercentage(placedElements, requiredElements, 2),
        label: "Respecté à ... %",
        key: "3",
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
                value={`${complianceRate.value} %`}
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
            classes={classes}
        />
    );
}

//#region Functions & methods
/**
 * Checks if a value is a float
 * @param {any} n
 * @returns {boolean} true if the argument is a non-integer number
 */
const isFloat = n => Number(n) === n && n % 1 !== 0;

/**
 * Removes trailing zeroes on a number.
 * @param {number} precision (Optional) Sets the max number of decimal digits (same as Number.prototype.toFixed())
 * @returns {number} The number
 */
Number.prototype.removeTrailingZeroes = function (precision = null) {
    let num;
    // Removes insignificant digits from the start if precision is not null; this avoids x.00% being displayed
    precision != null ? (num = Number(this.valueOf().toFixed(precision))) : (num = this.valueOf());
    return isFloat(num) && precision != null ? num.toFixed(precision) : num;
};

const normalize = (value, reference) => value / reference;

const makePercentage = (value, reference, precision = 20) =>
    Number((normalize(value, reference) * 100).removeTrailingZeroes(precision));

//#endregion
