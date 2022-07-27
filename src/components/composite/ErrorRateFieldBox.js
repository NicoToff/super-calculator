import "../../css/solarBootswtach.min.css";
import { InputField, OutputField } from "../Fields.js";
import { useState } from "react";
import FieldBox from "../FieldBox.js";

export default function ErrorRateFieldBox() {
    let [nbrWords, setNbrWords] = useState(0);
    nbrWords = Number(nbrWords);
    let [nbrErrors, setNbrErrors] = useState(0);
    nbrErrors = Number(nbrErrors);

    // Calculating and formatting error % ------------------------------------------------------------------
    const errorPercentage = ((nbrErrors / nbrWords) * 100).toFixed(2);
    const errorPercentageString = errorPercentage + " %";
    let errorPercentageOutputField;
    const [epofLabel, epofKey] = ["% erreurs", "3"];
    // Calculating and formatting grading out of 10 --------------------------------------------------------
    const parsing = 10 - Number(errorPercentage);
    const grading = parsing >= 0 ? parsing : 0;
    const gradingString = isFloat(grading) ? grading.toFixed(2) + " / 10" : grading + " / 10";
    let gradingOutputField;
    const [gofLabel, gofKey] = ["Résultat sur 10", "4"];

    // Conditionnally renders OutputFields based on the validity of the InputField states ------------------
    if (nbrWords < nbrErrors || nbrWords < 0 || nbrErrors < 0) {
        errorPercentageOutputField = (
            <OutputField value="Erreur" type="text" label={epofLabel} classes="is-invalid" key={epofKey} />
        );
        gradingOutputField = (
            <OutputField value="Erreur" type="text" label={gofLabel} classes="is-invalid" key={gofKey} />
        );
    } else if (nbrWords <= 0) {
        errorPercentageOutputField = (
            <OutputField value="Entrez les valeurs" type="text" label={epofLabel} key={epofKey} />
        );
        gradingOutputField = (
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
        gradingOutputField = (
            <OutputField value={gradingString} type="text" label={gofLabel} classes="is-valid" key={gofKey} />
        );
    }

    return (
        <FieldBox
            title="Pourcentage d'erreurs"
            fields={[
                <InputField setter={setNbrWords} type="number" label="Nbr mots" small={true} key="1" />,
                <InputField setter={setNbrErrors} type="number" label="Nbr erreurs" small={true} key="2" />,
                errorPercentageOutputField,
                gradingOutputField,
            ]}
        />
    );
}

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}
