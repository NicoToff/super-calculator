import logo from "./img/logo.svg";
import "./css/App.css";
import "./css/solarBootswtach.min.css";

import { ErrorRateFieldBox, ComplianceRateFieldBox } from "./components/composite/CompositeFieldBox.js";

export default function App() {
    const cssClasses = "border rounded p-3 m-1 col-sm";
    const newRow = () => (
        <Row
            children={[
                <ErrorRateFieldBox classes={cssClasses} key={generateUUID()} />,
                <ComplianceRateFieldBox classes={cssClasses} key={generateUUID()} />,
            ]}
            key={generateUUID()}
        />
    );
    const [boxList, setBoxList] = useState([newRow()]);
    const addBoxes = () => {
        setBoxList(boxList.concat(newRow()));
    };

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
