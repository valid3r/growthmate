import React, { useState } from 'react'
import API from '../API'
import './modal.css'
import DatePicker from 'react-date-picker'

const AddGoalModal = (props) => {
  const [loading, setLoading] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [dueDate, setDueDate] = useState(new Date())
  const [goalStatus, setGoalStatus] = useState('ONHOLD')
  const [priority, setPriority] = useState('MEDIUM')

  /**
   * Ctr + Enter Event Listener
   * Clicks the submit button when ctrl + enter is pressed
   * @param {event} e
   */
  function enterSubmit(e) {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
      console.log('Add Clicked!')
      document.getElementById('addGoalButton').click()
    }
  }

  /**
   * Helper function to submit the form
   * Needed in order to check if input is empty
   * @param {event} e
   */
  const addGoal = function (e) {
    onAddSubmit()
    e.preventDefault()
  }

  /**
   * Sends the Axios request to add a new Goal
   *
   */
  const onAddSubmit = async () => {
    const correctDate = dueDate.toLocaleDateString('de-DE')
    setLoading(true)
    try {
      await API.addGoal({
        title,
        description,
        correctDate,
        goalStatus,
        priority,
      }).catch(function (error) {
        console.log(error.config)
      })
    } catch (error) {
      console.log('Failed to add post!')
    } finally {
      setLoading(false)
      console.log('Success!')

      // Re-fetch goals
      props.fetchGoals()

      // Hide modal
      $('#addGoalModal').modal('hide')

      // Set values to default
      setTitle('')
      setDescription('')
      setPriority('MEDIUM')
      setDueDate(new Date())
      setGoalStatus('ONHOLD')
    }
  }

  return (
    <div
      className="modal"
      id="addGoalModal"
      tabIndex="-1"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content border mt-6 rounded-0">
          <form id="addGoalForm" autoComplete="off" onSubmit={addGoal}>
            <div className="modal-header px-card bg-light border-bottom-0">
              <h5 className="modal-title">New Goal</h5>
              <button
                className="btn-close me-n1"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-card">
              <div className="mb-3">
                <label className="fs-0" htmlFor="addGoalTitle">
                  Title
                </label>
                <input
                  className="form-control"
                  id="addGoalTitle"
                  type="text"
                  name="title"
                  required="required"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => enterSubmit(e)}
                />
              </div>

              <div className="mb-3">
                <label className="fs-0" htmlFor="addGoalDescription">
                  Description
                </label>
                <textarea
                  className="form-control"
                  rows="3"
                  required="required"
                  name="description"
                  id="addGoalDescription"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onKeyDown={(e) => enterSubmit(e)}
                ></textarea>
              </div>

              <div style={{ display: 'block' }} className="mb-3">
                <label className="fs-0" htmlFor="addGoalEndDate">
                  Due Date
                </label>

                <DatePicker
                  onChange={setDueDate}
                  value={dueDate}
                  className={'form-control px-2'}
                  format={'dd.MM.y'}
                  locale={'de-DE'}
                />
              </div>

              <div style={{ display: 'block' }} className="mb-3 ">
                <label className="fs-0" htmlFor="addPriority">
                  Priority
                </label>
                <select
                  className="form-select"
                  id="addPriority"
                  name="addPriority"
                  value={priority}
                  onChange={(e) => setPriority(e.target.value)}
                >
                  <option value="HIGH">High</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="LOW">Low</option>
                </select>
              </div>

              <div style={{ display: 'block' }} className="mb-3 ">
                <label className="fs-0" htmlFor="addStatus">
                  Status
                </label>
                <select
                  className="form-select"
                  id="addStatus"
                  name="addStatus"
                  value={goalStatus}
                  onChange={(e) => setGoalStatus(e.target.value)}
                >
                  <option value="ONHOLD">ONHOLD</option>
                  <option value="PENDING">PENDING</option>
                  <option value="PROCESSING">PROCESSING</option>
                  <option value="COMPLETED">COMPLETED</option>
                </select>
              </div>

              <div style={{ display: 'none' }} className="mb-0">
                <label className="fs-0 mb-0" htmlFor="addGoalLabel">
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
                className="btn btn-falcon-primary px-4"
                type="submit"
                id="addGoalButton"
                disabled={loading}
              >
                {loading ? 'Loading' : 'Add'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default AddGoalModal
