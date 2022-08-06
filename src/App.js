import logo from "./img/logo.svg";
import "./css/App.css";
import "./css/solarBootswtach.min.css";
import CalculatorDisplay from "./components/composite/CalculatorDisplay";

export default function App() {
    return (
        <div className="App">
            <nav className="App-navbar">
                <h1>Teacher Calculator</h1>
                <img src={logo} className="App-logo" alt="React logo" />
            </nav>
            <header className="App-body">
                <CalculatorDisplay />
            </header>
            <footer className="App-footer">Powered by React &amp; NicoToff</footer>
        </div>
    );
}
