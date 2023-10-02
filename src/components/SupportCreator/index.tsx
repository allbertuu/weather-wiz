import { useState } from "react";
import styles from "./styles.module.scss";

const SupportCreator: React.FC<any> = () => {
    const defaultMessageCopy = "Clique para copiar";
    const [open, setOpen] = useState(false);
    const [messageCopy, setMessageCopy] = useState(defaultMessageCopy);
    const pix = "71a41299-888a-4802-8f9d-14d395c7cb10";

    const handleCopy = () => {
        navigator.clipboard.writeText(pix);
        setMessageCopy("Copiado com sucesso!");
    };

    return (
        <div className={styles.container}>
            <small
                onMouseEnter={() => setOpen((prev) => !prev)}
                onTouchStart={() => setOpen((prev) => !prev)}
                className={styles.text}
            >
                Apoiar o criador deste site (passe o mouse)
            </small>

            <dialog
                open={open}
                onClick={handleCopy}
                onMouseLeave={() => setMessageCopy(defaultMessageCopy)}
                className={styles.tooltip}
            >
                Pix: {pix}
                <span className={styles.tooltipText}>{messageCopy}</span>
            </dialog>
        </div>
    );
};

export default SupportCreator;
