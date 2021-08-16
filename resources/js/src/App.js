import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import GoalsPage from './pages/GoalsPage'
import StepsPage from './pages/StepsPage'

const App = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={GoalsPage} />
        <Route path="/steps/:goalId" component={StepsPage} />
      </Switch>
    </Router>
  )
}

if (document.getElementById('root')) {
  ReactDOM.render(<App />, document.getElementById('root'))
}
