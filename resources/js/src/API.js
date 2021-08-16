const axios = window.axios
const BASE_API_URL = 'http://localhost:8000/api'

export default {
  // Goals
  getAllGoals: () => axios.get(`${BASE_API_URL}/goals`),
  getOneGoal: (id) => axios.get(`${BASE_API_URL}/goals/${id}`),
  addGoal: (goal) => axios.post(`${BASE_API_URL}/goals`, goal),
  updateGoal: (id, goal) => axios.put(`${BASE_API_URL}/goals/${id}`, goal),
  deleteGoal: (id) => axios.delete(`${BASE_API_URL}/goals/${id}`),
  setGoalStatus: (goalId, status) =>
    axios.put(`${BASE_API_URL}/goals/${goalId}/${status}`),

  // Macros
  addMacro: (goalId, macro) =>
    axios.post(`${BASE_API_URL}/macros/${goalId}`, macro),
  deleteMacro: (id) => axios.delete(`${BASE_API_URL}/macros/${id}`),
  getGoalMacros: (id) => axios.get(`${BASE_API_URL}/macros/${id}`),

  // Micros
  getMacroMicros: (macroId) => axios.get(`${BASE_API_URL}/micros/${macroId}`),
  deleteMicro: (id) => axios.delete(`${BASE_API_URL}/micros/${id}`),
  setMicroStatus: (microId, status) =>
    axios.put(`${BASE_API_URL}/micros/${microId}/${status}`),
  addMicro: (macroId, micro) =>
    axios.post(`${BASE_API_URL}/micros/${macroId}`, micro),
}
