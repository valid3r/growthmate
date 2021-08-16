import './modal.css'

const ConfirmDeleteModal = (props) => {
  return (
    <div
      className="modal"
      id="confirmDeleteModal"
      tabIndex="-1"
      aria-labelledby="confirmDeleteModal"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content middle-modal">
          <div className="modal-header">
            <h5 className="modal-title" id="confirmDeleteModal">
              DELETE GOAL
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            Are you sure you want to delete <strong>{props.deleteTitle}</strong>
            ?
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-falcon-default"
              data-bs-dismiss="modal"
            >
              Cancel
            </button>
            <button
              type="button"
              className="btn btn btn-falcon-danger"
              id="deleteGoalButton"
              onClick={() => props.deleteGoal()}
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDeleteModal
