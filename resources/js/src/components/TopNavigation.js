import React, { Component, Fragment } from 'react'
import { Link } from 'react-router-dom'
import UnimplementedModal from './UnimplementedModal'

class TopNavigation extends Component {
  render() {
    return (
      <Fragment>
        <nav
          style={{ paddingBottom: '36px', marginBottom: '6px' }}
          className="navbar navbar-light navbar-glass navbar-top navbar-expand"
        >
          <button
            className="btn navbar-toggler-humburger-icon navbar-toggler me-1 me-sm-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarVerticalCollapse"
            aria-controls="navbarVerticalCollapse"
            aria-expanded="false"
            aria-label="Toggle Navigation"
          >
            <span className="navbar-toggle-icon">
              <span className="toggle-line"></span>
            </span>
          </button>

          <Link className="navbar-brand me-1 me-sm-3" to="/">
            <div className="d-flex align-items-center">
              <span style={{ color: '#656565' }} className="font-sans-serif">
                Growth<span style={{ color: '#4392fd' }}>Mate</span>
              </span>
            </div>
          </Link>

          <ul
            style={{ marginTop: '6px' }}
            className="navbar-nav align-items-center d-none d-lg-block"
          >
            <li className="nav-item">{/* <SearchBox showDropdown /> */}</li>
          </ul>

          <ul className="navbar-nav navbar-nav-icons ms-auto flex-row align-items-center">
            <li className="nav-item">
              <div className="theme-control-toggle fa-icon-wait px-2">
                <input
                  className="form-check-input ms-0 theme-control-toggle-input"
                  id="themeControlToggle"
                  type="checkbox"
                  data-theme-control="theme"
                  value="dark"
                />
                <label
                  className="mb-0 theme-control-toggle-label theme-control-toggle-light"
                  htmlFor="themeControlToggle"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  title="Switch to light theme"
                >
                  <span className="fas fa-sun fs-0"></span>
                </label>
                <label
                  className="mb-0 theme-control-toggle-label theme-control-toggle-dark"
                  htmlFor="themeControlToggle"
                  data-bs-toggle="tooltip"
                  data-bs-placement="left"
                  title="Switch to dark theme"
                >
                  <span className="fas fa-moon fs-0"></span>
                </label>
              </div>
            </li>

            <li className="nav-item dropdown">
              <a
                className="nav-link pe-0"
                id="navbarDropdownUser"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                <div className="avatar avatar-xl">
                  <img
                    className="rounded-circle"
                    src="../assets/img/team/3-thumb.png"
                    alt=""
                  />
                </div>
              </a>
              <div
                className="dropdown-menu dropdown-menu-end py-0"
                aria-labelledby="navbarDropdownUser"
              >
                <div className="bg-white dark__bg-1000 rounded-2 py-2">
                  <button
                    className="dropdown-item"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#UnimplementedModal"
                  >
                    <span className="fas fa-crown me-1"></span>
                    <span>Admin</span>
                  </button>

                  <div className="dropdown-divider"></div>
                  <button
                    className="dropdown-item"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#UnimplementedModal"
                  >
                    Settings
                  </button>
                  <button
                    className="dropdown-item"
                    type="button"
                    data-bs-toggle="modal"
                    data-bs-target="#UnimplementedModal"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </li>
          </ul>
        </nav>
        <UnimplementedModal />
      </Fragment>
    )
  }
}
export default TopNavigation
