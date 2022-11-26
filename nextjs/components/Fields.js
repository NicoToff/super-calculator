export function InputField({
    setter,
    type,
    label = "Input",
    small = false,
    defaultValue = "",
    min = null,
    max = null,
}) {
    let labelClasses = "col-form-label";
    let inputClasses = "form-control";
    small && (labelClasses += " col-form-label-sm") && (inputClasses += " form-control-sm");
    return (
        <div>
            <label className={labelClasses}>
                {label}
                <input
                    onChange={event => {
                        let value = Number(event.target.value);
                        // Dynamically enforces the value if min and/or max are set
                        if (min != null && value < Number(min)) {
                            value = Math.max(Number(min), Math.min(Number(min), value));
                            event.target.value = value;
                        }
                        if (max != null && value > Number(max)) {
                            value = Math.min(Number(max), Math.max(Number(max), value));
                            event.target.value = value;
                        }
                        setter(value);
                    }}
                    type={type}
                    className={inputClasses}
                    defaultValue={defaultValue}
                    min={min}
                    max={max}
                />
            </label>
        </div>
    );
}

export function OutputField({ value, type, label = "Output", classes = "" }) {
    let classesTotal = `form-control ${classes}`;

    return (
        <div>
            <label className="form-label">
                {label}
                <input value={value} type={type} className={classesTotal} readOnly />
            </label>
        </div>
    );
}
