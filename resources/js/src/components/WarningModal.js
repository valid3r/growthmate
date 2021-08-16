import React from 'react'
import './modal.css'

const WarningModal = () => {
  return (
    <div
      className="modal"
      id="warningModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content middle-modal">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Warning
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Please add or select a Macro first!</div>
          <div className="modal-footer">
            <button
              type="button"
              type="button"
              className="btn btn-falcon-default"
              data-bs-dismiss="modal"
            >
              Ok
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WarningModal
