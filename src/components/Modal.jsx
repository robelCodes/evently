import { createPortal } from 'react-dom'

const Modal = ({ title, message, onConfirm, onCancel }) => {
  return createPortal(
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onCancel}>
            Cancel
          </button>
          <button
            className="btn"
            style={{ background: 'var(--error)', color: 'white' }}
            onClick={onConfirm}
          >
            Yes, Cancel Booking
          </button>
        </div>
      </div>
    </div>,
    document.body  
  )
}

export default Modal