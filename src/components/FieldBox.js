import "../css/solarBootswtach.min.css";

export default function FieldBox({ fields, title = "FieldBoxTitle" }) {
    return (
        <div className="form-group border rounded p-3 m-1 col-sm">
            <h2>{title}</h2>
            {fields}
        </div>
    );
}
