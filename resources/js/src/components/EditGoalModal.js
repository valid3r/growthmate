import React, { useState, useEffect } from 'react'
import './ContentHeader.css'
import API from '../API'
import './modal.css'
import DatePicker from 'react-date-picker'

const EditGoalModal = (props) => {
  const [loading, setLoading] = useState(false)

  /**
   * Helper function to submit the form
   * Needed in order to check if input is empty
   * @param {event} e
   */
  const editGoal = function (e) {
    onEditSubmit()
    e.preventDefault()
  }

  /**
   * Ctr + Enter Event Listener
   * Clicks the submit button when ctrl + enter is pressed
   * @param {event} e
   */
  const enterSubmit = (e) => {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
      console.log('Add Clicked!')
      document.getElementById('editButton').click()
    }
  }

  /**
   * Sends an Axios PUT request to add a new Macro
   *
   */
  const onEditSubmit = async () => {
    setLoading(true)
    const title = props.title
    const description = props.description
    const priority = props.priority
    const status = props.status
    const dueDate = props.dueDate
    const correctDate = dueDate.toLocaleDateString('de-DE')

    try {
      await API.updateGoal(props.id, {
        title,
        description,
        status,
        priority,
        correctDate,
      })
    } catch (error) {
      alert('Failed to edit goal!')
    } finally {
      setLoading(false)

      console.log('Success!')

      // Fetch posts
      props.fetchGoals()

      // Reset inputs
      props.goalTitleSetter('')
      props.goalDescriptionSetter('')
      props.goalPrioritySetter('')
      props.goalStatusSetter('')
      props.goalDueDateSetter('')

      // Hide modal
      $('#editGoalModal').modal('hide')
    }
  }

  return (
    <div
      className="modal "
      id="editGoalModal"
      tabIndex="-1"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content border mt-6 rounded-0">
          <form id="editGoalForm" autoComplete="off" onSubmit={editGoal}>
            <div className="modal-header px-card bg-light border-bottom-0">
              <h5 className="modal-title">Edit Goal</h5>
              <button
                className="btn-close me-n1"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-card">
              <div className="mb-3">
                <label className="fs-0" htmlFor="editGoalTitle">
                  Title
                </label>
                <input
                  className="form-control"
                  id="editGoalTitle"
                  type="text"
                  name="title"
                  required="required"
                  value={props.title}
                  onChange={(e) => props.goalTitleSetter(e.target.value)}
                  onKeyDown={(e) => enterSubmit(e)}
                />
              </div>

              <div style={{ display: 'block' }} className="mb-3">
                <label className="fs-0" htmlFor="addGoalEndDate">
                  Due Date
                </label>

                <DatePicker
                  onChange={props.goalDueDateSetter}
                  value={props.dueDate}
                  className={'form-control px-2'}
                  format={'dd.MM.y'}
                  locale={'de-DE'}
                />
              </div>

              <div className="mb-3">
                <label className="fs-0" htmlFor="editGoalDescription">
                  Description
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  required="required"
                  name="description"
                  id="editGoalDescription"
                  value={props.description}
                  onChange={(e) => props.goalDescriptionSetter(e.target.value)}
                  onKeyDown={(e) => enterSubmit(e)}
                ></textarea>
              </div>

              <div style={{ display: 'block' }} className="mb-3 ">
                <label className="fs-0" htmlFor="editPriority">
                  Priority
                </label>
                <select
                  className="form-select"
                  id="editPriority"
                  name="editPriority"
                  value={props.priority}
                  onChange={(e) => props.goalPrioritySetter(e.target.value)}
                >
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>

              <div style={{ display: 'block' }} className="mb-3 ">
                <label className="fs-0" htmlFor="editStatus">
                  Status
                </label>
                <select
                  className="form-select"
                  id="editStatus"
                  name="editStatus"
                  value={props.status}
                  onChange={(e) => props.goalStatusSetter(e.target.value)}
                >
                  <option value="ONHOLD">ONHOLD</option>
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>

              <div className="mb-0" style={{ display: 'none' }}>
                <label className="fs-0 mb-0" htmlFor="editGoalLabel">
                  Members
                </label>

                <hr className="mb-0 mt-0 navbar-vertical-divider" />

                <span className="mt-2 py-2 mx-0 badge badge-soft-success badge-pill">
                  Sergio Bazelli
                </span>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-end align-items-center bg-light">
              <button
                type="button"
                className="btn btn-falcon-default me-2 mb-1"
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                className="btn btn-falcon-primary me-0 mb-1"
                type="submit"
                disabled={loading}
                id="editButton"
              >
                {loading ? 'Loading' : 'Save'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default EditGoalModal
