import React, {Component} from 'react'
import firebase from 'firebase'
import {browserHistory} from 'react-router'
import './disciplines.scss'
import _ from 'lodash'

class MainView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: [],
      coursesFetched: false
    }
  }

  componentWillMount () {
    const { params } = this.props
    this.fetchCourses(params.discipline)
  }

  componentWillReceiveProps (nextProps) {
    if (this.props.params.discipline !== nextProps.params.discipline) {
      this.fetchCourses(nextProps.params.discipline)
    }
  }

  fetchCourses (discipline) {
    firebase.database().ref('courses').orderByChild('discipline').equalTo(discipline).once('value').then(snapshot => {
      const object = snapshot.val()

      if (object !== null) {
        const courses = Object.keys(object).map(id => ({
          ...object[id],
          id
        }))
        this.setState({ courses, coursesFetched: true })
      } else {
        this.setState({ coursesFetched: true })
      }
    })
  }
  countVoises (count) {
    if (count % 10 === 1) {
      return (' голос')
    } else {
      const isACount = (count % 10 === 2 || count % 10 === 3 || count % 10 === 4)
      const voises = isACount
        ? ' голоса'
        : ' голосов'
      return (voises)
    }
  }

  isFull (number, mark) {
    if (mark * 2 >= number) {
      return true
    } else {
      return false
    }
  }
  starEmpty () {
    return <div className='starEmpty-faculty' style={{
      backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starEmpty.png?alt=media&token=ed75e31f-f32d-45f2-a818-e2dd2b73f717)'
    }}></div>
  }
  starHalf () {
    return <div className='starHalf-faculty' style={{
      backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starHalf.png?alt=media&token=f7c5b1fc-908c-4b68-800f-859c77d2c485)'
    }}></div>
  }
  starFull () {
    return <div className='starFull-faculty' style={{
      backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starFull.png?alt=media&token=9df71fb7-fc2c-44ba-b3a0-c8f641fec3cb)'
    }}></div>
  }
  countStars (mark) {
    const arrayMarkDouble = _.range((mark * 2) + 1)
    return (
      <div className='stars-faculty'>

        {!this.isFull(2, mark) && this.starHalf()}
        {this.isFull(2, mark) && this.starFull()}
        {!arrayMarkDouble.includes(1) && this.starEmpty()}

        {!this.isFull(4, mark) && arrayMarkDouble.includes(3) && this.starHalf()}
        {this.isFull(4, mark) && arrayMarkDouble.includes(4) && this.starFull()}
        {!arrayMarkDouble.includes(3) && this.starEmpty()}

        {!this.isFull(6, mark) && arrayMarkDouble.includes(5) && this.starHalf()}
        {this.isFull(6, mark) && arrayMarkDouble.includes(6) && this.starFull()}
        {!arrayMarkDouble.includes(5) && this.starEmpty()}

        {!this.isFull(8, mark) && arrayMarkDouble.includes(7) && this.starHalf()}
        {this.isFull(8, mark) && arrayMarkDouble.includes(8) && this.starFull()}
        {!arrayMarkDouble.includes(7) && this.starEmpty()}

        {!this.isFull(10, mark) && arrayMarkDouble.includes(9) && this.starHalf()}
        {this.isFull(10, mark) && arrayMarkDouble.includes(10) && this.starFull()}
        {!arrayMarkDouble.includes(9) && this.starEmpty()}
      </div>
    )
  }
  rederCourses () {
    const { courses } = this.state
    return courses.map((course, i) => (
      <div key={i}>
        <div className='col-sm-4 col-md-4'>
          <div className={`course${i % 3}-faculty`}>
            <div className='text-time-faculty'>
              {course.duration}
            </div>
            <div className='text-name-faculty'>
              {course.name}
            </div>
            <div className='text-course-faculty'>
              {course.description}
            </div>

            <div className='text-starMark-faculty'>
              {this.countStars(course.starMark)}
              {course.reviewNumber}
              {this.countVoises(course.reviewNumber)}
            </div>
          </div>

          <div className='btn-start-faculty' style={{
            backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/btnStartEduc.png?alt=media&token=3699ba5c-b048-4656-914f-5b1c5b9afcb7)'
          }} onClick={() => {
            browserHistory.push({ pathname: `/faculty/${course.discipline}/course/${course.id}`})
          }}>Начать обучение {/* {startButton} */}
          </div>
        </div>

      </div>
    ))
  }
  render () {
    const { coursesFetched, courses } = this.state
    const { params } = this.props
    if (!coursesFetched) {
      return (
        <div>Loading...</div>
      )
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8 col-md-8'>
            <div className='description-faculty text-description-faculty' style={{
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/description.jpg?alt=media&token=2ee26469-daec-47ac-85a5-47b7189c151c)'
            }}>
              ЗДЕСЬ МЫ ВОСПИТЫВАЕМ СТРАТЕГОВ И МЫСЛИТЕЛЕЙ, РАЗВИВАЕМ ЖИВОСТЬ УМА И РЕАКЦИЮ, РАСТИМ ДОСТОЙНЫХ И ЦИВИЛИЗОВАННЫХ ИГРОКОВ. ДОБРО ПОЖАЛОВАТЬ НА ФАКУЛЬТЕТ! {/* {hiWord} */}
            </div>
          </div>
          <div className='col-sm-4 col-md-4 '>
            <div className='logo-Dota2-faculty' style={{
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/logoDota2.jpg?alt=media&token=166fa54d-57f8-4b3c-adc8-c0562f759f0c)'
            }} // logoBannerDota:'',

              // logoBannerCSGO:'',

              // logoBannerLoL:'',

            ></div>
          </div>
          {this.rederCourses()}
          <div className='col-sm-4 col-md-4'>
            <div className='avatar-faculty' style={{
              width: '359px',
              height: '120px',
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/avatar.jpg?alt=media&token=67022f3a-c280-48c3-b802-af9b3d489e9d)'
            }}></div>
          </div>
          <div className='col-sm-8 col-md-8'>
            <div className='reviews-faculty text-reviews-faculty' style={{
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/reviews.jpg?alt=media&token=d7c70d5b-d484-4313-8ef6-c3425160eca9)'
            }}>
              {/* <CommentList
                courseId={params.courseId}
                reviews
                reviewsImg
              /> */}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
MainView.propTypes = {
  params: React.PropTypes.object,
  discipline: React.PropTypes.string
}

export default MainView
