import logo from "../public/img/logo.svg";
import Image from "next/image";

import CalculatorDisplay from "../components/composite/CalculatorDisplay";

export default function App() {
    return (
        <div className="App">
            <nav className="App-navbar">
                <h1>Teacher Calculator</h1>
                <Image src={logo} className="App-logo" alt="React logo" />
            </nav>
            <header className="App-body">
                <CalculatorDisplay />
            </header>
            <footer className="App-footer">Powered by React &amp; NicoToff</footer>
        </div>
    );
}
