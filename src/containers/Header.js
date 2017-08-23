import { connect } from 'react-redux'
import Header from '../components/Header'
import { onEngLang } from '../api/engLang-api'
import { onRusLang } from '../api/rusLang-api'

const mapStateToProps = state => ({
  user: state.auth.user,
  language: state.language
})

const mapDispatchToProps = {
  onEngLang: onEngLang,
  onRusLang: onRusLang
}
export default connect(mapStateToProps, mapDispatchToProps
)(Header)
