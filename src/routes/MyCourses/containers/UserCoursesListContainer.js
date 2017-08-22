import { connect } from 'react-redux'
import userCoursesList from '../components/UserCoursesList'

const mapStateToProps = state => ({
  auth: state.auth
})

export default connect(mapStateToProps)(userCoursesList)
