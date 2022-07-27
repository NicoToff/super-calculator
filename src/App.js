import logo from "./img/logo.svg";
import "./css/App.css";
import "./css/solarBootswtach.min.css";
import { InputField, OutputField } from "./components/Fields.js";
import { useState } from "react";
import FieldBox from "./components/FieldBox.js";

export default function App() {
    let [nbrWords, setNbrWords] = useState(0);
    let [nbrErrors, setNbrErrors] = useState(0);
    nbrWords = Number(nbrWords);
    nbrErrors = Number(nbrErrors);

    let errorPercentageOutputField;
    if (nbrWords < nbrErrors) {
        errorPercentageOutputField = (
            <OutputField value={"Erreur"} type="text" label="% erreurs" classes="is-invalid" />
        );
    } else if (nbrWords <= 0) {
        errorPercentageOutputField = (
            <OutputField value={"Entrez les valeurs"} type="text" label="% erreurs" />
        );
    } else {
        errorPercentageOutputField = (
            <OutputField
                value={((nbrErrors / nbrWords) * 100).toFixed(2) + " %"}
                type="text"
                label="% erreurs"
                classes="is-valid"
            />
        );
    }

    return (
        <div className="App">
            <header className="App-header">
                <h1>Super React Calculator</h1>
                <img src={logo} className="App-logo" alt="React logo" />
                <FieldBox
                    title="Pourcentage d'erreurs"
                    fields={[
                        <InputField setter={setNbrWords} type="number" label="Nbr mots" small={true} />,
                        <InputField setter={setNbrErrors} type="number" label="Nbr erreurs" small={true} />,
                        errorPercentageOutputField,
                    ]}
                />
            </header>
        </div>
    );
}
