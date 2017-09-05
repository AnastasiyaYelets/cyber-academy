import React, { Component } from 'react'
import firebase from 'firebase'
import { browserHistory } from 'react-router'
import './myCourses.scss'
import LocalizedStrings from 'react-localization'

class UserCoursesList extends Component {
  constructor (props) {
    super(props)
    this.state = {
      courses: [],
      coursesLoaded: false,
      userCourses: [],
      words: ['leftHalfText', 'rightHalfText', 'moreDetailsBtn', 'myCourses', 'haventCourses'],
      wordsEng: {},
      wordsRu: {},
      strings: {}
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

  componentDidMount () {
    this.fetchText('mycourses')
  }

  componentWillReceiveProps (nextProps) {
    this.props.language !== nextProps.language && this.setLanguage(nextProps.language)
  }

  setLanguage (language) {
    const { strings } = this.state
    strings.setLanguage(language.language)
    this.setState({ strings })
  }

  fetchText (page) {
    firebase.database().ref('siteInfo/' + `${page}/`)
    .once('value')
    .then(snapshot => {
      const object = snapshot.val()
      if (object !== null) {
        this.saveInfo('russian', 'Ru', object)
        this.saveInfo('english', 'Eng', object)
        this.makeStrings()
      } else {
        this.setState({ siteInfoLoaded: true })
      }
    })
  }

  saveInfo (language, suff, object) {
    const { words } = this.state
    if (suff === 'Ru') {
      let wordsRu = {}
      words.forEach(item => {
        wordsRu[`${item}${suff}`] = object[`${language}`][`${item}${suff}`]
      })
      this.setState({ wordsRu, siteInfoLoaded: true })
    } else if (suff === 'Eng') {
      let wordsEng = {}
      words.forEach(item => {
        wordsEng[`${item}${suff}`] = object[`${language}`][`${item}${suff}`]
      })
      this.setState({ wordsEng, siteInfoLoaded: true })
    }
  }

  makeStrings () {
    const { words, wordsEng = {}, wordsRu = {} } = this.state
    let rus = {}
    let eng = {}
    words.forEach(item => {
      eng[`${item}`] = wordsEng !== {} ? wordsEng[`${item}Eng`] : 'no data'
      rus[`${item}`] = wordsRu !== {} ? wordsRu[`${item}Ru`] : 'no data'
    })
    let strings = new LocalizedStrings({
      rus: rus,
      eng: eng
    })
    this.setState({ strings })
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
             backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/progressBarFull.png?alt=media&token=e970a7a6-d1eb-4070-b95b-5c137e053147)' }}>
          <div className='progress-bar-mycourses' role='progressbar' aria-valuenow='40'
            aria-valuemin='0' aria-valuemax='100' style={{ width: `${percent}%`,
            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/progressBar.jpg?alt=media&token=9ffb5b28-8769-4498-a4e4-cde9ad64987e)' }}>
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
    const { courses, strings } = this.state
    const newCourses = [].concat(courses).concat(courses)
      return newCourses.map((course, i) => (
        <div key={i} className='frame-course-mycourses' style={{ padding: '5px', margin: '15px 6px 10px 6px',
             backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/frameLesson.jpg?alt=media&token=563e1028-8c78-40a7-a305-6a4767d2be1f)' }}>
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
              style={{  color: 'yellow', backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/buttonDetails.png?alt=media&token=081aad23-ce5c-4e1e-b34e-ec205ffb8bf9)'}}
              onClick={() => { browserHistory.push({ pathname: `/myCourses/course/${course.id}` }) }}
              >{strings.moreDetailsBtn}
            </div>
          </div>
        </div>
      ))
  }

  render () {
    const { coursesLoaded, courses, strings } = this.state
    console.log(this.props.auth.user)
    if (!coursesLoaded) {
      return (<div>Loading...</div>)
    }
    console.log('HASFBGIFB', this.props)
    // const isSCount = (courses.length !== 1)
    // const coursesCount = isSCount ? 'courses' : 'course'
    return (
      <div className='row'>
        <div className='col-xs-12 col-md-12' style={{ padding: '0px' }}>
          <div className='col-xs-2 col-md-2 ikon-dragon-mycourses'
            style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/ikonDragon.jpg?alt=media&token=335de009-e821-41ba-8c22-eb766a15fa3c)'}}
          ></div>
          <div className='col-xs-3 col-md-3 text-place-mycourses'>{strings.leftHalfText}</div>
          <div className='col-xs-7 col-md-7 text-frame-mycourses'
            style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/textFrameMyCourses.jpg?alt=media&token=ad349358-7811-419b-b95b-b7c777d0b667)'}}
          >{strings.rightHalfText}</div>
        </div>
        <div className='col-xs-12 col-md-12 tab-mycourses' style={{ padding: '10px 0px 0px 0px',
          backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/tab.png?alt=media&token=8f2c7a2f-3cb8-4c9e-883e-eb720e85174a)' }}>
          <div>
            <span className='my-courses-mycourses'>{strings.myCourses}</span>
            {!courses.length && <div className='no-courses-mycourses'>{strings.haventCourses}</div>}
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
