import { useState } from "react";
import "./styles.scss";

export const SupportCreator = () => {
    const defaultMessageCopy = "Clique para copiar";
    const [open, setOpen] = useState(false);
    const [messageCopy, setMessageCopy] = useState(defaultMessageCopy);
    const pix = "71a41299-888a-4802-8f9d-14d395c7cb10";

    const handleCopy = () => {
        navigator.clipboard.writeText(pix);
        setMessageCopy("Copiado com sucesso!");
    };

    return (
        <div className="wrapper">
            <small
                onMouseEnter={() => setOpen((prev) => !prev)}
                onTouchStart={() => setOpen((prev) => !prev)}
                className="text"
            >
                Apoiar o criador deste site (passe o mouse)
            </small>

            <dialog
                open={open}
                onClick={handleCopy}
                onMouseLeave={() => setMessageCopy(defaultMessageCopy)}
                className="tooltip"
            >
                Pix: {pix}
                <span className="tooltipText">{messageCopy}</span>
            </dialog>
        </div>
    );
};
