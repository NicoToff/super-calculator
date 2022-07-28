import logo from "./img/logo.svg";
import "./css/App.css";
import "./css/solarBootswtach.min.css";

import { ErrorRateFieldBox, ComplianceRateFieldBox } from "./components/composite/CompositeFieldBox.js";

export default function App() {
    return (
        <div className="App">
            <header className="App-header">
                <h1>Super React Calculator</h1>
                <img src={logo} className="App-logo" alt="React logo" />
                <div className="container">
                    <div className="row">
                        <ErrorRateFieldBox />
                        <ComplianceRateFieldBox />
                    </div>
                </div>
            </header>
        </div>
    );
}
