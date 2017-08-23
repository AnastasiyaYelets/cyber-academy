import {
  ON_ENG,
  ON_RUS
} from '../../actions/lang-actions'
const langFromStorage = localStorage.getItem('cyber-academy-lang')
const language = langFromStorage ? JSON.parse(langFromStorage) : 'rus'

const initialState = {
  language
}

export default function langReducer (state = initialState, action) {
  switch (action.type) {
    case ON_ENG:
      return {
        ...state,
        language: 'eng'
      }
    case ON_RUS:
      return {
        ...state,
        language:'rus'
      }
    default:
      return state
  }
}
