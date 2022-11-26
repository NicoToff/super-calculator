export default function FieldBox({ fields, title = "FieldBoxTitle", classes = undefined }) {
    return (
        <div className={classes}>
            <h2>{title}</h2>
            {fields}
        </div>
    );
}
