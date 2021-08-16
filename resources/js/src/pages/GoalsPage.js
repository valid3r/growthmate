import React, { useEffect, useState } from 'react'
import Goal from '../components/Goal'
import { Fragment } from 'react'
import TopNavigation from '../components/TopNavigation'
import AddGoalModal from '../components/AddGoalModal'
import EditGoalModal from '../components/EditGoalModal'
import API from '../API'
import ConfirmDeleteModal from '../components/ConfirmDeleteModal'

const GoalsPage = () => {
  const [posts, setPosts] = useState(null)
  const [id, setId] = useState('')
  const [deleteTitle, setDeleteTitle] = useState('')
  const [deleteId, setDeleteId] = useState('')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState('')
  const [priority, setPriority] = useState('')
  const [dueDate, setDueDate] = useState(new Date())

  /**
   * Axios GET request to get all Goals
   *
   */
  const fetchGoals = () => {
    API.getAllGoals()
      .then(function (response) {
        const result = response.data
        setPosts(result.data)
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }

  useEffect(() => {
    fetchGoals()
  }, [])

  /**
   * Function to delete a Goal
   * Deletes the goal with the id setted when opening the confirmation dialog
   */

  const deleteGoal = () => {
    API.deleteGoal(deleteId)
      .then(function (response) {
        console.log(response.data)

        /** Just re-fetch the posts */
        fetchGoals()
      })
      .catch(function (error) {
        console.log(error)
      })

    // Hide confirmation modal
    $('#confirmDeleteModal').modal('hide')
  }

  /**
   * Sets the Delete Title & ID of the to-be-deleted Goal
   *
   * @param {num} id
   * @param {string} title
   */
  const confirmDelete = (id, title) => {
    setDeleteTitle(title)
    setDeleteId(id)
  }

  /**
   * Gets data from one Goal to shows it for editing
   * @param {num} id
   */
  const editGoal = (id) => {
    API.getOneGoal(id)
      .then(function (response) {
        // console.log(response.data)
        const post = response.data.data

        setId(post.id)
        setTitle(post.title)
        setDescription(post.description)
        setDueDate(new Date(post.due_date))
        setPriority(post.priority)
        setStatus(post.status)
      })
      .catch(function (error) {
        console.log(error.config)
      })
  }

  /**
   * Sets the status of a Goal
   * @param {num} id
   * @param {string} status
   */
  const setGoalStatus = (id, status) => {
    API.setGoalStatus(id, status)
      .then(function (response) {
        console.log(response)
      })
      .catch(function (error) {
        console.log(error.config)
      })
    fetchGoals()
  }

  const goalTitleSetter = (title) => {
    setTitle(title)
  }
  const goalDescriptionSetter = (desc) => {
    setDescription(desc)
  }

  const goalStatusSetter = (status) => {
    setStatus(status)
  }

  const goalPrioritySetter = (priority) => {
    setPriority(priority)
  }

  const goalDueDateSetter = (dueDate) => {
    setDueDate(dueDate)
  }

  const renderGoals = () => {
    // If posts is not set
    if (!posts) {
      return (
        <tr>
          <td colSpan="6">Loading....</td>
        </tr>
      )
    }
    // If is set but nothing inside
    if (posts.length === 0) {
      return (
        <tr>
          <td colSpan="6" className="text-center">
            There are no posts. Add one :)
          </td>
        </tr>
      )
    }

    // Else return all posts
    return posts.map((post, key) => {
      return (
        <Fragment key={key}>
          <Goal
            key={key}
            id={post.id}
            title={post.title}
            description={post.description}
            due_date={post.due_date}
            priority={post.priority}
            status={post.status}
            confirmDelete={confirmDelete}
            editGoal={editGoal}
            setGoalStatus={setGoalStatus}
          />
        </Fragment>
      )
    })
  }

  return (
    <div className="container" data-layout="container">
      {/* <LeftNavigation />  */}
      <div className="content">
        <TopNavigation />

        {!posts ? (
          <Fragment />
        ) : (
          <div className="card mb-3" id="goalsTable">
            <div className="card-header">
              <div className="row flex-between-center">
                <div className="col-4 col-sm-auto d-flex align-items-center pe-0">
                  <h5 className="fs-0 mb-0 text-nowrap py-2 py-xl-0">Goals</h5>
                </div>
                <div className="col-8 col-sm-auto ms-auto text-end ps-0">
                  <div id="orders-actions">
                    <button
                      className="btn btn-sm btn-primary btn-falcon-primary"
                      type="button"
                      data-bs-toggle="modal"
                      data-bs-target="#addGoalModal"
                    >
                      <span className="fas fa-plus me-2"></span>Add Goal
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive scrollbar">
                <table className="table  mb-0 table-borderless table-hover table-striped fs--2 border-200">
                  <thead className="bg-200 text-900">
                    <tr>
                      <th className="sort" data-sort="goal">
                        Goal
                      </th>

                      <th className="sort text-left" data-sort="description">
                        Description
                      </th>

                      <th className="sort text-right" data-sort="date">
                        Due Date
                      </th>

                      <th
                        className="sort pe-1 align-middle white-space-nowrap text-center"
                        data-sort="priority"
                      >
                        Priority
                      </th>

                      <th
                        className="sort pe-1 align-middle white-space-nowrap text-center"
                        data-sort="status"
                      >
                        Status
                      </th>

                      <th className="no-sort"></th>
                    </tr>
                  </thead>
                  <tbody className="list">{renderGoals()}</tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        <AddGoalModal fetchGoals={fetchGoals} />
        <EditGoalModal
          id={id}
          title={title}
          description={description}
          status={status}
          priority={priority}
          dueDate={dueDate}
          goalTitleSetter={goalTitleSetter}
          goalDescriptionSetter={goalDescriptionSetter}
          goalStatusSetter={goalStatusSetter}
          goalDueDateSetter={goalDueDateSetter}
          goalPrioritySetter={goalPrioritySetter}
          fetchGoals={fetchGoals}
        />
        <ConfirmDeleteModal deleteGoal={deleteGoal} deleteTitle={deleteTitle} />
      </div>
    </div>
  )
}
export default GoalsPage
