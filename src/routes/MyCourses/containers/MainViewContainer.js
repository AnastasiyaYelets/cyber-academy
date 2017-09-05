import { connect } from 'react-redux'
import MainView from '../components/MainView'

const mapStateToProps = state => ({
  auth: state.auth,
  language: state.language
})

export default connect(mapStateToProps)(MainView)
