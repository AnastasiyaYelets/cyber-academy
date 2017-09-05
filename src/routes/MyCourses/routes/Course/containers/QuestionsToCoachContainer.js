import { connect } from 'react-redux'
import QuestionsToCoach from '../components/QuestionsToCoach'

const mapStateToProps = state => ({
  auth: state.auth,
  language: state.language
})

export default connect(mapStateToProps)(QuestionsToCoach)
