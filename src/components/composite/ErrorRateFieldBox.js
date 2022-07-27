import "../../css/solarBootswtach.min.css";
import { InputField, OutputField } from "../Fields.js";
import { useState } from "react";
import FieldBox from "../FieldBox.js";
import Accordion from "../Accordion.js";

export default function ErrorRateFieldBox() {
    let [nbrWords, setNbrWords] = useState(0);
    nbrWords = Number(nbrWords);
    let [nbrErrors, setNbrErrors] = useState(0);
    nbrErrors = Number(nbrErrors);
    let [optionMaxGrade, setOptionMaxGrade] = useState(10);
    optionMaxGrade = Number(optionMaxGrade);

    // Calculating and formatting error % ------------------------------------------------------------------
    const errorPercentage = ((nbrErrors / nbrWords) * 100).toFixed(2);
    const errorPercentageString = errorPercentage + " %";
    // Building OutputField dynamically --------------------------------------------------------------------
    let errorPercentageOutputField;
    const [epofLabel, epofKey] = ["% erreurs", "3"];
    // Calculating and formatting grading out of 10, initially ---------------------------------------------
    // This value can be dynamically changed with the Option field -----------------------------------------
    const parsing = (10 - Number(errorPercentage)) * (optionMaxGrade / 10);
    const grade = parsing >= 0 ? parsing : 0;
    const gradeString = isFloat(grade)
        ? grade.toFixed(2) + " / " + optionMaxGrade
        : grade + " / " + optionMaxGrade;
    let gradeOutputField;
    const [gofLabel, gofKey] = ["Résultat sur " + optionMaxGrade, "4"];

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
                value={errorPercentageString}
                type="text"
                label={epofLabel}
                classes="is-valid"
                key={epofKey}
            />
        );
        gradeOutputField = (
            <OutputField value={gradeString} type="text" label={gofLabel} classes="is-valid" key={gofKey} />
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
                            setter={setOptionMaxGrade}
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

/**
 * Checks if a value is a float
 * @param {any} n
 * @returns {boolean} true if the argument is a non-integer number
 */
function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}
