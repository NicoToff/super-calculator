import "../css/solarBootswtach.min.css";

export default function Button({
    text = "Button",
    color = "primary",
    otherClasses = "",
    type = "button",
    onClick = undefined,
    disabled = false,
}) {
    const classesTotal = "btn " + ("btn-" + color) + " " + otherClasses;
    return (
        <button className={classesTotal} type={type} onClick={onClick} disabled={disabled}>
            {text}
        </button>
    );
}
