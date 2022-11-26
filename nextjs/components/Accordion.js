let counter = 0;

export default function Accordion({ title = "Accordion", body = "Content" }) {
    counter++;
    return (
        <div className="accordion" id={`accordion${counter}`}>
            <div className="accordion-item">
                <h2 className="accordion-header" id={`heading${counter}`}>
                    <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target={`#collapse${counter}`}
                        aria-expanded="false"
                        aria-controls={`collapse${counter}`}
                    >
                        {title}
                    </button>
                </h2>
                <div
                    id={`collapse${counter}`}
                    className="accordion-collapse collapse "
                    aria-labelledby={`heading${counter}`}
                    data-bs-parent={`#accordion${counter}`}
                >
                    <div className="m-1">{body}</div>
                </div>
            </div>
        </div>
    );
}
