import { connect } from 'react-redux'
import HomeView from '../components/HomeView'

const mapStateToProps = state => ({
  auth: state.auth,
  language: state.language
})

export default connect(mapStateToProps)(HomeView)
