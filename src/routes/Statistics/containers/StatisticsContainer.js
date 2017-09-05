import { connect } from 'react-redux'
import Statistics from '../components/Statistics'

const mapStateToProps = state => ({
  auth: state.auth,
  language: state.language
})

export default connect(mapStateToProps)(Statistics)
