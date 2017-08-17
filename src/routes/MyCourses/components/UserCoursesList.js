import React, { Component } from 'react'
import firebase from 'firebase'
import { browserHistory } from 'react-router'
import './myCourses.scss'

class UserCoursesList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      courses: [],
      coursesLoaded: false,
      userCourses: []
    }
  }

  componentWillMount () {
    const { userCourses } = this.props.auth.user
    if (userCourses) {
      this.fetchCourses(userCourses)
    } else {
      this.setState({
        coursesLoaded: true
      })
    }
  }

  fetchCourses (userCourses) {
    this.setState({
      courses: [],
      coursesLoaded: false
    })

    const promises = userCourses.map(item => {
      return firebase.database().ref('courses/' + item.courseId)
      .once('value')
      .then(snapshot => {
        const object = snapshot.val()
        if (object !== null) {
          object.id = item.courseId
          return (object)
        }
      })
    })
    Promise.all(promises).then(result => {
      const newResult = result.filter(item => item)
      // const uniqueNewResult = result.filter((item, pos) => { return result.indexOf(item) === pos })
      this.setState({
        courses: newResult,
        coursesLoaded: true
      })
      // console.log(uniqueNewResult)
    })
  }

  renderProgressBar (course) {
    const { userCourses } = this.props.auth.user
    const courseFromUser = userCourses.find((item, i) => item.courseId === course.id)
    const numberWatchedlessons = courseFromUser.uniqueWatchedLessonsIds ? courseFromUser.uniqueWatchedLessonsIds.length : 0
    const newSections = course.sections.filter((item) => item.sectionNumber !== 0)
    const lessonsNumbersArray = newSections.map(section => {
      const lengthLessonsId = section.lessonsIds ? section.lessonsIds.length : 0
      return lengthLessonsId
    })
    const numberLessonsInCourse = lessonsNumbersArray.reduce((a, b) => {
      return a + b
    })
    const percent = Math.round(numberWatchedlessons / numberLessonsInCourse * 100)
    return (
      <div>
        <div className='progress-mycourses' style={{ margin: '0px 0px 10px 10px',
             backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/progressBarFull.png?alt=media&token=3f255608-768e-4e80-ac5f-cb44477f6301)' }}>
          <div className='progress-bar-mycourses' role='progressbar' aria-valuenow='40'
            aria-valuemin='0' aria-valuemax='100' style={{ width: `${percent}%`,
            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/progressBar.jpg?alt=media&token=9dea8add-ebfa-4ec0-bf9a-3f67d7654bed)' }}>
            {percent}%
          </div>
        </div>
      </div>
    )
  }

  isVip (course) {
    const { userVipCourses } = this.props.auth.user
    if (!!userVipCourses) {
    const vipCourseFromUser = userVipCourses.find((item, i) => item.courseId === course.id)
    return (
      <div>
        {!!vipCourseFromUser && <div className='vip-course-mycourses'> VipCourse</div> }
        {!vipCourseFromUser && <div className='vip-course-mycourses'></div> }
      </div>
    )
  }
  }

  renderCourses () {
    const { courses } = this.state
    const newCourses = [].concat(courses).concat(courses)
      return newCourses.map((course, i) => (
        <div key={i} className='frame-course-mycourses' style={{ padding: '5px', margin: '15px 10px 10px 10px',
             backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/frameLesson.jpg?alt=media&token=c44421b6-9655-476b-b373-f8ee89bdb0c8)' }}>
          <img src={course.mainPhoto} width='352px' height='150px' alt='loading' />
          <div className='caption-mycourses' style={{ padding: '5px 10px 5px 10px' }}>
            <h5 className='frame-name-mycourses'>{course.name} </h5>
            <h5 className='frame-description-mycourses'>{course.description}</h5>
            <div>
              {this.renderProgressBar(course)}
            </div>
            {this.isVip(course)}
            <div
              className='button-details-mycourses'
              style={{  color: 'yellow', backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/buttonDetails.png?alt=media&token=659dfd1a-03b0-4b54-83f6-a728cb1d1e94)'}}
              onClick={() => { browserHistory.push({ pathname: `/myCourses/course/${course.id}` }) }}
              >More details
            </div>
          </div>
        </div>
      ))
  }

  render () {
    const { coursesLoaded, courses } = this.state
    console.log(this.props.auth.user)
    if (!coursesLoaded) {
      return (<div>Loading...</div>)
    }
    // const isSCount = (courses.length !== 1)
    // const coursesCount = isSCount ? 'courses' : 'course'
    return (
      <div className='row'>
        <div className='col-xs-12 col-md-12' style={{ padding: '0px' }}>
          <div className='col-xs-2 col-md-2 ikon-dragon-mycourses'
            style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/ikonDragon.jpg?alt=media&token=9c1ed67f-60ef-48f8-86d7-58b0d0f45ea8)'}}
          ></div>
          <div className='col-xs-3 col-md-3 text-place-mycourses'>Улучши свои навыки и контроль за игрой</div>
          <div className='col-xs-7 col-md-7 text-frame-mycourses'
            style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/textFrameMyCourses.jpg?alt=media&token=fa0d0fdd-436f-4b94-9905-fd42878920c8)'}}
          > Изучи механизм игры и взаимодействие с командой</div>
        </div>
        <div className='col-xs-12 col-md-12 tab-mycourses' style={{ padding: '10px 0px 0px 0px',
          backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/tab.png?alt=media&token=0d486288-bd6b-4503-80f3-3304e87b6470)' }}>
          <div>
            <span className='my-courses-mycourses'>Мои курсы</span>
            {!courses.length && <div className='no-courses-mycourses'> You havent any courses yet</div>}
            {!!courses.length && <div className='div-scroll-mycourses scroll-horizontal-mycourses'>
              {this.renderCourses()}
            </div> }
          </div>
        </div>
        {/* <h4>You have {courses.length} paid {coursesCount}</h4> */}
      </div>
    )
  }
}
UserCoursesList.propTypes = {
  userCourses: React.PropTypes.array,
  auth: React.PropTypes.object,
  user: React.PropTypes.object
}

export default UserCoursesList
