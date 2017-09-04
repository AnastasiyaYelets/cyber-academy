import { connect } from 'react-redux'
import Footer from '../components/Footer'

const mapStateToProps = state => ({
  auth: state.auth,
  language: state.language
})

export default connect(mapStateToProps)(Footer)
