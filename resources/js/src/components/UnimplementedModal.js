import React from 'react'
import './modal.css'

const UnimplementedModal = () => {
  return (
    <div
      className="modal"
      id="UnimplementedModal"
      tabIndex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content middle-modal">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">
              Unimplemented
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">Currently not implemented.</div>
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

export default UnimplementedModal
