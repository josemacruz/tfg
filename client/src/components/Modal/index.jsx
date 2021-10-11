import { Modal } from '@material-ui/core';
import './styles.scss';

function CustomModal({
  open, onClose, children,
}) {
  return (
    <Modal
      open={open}
      onClose={onClose}
    >
      <div className="modalContainer">
          {children}
      </div>
    </Modal>
  );
}

export default CustomModal;
