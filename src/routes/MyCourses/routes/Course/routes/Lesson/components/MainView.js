import React, { Component } from 'react'
import firebase from 'firebase'
import VideoPlayer from './VideoPlayer'
import './lessonMyCourses.scss'
import CommentToForum from '../containers/CommentToForumContainer'
import QuestionsToCoach from '../containers/QuestionsToCoachContainer'
import { Link, browserHistory } from 'react-router'

class MainView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      lesson: [],
      lessonLoaded: false,
      course: {},
      courseLoaded: false,
      showComments: false,
      buttonName: 'Show Comments',
      buttonTaskName: 'Show Practice Task',
      userCourses: [],
      set: new Set(),
      stopVideo: false
    }
    this.addVideoId = this.addVideoId.bind(this)
  }

  componentWillMount () {
    const { params } = this.props
    this.fetchItem(params.courseId)
    this.fetchLesson(params.lessonId)
  }

  fetchLesson (id) {
    this.setState({
      lesson: [],
      lessonLoaded: false
    })
    firebase.database().ref('lessons/' + id)
    .once('value')
    .then(snapshot => {
      const object = snapshot.val()
      if (object !== null) {
        const lesson = object
        lesson.id = id
        this.setState({ lesson, lessonLoaded: true })
      } else {
        this.setState({ lessonLoaded: true })
      }
    })
  }

  fetchItem (id) {
    this.setState({
      course: {},
      courseLoaded: false
    })

    firebase.database().ref('courses/' + id)
    .once('value')
    .then(snapshot => {
      const object = snapshot.val()
      if (object !== null) {
        const course = { ...snapshot.val(), id }
        const { sections } = course
        const newSectionsLessons = sections.map(section => {
          if (section.lessonsIds) {
            const promisesLessons = section.lessonsIds.map(id =>
            firebase.database().ref('lessons/' + id)
            .once('value')
            .then(snapshot2 => ({ ...snapshot2.val(), id }))
          )
            return Promise.all(promisesLessons).then(lessons => {
              section = { ...section, lessons }
              return (section)
            })
          }
        })
        Promise.all(newSectionsLessons).then(result => {
          const { params } = this.props
          const newSections = result.filter((item) => item.sectionNumber !== 0)
          const section = newSections.filter((item) => item.lessonsIds.includes(params.lessonId))
          const testId = section[0].testsIds[0]
          this.setState({
            sections: result,
            course,
            testId,
            courseLoaded: true
          })
          const { sections } = this.state
          const newSectionsTests = sections.map(section => {
            const promisesTests = section.testsIds.map(id =>
              firebase.database().ref('tests/' + id)
              .once('value')
              .then(snapshot3 => ({ ...snapshot3.val(), id }))
            )
            return Promise.all(promisesTests).then(tests => {
              section = { ...section, tests }
              return (section)
            })
          })
          Promise.all(newSectionsTests).then(result => {
            this.setState({
              sections: result,
              testsLoaded: true
            })
          })
        })
      } else {
        this.setState({ courseLoaded: true })
      }
    })
  }

  isPassed (id, type) {
    const { params } = this.props
    const { userCourses } = this.props.auth.user
    const courseFromUser = userCourses.find(item => item.courseId === params.courseId)
    const { uniqueWatchedLessonsIds = [], passedTestIds = [] } = courseFromUser
    const array = (type === 'lesson') ? uniqueWatchedLessonsIds : passedTestIds
    const passed = (type === 'lesson') ? array.findIndex(item => item === id)
    : array.findIndex(item => item.testId === id)
    // this.setState({ mark })
    if (passed === -1) {
      return [false, 0]
    } else {
      const mark = array[`${passed}`].mark ? array[`${passed}`].mark : 0
      return [true, mark]
    }
  }

  renderLessonsList (lessons = []) {
    const { location } = this.props
    const isBonusLesson = (item) => {
      return (item.isBonus === true)
    }
    const newPath = `${location.pathname.substring(0, location.pathname.length - 20)}`
    return lessons.map((item, i) =>
      <div key={i}>
        {!isBonusLesson(item) && <Link
          className='link-mylesson' to={{ pathname: `${newPath}${item.id}`}}
          onClick={() => { this.fetchLesson(item.id) }}>
          {item.name} </Link>}
        {isBonusLesson(item) && <Link
          className='bonus-link-mylesson' to={{ pathname: `${newPath}${item.id}` }}
          onClick={() => { this.fetchLesson(item.id) }}>
          {item.name}</Link>}
        {this.isPassed(item.id, 'lesson')[0] && <div className='checkbox-mylesson'> </div>}
      </div>
  )
 }

  renderTestsList (tests = []) {
    const { location } = this.props
    return tests.map((item, i) =>
      <div key={i} >
        <Link className='link-mylesson' to={{
          pathname: `${location.pathname.substring(0, location.pathname.length - 27)}test/${item.id}` }}>{item.name}
        </Link>
        {this.isPassed(item.id, 'test')[0] && <div className='checkbox-mylesson'> </div> }
      </div>
  )
  }

  renderSectionsList () {
    const { sections = [], set } = this.state
    const newSections = sections.filter((item) => item.sectionNumber !== 0)
    let newSet = new Set()
    return (
      <ul className='list-unstyled'>
        {newSections.map((item, i) =>
          <div key={i}>
            <div
              onClick={() => {
                if (set.has(i)) {
                  newSet.delete(i)
                } else {
                  newSet.add(i)
                }
                this.setState({ set: newSet })
              }
              }
              >{item.name}</div>
            <div>
              { set.has(i) && this.renderLessonsList(item.lessons)}
              { set.has(i) && this.renderTestsList(item.tests)}
            </div>
          </div>
          )}
      </ul>
    )
  }

  addLessonIdIfUnique (uniqueWatchedLessonsIds = [], lessonId) {
    const isLessonInWatchedLessonsIds = uniqueWatchedLessonsIds.findIndex(id => id === lessonId)
    if (isLessonInWatchedLessonsIds === -1) {
      return ([
        ...uniqueWatchedLessonsIds,
        lessonId
      ])
    } else {
      return uniqueWatchedLessonsIds
    }
  }

  addVideoId (isEnded) {
    const { lessonId = '', courseId = '' } = this.props.params
    const { userCourses, uid } = this.props.auth.user
    const courseFromUser = userCourses.find((item, i) => item.courseId === courseId)
    if (isEnded) {
      const { watchedLessonsIds = [], uniqueWatchedLessonsIds = [] } = courseFromUser
      const newUniqueWatchedLessonsIds = this.addLessonIdIfUnique(uniqueWatchedLessonsIds, lessonId)
      const newWatchedLessonsIds = [
        ...watchedLessonsIds,
        lessonId
      ]
      const newCourseFromUser = {
        ...courseFromUser,
        watchedLessonsIds : newWatchedLessonsIds,
        uniqueWatchedLessonsIds : newUniqueWatchedLessonsIds
      }
      this.setState({ newCourseFromUser })
    } else {
      const { startedLessonsIds = [] } = courseFromUser
      const newStartedLessonsIds = [
        ...startedLessonsIds,
        lessonId
      ]
      const newCourseFromUser = {
        ...courseFromUser,
        startedLessonsIds : newStartedLessonsIds
      }
      this.setState({ newCourseFromUser })
    }

    const { newCourseFromUser } = this.state
    const indexItemToRemove = userCourses.findIndex(course => course.courseId === courseId)
    const newUserCourses = [
      ...userCourses.slice(0, indexItemToRemove),
      newCourseFromUser,
      ...userCourses.slice(indexItemToRemove + 1)
    ]
    firebase.database().ref('users/' + uid).update({ userCourses: newUserCourses })
  }

  renderVideo () {
    const { lesson = {}, stopVideo } = this.state
    if (lesson.videoUrl) {
      return (
        <div>
          <VideoPlayer
            url={lesson.videoUrl}
            addVideoId={this.addVideoId}
            stopVideo={stopVideo}
          />
        </div>
      )
    }
  }

  buttonClick () {
    const { showComments, buttonName } = this.state
    const newButtonName = (buttonName === 'Show Comments') ? 'Hide Comments' : 'Show Comments'
    this.setState({ showComments: !showComments, buttonName: newButtonName })
  }

  renderShowCommentsButton () {
    const { buttonName } = this.state
    return (
      <div>
        <div
          className='comment-button-mylesson'
          onClick={() => this.buttonClick()}
          >{buttonName}
        </div>
      </div>
    )
  }

  buttonClickTask () {
    const { showTask, buttonTaskName } = this.state
    const newButtonTaskName = (buttonTaskName === 'Show Practice Task') ? 'Hide Practice Task' : 'Show Practice Task'
    this.setState({ showTask: !showTask, buttonTaskName: newButtonTaskName })
  }

  renderShowTaskButton () {
    const { buttonTaskName } = this.state
    return (
      <div>
        <div
          className='task-button-mylesson'
          onClick={() => this.buttonClickTask()}
          >{buttonTaskName}
        </div>
      </div>
    )
  }

  renderTestButton () {
    const { testId } = this.state
    const { location } = this.props
    return (
      <div>
        <div
          className='test-button-mylesson'
          onClick={() => {
            browserHistory.push({
              pathname: `${location.pathname.substring(0, location.pathname.length - 27)}test/${testId}`
            })
          }}
          >Пройти тест
        </div>
      </div>
    )
  }

  render () {
    const { course, courseLoaded, showComments, lesson, stopVideo, showTask } = this.state
    const { params } = this.props
    const practiceTask = lesson.task || ''
    const classNameButtonPause = stopVideo ? 'pauseVideoToParents-mylesson' : 'playVideoToParents-mylesson'
    if (!courseLoaded) {
      return (<div>Loading...</div>)
    }
    return (
      <div className='container container-mylesson'>
        <div className='row'>

          <div className='col-xs-12 col-md-12'>
            <div className='col-xs-3 col-md-3'>
              <div className='button-lesson-name-mylesson'> {course.name}</div>
              <div className='section-list-mylesson'
                   style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/list.png?alt=media&token=e5c0dbeb-ed78-45e5-a6df-8912c30e9d2f)'}}
              >
                <ul className='list-unstyled'>
                  {this.renderSectionsList()}
                  {/* {this.renderSectionsList()} */}
                </ul>
              </div>
              <div className='button-lesson-name-mylesson'> {course.name}</div>
              <div className='button-coach-chat-mylesson'>Чат с тренером</div>
              <QuestionsToCoach courseId={params.courseId} />
            </div>

            <div className='col-xs-9 col-md-9'>
              <div> {this.renderVideo()}</div>
              <div
                className='videoButton-mylesson'
                style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/videoButton.jpg?alt=media&token=aa32d832-e6a2-4e55-833a-c100b17ae49c)'}}
                onClick={() => { this.setState({ stopVideo: !stopVideo }) }}
                >
                <div className={classNameButtonPause} >
                </div>
                <div className='textVideoToParents-mylesson'>
                  {lesson.name}
                </div>

              </div>

              <div className='questions-mylesson'
                style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/list.png?alt=media&token=e5c0dbeb-ed78-45e5-a6df-8912c30e9d2f)'}}
>
                {this.renderShowCommentsButton()}
                {showComments &&
                  <CommentToForum
                    courseId={params.courseId}
                />}
              </div>

              <div className='task-mylesson'
                style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/list.png?alt=media&token=e5c0dbeb-ed78-45e5-a6df-8912c30e9d2f)'}}
>
                {this.renderShowTaskButton()}
                {showTask && <div> Hello. I am your practice task: {practiceTask}
                </div>}
              </div>
              {this.renderTestButton()}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
MainView.propTypes = {
  location: React.PropTypes.object,
  params: React.PropTypes.object,
  auth: React.PropTypes.object,
  user: React.PropTypes.object
}

export default MainView
