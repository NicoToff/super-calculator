import "../css/solarBootswtach.min.css";

export function InputField({ setter, type, label = "Input", small = false }) {
    let labelClasses = "col-form-label";
    let inputClasses = "form-control";
    small && (labelClasses += " col-form-label-sm") && (inputClasses += " form-control-sm");
    return (
        <div>
            <label className={labelClasses}>
                {label}
                <input onChange={event => setter(event.target.value)} type={type} className={inputClasses} />
            </label>
        </div>
    );
}

export function OutputField({ value, type, label = "Output", classes = "" }) {
    let classesTotal = "form-control " + classes;

    return (
        <div>
            <label className="form-label">
                {label}
                <input value={value} type={type} className={classesTotal} readOnly />
            </label>
        </div>
    );
}
