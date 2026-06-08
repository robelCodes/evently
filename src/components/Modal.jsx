import ReactDOM from 'react-dom'




function Modal({ title, message, onConfirm, onCancel }) {
  return ReactDOM.createPortal(
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <h3>{title}</h3>
        <p>{message}</p>
        <div className="modal-actions">
          <button className="btn btn-outline" onClick={onCancel}>
            Keep Booking
          </button>
          <button
            className="btn"
            style={{ background: 'var(--error)', color: 'white' }}
            onClick={onConfirm}
          >
            Yes, Cancel
          </button>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')  
  )
}

export default Modal