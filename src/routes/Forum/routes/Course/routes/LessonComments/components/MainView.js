import React, { Component, PropTypes } from 'react'
import firebase from 'firebase'
import CommentList from './CommentList'

class MainView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      forumSection: {},
      sectionLoaded: false
    }
  }

  componentWillMount () {
    const { courseId } = this.props.params
    this.fetchInfo(courseId)
  }

  fetchInfo (courseId) {
    const { forumSection } = this.state
    firebase.database().ref('courses/' + courseId)
    .once('value')
    .then(snapshot => {
      const object = snapshot.val()
      forumSection.discipline = object.discipline
      forumSection.name = object.name
      this.setState({ forumSection })
    })
  }

  render () {
    const { forumSection } = this.state
    const { lessonId, courseId } = this.props.params
    const { user } = this.props.auth
    return (
      <div className='col-xs-12 col-md-12'>
        <div className='col-xs-12 col-md-8'>
          <label className='control-label col-xs-2 col-md-12' style={{ padding: '15px' }}>{forumSection.name}</label>
          <div className='col-xs-12 col-md-10'>
            <ul className='list-unstyled'>
              <CommentList
                courseId={courseId}
                lessonId={lessonId}
                user={user}
              />
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

MainView.propTypes = {
  params: PropTypes.object,
  lessonId: React.PropTypes.string,
  auth: React.PropTypes.object
}

export default MainView
