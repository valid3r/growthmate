import { Link } from 'react-router-dom'
import classNames from 'classnames'

const Goal = ({
  id,
  title,
  description,
  priority,
  due_date,
  status,
  confirmDelete,
  editGoal,
  setGoalStatus,
}) => {
  const statusBadge = classNames({
    badge: true,
    'rounded-pill': true,
    'd-block': true,
    'badge-soft-warning': status == 'PENDING',
    'badge-soft-success': status == 'COMPLETED',
    'badge-soft-secondary': status == 'ONHOLD',
    'badge-soft-primary': status == 'PROCESSING',
  })
  const priorityBadge = classNames({
    badge: true,
    'rounded-pill': true,
    'd-block': true,
    'badge-soft-danger': priority == 'HIGH',
    'badge-soft-warning': priority == 'MEDIUM',
    'badge-soft-success': priority == 'LOW',
  })

  if (!title) return <div />
  return (
    <tr>
      <td className="goal">
        <div className="d-flex align-items-center position-relative">
          <div className="flex-1">
            <h6 className="mb-0 fw-semi-bold">
              <Link className="stretched-link text-900" to={'/steps/' + id}>
                {title}
              </Link>
            </h6>
            <p className="text-500 fs--2 mb-0">Bazelli</p>
          </div>
        </div>
      </td>
      <td className="description align-middle text-left">
        <Link
          className="text-decoration-none text-secondary"
          to={'/steps/' + id}
        >
          <p className="fs--1 mb-0 fw-semi-bold">{description}</p>
        </Link>
      </td>
      <td className="date align-middle text-right">
        <Link
          className="text-decoration-none text-secondary"
          to={'/steps/' + id}
        >
          <p className="fs--1 mb-0 fw-semi-bold">
            {new Date(due_date).toLocaleDateString('de-DE', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            })}
          </p>
        </Link>
      </td>
      <td className="priority py-2 align-middle text-center fs-0 white-space-nowrap">
        <span className={priorityBadge}>{priority}</span>
      </td>
      <td className="status py-2 align-middle text-center fs-0 white-space-nowrap">
        <span style={{ minWidth: '94px' }} className={statusBadge}>
          {status}
        </span>
      </td>
      <td className="py-2 align-middle white-space-nowrap text-end">
        <div className="dropdown font-sans-serif position-static">
          <button
            className="btn btn-link text-600 btn-sm dropdown-toggle btn-reveal"
            type="button"
            id="order-dropdown-0"
            data-bs-toggle="dropdown"
            data-boundary="viewport"
            aria-haspopup="true"
            aria-expanded="false"
          >
            <span className="fas fa-ellipsis-h fs--1"></span>
          </button>
          <div
            className="dropdown-menu dropdown-menu-end border py-0"
            aria-labelledby="order-dropdown-0"
          >
            <div className="bg-white py-2">
              <a
                className="dropdown-item"
                href="#!"
                onClick={() => setGoalStatus(`${id}`, 'COMPLETED')}
              >
                Completed
              </a>
              <a
                className="dropdown-item"
                href="#!"
                onClick={() => setGoalStatus(`${id}`, 'PROCESSING')}
              >
                Processing
              </a>
              <a
                className="dropdown-item"
                href="#!"
                onClick={() => setGoalStatus(`${id}`, 'ONHOLD')}
              >
                On Hold
              </a>
              <a
                className="dropdown-item"
                href="#!"
                onClick={() => setGoalStatus(`${id}`, 'PENDING')}
              >
                Pending
              </a>
              <div className="dropdown-divider"></div>

              <button
                className="dropdown-item"
                data-bs-toggle="modal"
                onClick={() => editGoal(`${id}`)}
                data-bs-target="#editGoalModal"
              >
                Edit
              </button>
              <button
                className="dropdown-item text-danger"
                data-bs-toggle="modal"
                data-bs-target="#confirmDeleteModal"
                onClick={() => confirmDelete(`${id}`, `${title}`)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </td>
    </tr>
  )
}

export default Goal
