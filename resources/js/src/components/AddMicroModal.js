import React, { useState } from 'react'
import './ContentHeader.css'
import API from '../API'
import './modal.css'

const AddMicroModal = (props) => {
  const [loading, setLoading] = useState(false)
  const [micro, setMicro] = useState('')

  /**
   * Helper function to submit the form
   * Needed in order to check if input is empty
   * @param {event} e
   */
  const addMicro = function (e) {
    onAddSubmit()
    e.preventDefault()
  }

  /**
   * Ctr + Enter Event Listener
   * Clicks the submit button when ctrl + enter is pressed
   * @param {event} e
   */
  function enterSubmit(e) {
    if ((e.ctrlKey || e.metaKey) && (e.keyCode == 13 || e.keyCode == 10)) {
      console.log('Add Clicked!')
      document.getElementById('addMicroButton').click()
    }
  }

  /**
   * Sends an Axios post request to add a new Micro
   *
   */
  const onAddSubmit = async () => {
    setLoading(true)
    try {
      await API.addMicro(props.macroId, {
        micro,
      }).catch(function (error) {
        console.log(error.config)
      })
    } catch (error) {
      console.log('Failed to add micro!')
    } finally {
      setLoading(false)
      console.log('Its working!')

      // Fetch micros
      props.fetchMicros(props.macroId)

      // Hide bootstrap modal
      $('#addMicroModal').modal('hide')

      setMicro('')
    }
  }

  return (
    <div
      className="modal"
      id="addMicroModal"
      tabIndex="-1"
      data-bs-backdrop="static"
    >
      <div className="modal-dialog">
        <div className="modal-content border middle-modal">
          <form id="addMicroForm" autoComplete="off" onSubmit={addMicro}>
            <div className="modal-header px-card bg-light border-bottom-0">
              <h5 className="modal-title">New Micro</h5>
              <button
                className="btn-close me-n1"
                type="button"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body p-card">
              <div className="mb-3">
                <textarea
                  className="form-control"
                  rows="3"
                  required="required"
                  name="description"
                  id="addMicroDescription"
                  value={micro}
                  onChange={(e) => setMicro(e.target.value)}
                  onKeyDown={(e) => enterSubmit(e)}
                ></textarea>
              </div>
            </div>

            <div className="card-footer d-flex justify-content-end align-items-center bg-light">
              <button
                className="btn btn-falcon-primary px-4"
                type="submit"
                id="addMicroButton"
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

export default AddMicroModal
