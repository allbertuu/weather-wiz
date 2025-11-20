import { useState } from 'react';
import styles from './styles.module.scss';
import { pix } from '../../my-data';

const SupportCreator: React.FC<unknown> = () => {
  const defaultMessageCopy = 'Clique para copiar';
  const [open, setOpen] = useState(false);
  const [messageCopy, setMessageCopy] = useState(defaultMessageCopy);

  const handleCopy = () => {
    navigator.clipboard.writeText(pix.random);
    setMessageCopy('Copiado com sucesso!');
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
        Pix: {pix.random}
        <span className={styles.tooltipText}>{messageCopy}</span>
      </dialog>
    </div>
  );
};

export default SupportCreator;
