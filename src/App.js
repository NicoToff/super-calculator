import logo from "./logo.svg";
import "./App.css";
import "./css/solarBootswtach.min.css";
import { InputField, OutputField } from "./hooks/Fields.js";
import { useState } from "react";

export default function App() {
    let [nbrWords, setNbrWords] = useState(0);
    let [nbrErrors, setNbrErrors] = useState(0);
    nbrWords = Number(nbrWords);
    nbrErrors = Number(nbrErrors);

    let outputField;
    if (nbrWords < nbrErrors) {
        outputField = <OutputField value={"Erreur"} type="text" label="% erreurs" classes="is-invalid" />;
    } else if (nbrWords <= 0) {
        outputField = <OutputField value={"Entrez les valeurs"} type="text" label="% erreurs" />;
    } else {
        outputField = (
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
                <div className="form-group">
                    <h2>Pourcentage d'erreurs</h2>
                    <InputField setter={setNbrWords} type="number" label="Nbr mots" small={true} />
                    <InputField setter={setNbrErrors} type="number" label="Nbr erreurs" small={true} />
                    {outputField}
                </div>
            </header>
        </div>
    );
}
