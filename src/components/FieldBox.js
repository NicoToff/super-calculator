import "../css/solarBootswtach.min.css";

export default function FieldBox({ fields, title = "FieldBoxTitle" }) {
    return (
        <div className="form-group border rounded p-3">
            <h2>{title}</h2>
            {fields}
        </div>
    );
}
