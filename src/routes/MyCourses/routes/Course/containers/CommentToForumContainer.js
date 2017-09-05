import { connect } from 'react-redux'
import CommentToForum from '../components/CommentToForum'

const mapStateToProps = state => ({
  auth: state.auth,
  language: state.language
})

export default connect(mapStateToProps)(CommentToForum)
