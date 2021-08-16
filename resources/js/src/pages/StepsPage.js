import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import TopNavigation from '../components/TopNavigation'
import { Link } from 'react-router-dom'
import API from '../API'
import { Fragment } from 'react'
import AddMacroModal from '../components/AddMacroModal'
import AddMicroModal from '../components/AddMicroModal'
import './StepsPage.css'
import WarningModal from '../components/WarningModal'

const StepsPage = () => {
  const { goalId } = useParams()
  const [macroId, setMacroId] = useState('')
  const [title, setGoalTitle] = useState('')
  const [macros, setMacros] = useState(null)
  const [micros, setMicros] = useState(null)
  const microModal = micros ? '#addMicroModal' : '#warningModal'

  /**
   * Gets the Goal title and Sets it
   * @param {num} id
   */
  const goalTitle = (id) => {
    API.getOneGoal(id)
      .then(function (response) {
        const post = response.data.data
        console.log(response.data.data)
        setGoalTitle(post.title)
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }

  /**
   * Axios GET request to get all Macros from the Select/Setted Goal
   * @param {num} id
   */
  const fetchMacros = (id) => {
    API.getGoalMacros(id)
      .then(function (response) {
        const result = response.data
        setMacros(result.data)
        console.log(result.data)
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }

  useEffect(() => {
    goalTitle(goalId)
    fetchMacros(goalId)
  }, [])

  /**
   * Axios GET request to get all Micros belonging to the Selected/Setted Macro
   * @param {num} macroId
   */
  const fetchMicros = (macroId) => {
    API.getMacroMicros(macroId)
      .then(function (response) {
        const result = response.data
        setMicros(result.data)
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }

  /**
   * Helper function to get render Micros on Macro Click
   * @param {num} macroId
   */

  const loadMicros = (macroId) => {
    setMacroId(macroId)
    if (fetchMicros(macroId)) {
      renderMicros()
    }
  }

  const renderMicros = () => {
    return micros.map((micro, key) => {
      return (
        <div
          key={key}
          className="d-flex justify-content-between border-top hover-actions-trigger btn-reveal-trigger px-card border-200 todo-list-item"
        >
          <div
            style={{ width: '100%' }}
            className="form-check mb-0 d-flex align-items-center"
          >
            <input
              className="form-check-input rounded-circle form-check-line-through p-2 form-check-input-success"
              type="checkbox"
              checked={micro.completed ? 1 : 0}
              onClick={(e) => setMicroStatus(`${micro.id}`, !micro.completed)}
              readOnly={true}
              id={micro.id}
            />
            <label
              className="form-check-label mb-0 p-3"
              style={{ width: '100%', cursor: 'pointer' }}
              onClick={(e) => setMicroStatus(`${micro.id}`, !micro.completed)}
            >
              {micro.title}
            </label>
          </div>
          <div className="d-flex align-items-center">
            <div className="hover-actions" style={{ right: '0.5rem' }}>
              <button
                onClick={() => deleteMicro(`${micro.id}`)}
                className="btn btn-light icon-item rounded-3 me-2 fs--4 icon-item-sm"
              >
                <span
                  style={{ color: '#a82723' }}
                  className="fas fa-trash"
                ></span>
              </button>
            </div>
          </div>
        </div>
      )
    })
  }

  const renderMacros = () => {
    return macros.map((macro, key) => {
      return (
        <tr key={key} style={{ cursor: 'pointer' }}>
          <td
            scope="row"
            className={`${
              macroId == macro.id
                ? 'table-active icons-table-row'
                : 'icons-table-row'
            }`}
          >
            <div className="d-flex justify-content-between border-top hover-actions-trigger btn-reveal-trigger  border-200 todo-list-item">
              <div
                style={{ width: '100%' }}
                className="mb-0 d-flex align-items-center"
              >
                <label
                  className="form-check-label mb-0 p-3"
                  style={{ width: '100%', cursor: 'pointer' }}
                  htmlFor={macro.id}
                  onClick={() => loadMicros(`${macro.id}`)}
                >
                  {macro.title}
                </label>

                <div className="hover-icons">
                  <button
                    onClick={() => deleteMacro(`${macro.id}`)}
                    className="btn btn-light icon-item rounded-3 me-2 fs--4 icon-item-sm"
                  >
                    <span
                      style={{ color: '#a82723' }}
                      className="fas fa-trash"
                    ></span>
                  </button>
                </div>
              </div>
            </div>
          </td>
        </tr>
      )
    })
  }

  /**
   * Axios DELETE request to delete a Macro
   * @param {num} id
   */
  const deleteMacro = (id) => {
    API.deleteMacro(id)
      .then(function (response) {
        console.log(response.data)
        fetchMacros(goalId)
        setMicros(null)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  /**
   * Axios DELETE request to delete a Micro
   * @param {num} id
   */
  const deleteMicro = (id) => {
    console.log('Delete micro with id: ' + id)

    API.deleteMicro(id)
      .then(function (response) {
        console.log(response.data)
        fetchMicros(macroId)
      })
      .catch(function (error) {
        console.log(error)
      })
  }

  /**
   * Axios PUT request to update Micro Status
   * @param {num} id
   * @param {string} status
   */
  const setMicroStatus = (id, status) => {
    status = status ? 1 : 0
    API.setMicroStatus(id, status)
      .then(function (response) {
        console.log(response.data.data)
      })
      .catch(function (error) {
        console.log(error.config)
      })
    fetchMicros(macroId)
  }

  return (
    <div className="container" data-layout="container">
      {/* <LeftNavigation />  */}
      <div className="content">
        <TopNavigation />
        <div style={{ minHeight: 261.2, background: 'none' }}>
          {!macros ? (
            <Fragment />
          ) : (
            <Fragment>
              <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link style={{ textDecoration: 'none' }} to={'/'}>
                      Home
                    </Link>
                  </li>
                  <li
                    className="breadcrumb-item"
                    style={{ color: 'black' }}
                    aria-current="page"
                  >
                    {title}
                  </li>
                </ol>
              </nav>

              <hr />

              <div className="row g-3 mb-3">
                <div className="col-md-4 col-xxl-4 growthmate-col-left">
                  <div
                    className="card h-100 rounded-0 growthmate-left-card"
                    style={{ minHeight: '516px' }}
                  >
                    <div className="card-header">
                      <div className="d-flex align-items-center">
                        <h5 className="fs-0 fw-normal text-800 mb-0">
                          {/**Strides (Macros)  */}
                          Giant Steps
                        </h5>
                      </div>
                    </div>
                    <div className="card-body p-0 scrollbar">
                      <div className="pt-0 border-top ask-analytics">
                        {(() => {
                          if (!macros) return <Fragment>no goal</Fragment>
                          else if (macros.length === 0)
                            return (
                              <Fragment>
                                <div
                                  style={{
                                    height: '100%',
                                    lineHeight: '25',
                                    textAlign: 'center',
                                    background: '#77889966',
                                  }}
                                >
                                  <p
                                    style={{
                                      lineHeight: 'normal',
                                      verticalAlign: 'middle',
                                      display: 'inline-block',
                                    }}
                                    className="text-center"
                                  >
                                    Add a Macro to get started
                                  </p>
                                </div>
                              </Fragment>
                            )
                          else
                            return (
                              <table className="table table-striped table-hover table-inverse table-responsive">
                                <thead className="thead-inverse"></thead>
                                <tbody>{renderMacros()}</tbody>
                              </table>
                            )
                        })()}
                      </div>
                    </div>
                    <div className="card-footer bg-light p-0">
                      <a
                        className="btn btn-sm btn-link d-block py-2"
                        data-bs-toggle="modal"
                        data-bs-target="#addMacroModal"
                      >
                        <span className="fas fa-plus me-1 fs--2"></span>Add
                        Macro
                      </a>
                    </div>
                  </div>
                </div>

                <div className="col-md-8 col-xxl-8 growthmate-col-right">
                  <div className="card h-100 rounded-0">
                    <div className="card-header">
                      <div className="d-flex align-items-center">
                        <h5 className="fs-0 fw-normal text-800 mb-0">
                          Baby Steps
                        </h5>
                      </div>
                    </div>
                    <div className="card-body p-0 scrollbar">
                      <div className="pt-0 border-top ask-analytics">
                        {(() => {
                          if (!micros)
                            return (
                              <Fragment>
                                <div
                                  style={{
                                    height: '100%',
                                    lineHeight: '25',
                                    textAlign: 'center',
                                    background: '#77889966',
                                  }}
                                >
                                  <p
                                    style={{
                                      lineHeight: 'normal',
                                      verticalAlign: 'middle',
                                      display: 'inline-block',
                                    }}
                                    className="text-center"
                                  >
                                    Select a Macro to get started
                                  </p>
                                </div>
                              </Fragment>
                            )
                          else if (micros.length === 0)
                            return (
                              <Fragment>
                                <div
                                  style={{
                                    height: '100%',
                                    lineHeight: '25',
                                    textAlign: 'center',
                                  }}
                                >
                                  <p
                                    style={{
                                      lineHeight: 'normal',
                                      verticalAlign: 'middle',
                                      display: 'inline-block',
                                    }}
                                    className="text-center"
                                  >
                                    Add a Micro to get started
                                  </p>
                                </div>
                              </Fragment>
                            )
                          else
                            return (
                              <div className="card-body p-0 to-do-list-body-height">
                                {renderMicros()}
                              </div>
                            )
                        })()}
                      </div>
                    </div>
                    <div className="card-footer bg-light p-0">
                      <a
                        className="btn btn-sm btn-link d-block py-2"
                        data-bs-toggle="modal"
                        data-bs-target={microModal}
                      >
                        <span className="fas fa-plus me-1 fs--2"></span>Add
                        Micro
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </Fragment>
          )}
        </div>
      </div>

      <AddMacroModal goalId={goalId} fetchMacros={fetchMacros} />
      <AddMicroModal macroId={macroId} fetchMicros={fetchMicros} />
      <WarningModal />
    </div>
  )
}

export default StepsPage
