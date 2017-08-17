import React, { Component } from 'react'
import firebase from 'firebase'
import { browserHistory } from 'react-router'
import './disciplines.scss'
import _ from 'lodash'

class MainView extends Component {
  constructor (props) {
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
    firebase.database().ref('courses')
    .orderByChild('discipline')
    .equalTo(discipline)
    .once('value')
    .then(snapshot => {
      const object = snapshot.val()

      if (object !== null) {
        const courses = Object.keys(object).map(id => ({ ...object[id], id }))
        this.setState({ courses, coursesFetched: true })
      } else {
        this.setState({ coursesFetched: true })
      }
    })
  }
  countVoises (count) {
    if (count % 10 === 1) {
      return ('голос')
    } else {
      const isACount = (count % 10 === 2 || count % 10 === 3 || count % 10 === 4)
      const voises = isACount ? 'голоса' : 'голосов'
      return (voises)
    }
  }

  isFull (number, mark) {
    if (mark * 2 >= number) {
      return true
    } else { return false }
  }

  countStars (mark) {
    const arrayMarkDouble = _.range((mark * 2) + 1)
    return (
      <div className='stars-faculty'>

        {!this.isFull(2, mark) && arrayMarkDouble.includes(1) && <div className='starHalf-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starHalf.png?alt=media&token=62b5be9a-8c8a-4d89-b7da-0e75d0a65dac)'}}
         ></div>}
        {this.isFull(2, mark) && arrayMarkDouble.includes(2) && <div className='starFull-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starFull.png?alt=media&token=b229616c-a064-43b3-8ba9-c60293d8cd70)'}}
          ></div>}
        {!arrayMarkDouble.includes(1) && <div className='starEmpty-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starEmpty.png?alt=media&token=8ec63950-eb04-4242-8b63-90b5d1e8712b)'}}
          ></div>}

        {!this.isFull(4, mark) && arrayMarkDouble.includes(3) && <div className='starHalf-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starHalf.png?alt=media&token=62b5be9a-8c8a-4d89-b7da-0e75d0a65dac)'}}
        ></div>}
        {this.isFull(4, mark) && arrayMarkDouble.includes(4) && <div className='starFull-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starFull.png?alt=media&token=b229616c-a064-43b3-8ba9-c60293d8cd70)'}}
        ></div>}
        {!arrayMarkDouble.includes(3) && <div className='starEmpty-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starEmpty.png?alt=media&token=8ec63950-eb04-4242-8b63-90b5d1e8712b)'}}
        ></div>}

        {!this.isFull(6, mark) && arrayMarkDouble.includes(5) && <div className='starHalf-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starHalf.png?alt=media&token=62b5be9a-8c8a-4d89-b7da-0e75d0a65dac)'}}
        ></div>}
        {this.isFull(6, mark) && arrayMarkDouble.includes(6) && <div className='starFull-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starFull.png?alt=media&token=b229616c-a064-43b3-8ba9-c60293d8cd70)'}}
        ></div>}
        {!arrayMarkDouble.includes(5) && <div className='starEmpty-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starEmpty.png?alt=media&token=8ec63950-eb04-4242-8b63-90b5d1e8712b)'}}
        ></div>}

        {!this.isFull(8, mark) && arrayMarkDouble.includes(7) && <div className='starHalf-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starHalf.png?alt=media&token=62b5be9a-8c8a-4d89-b7da-0e75d0a65dac)'}}
        ></div>}
        {this.isFull(8, mark) && arrayMarkDouble.includes(8) && <div className='starFull-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starFull.png?alt=media&token=b229616c-a064-43b3-8ba9-c60293d8cd70)'}}
        ></div>}
        {!arrayMarkDouble.includes(7) && <div className='starEmpty-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starEmpty.png?alt=media&token=8ec63950-eb04-4242-8b63-90b5d1e8712b)'}}
        ></div>}

        {!this.isFull(10, mark) && arrayMarkDouble.includes(9) && <div className='starHalf-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starHalf.png?alt=media&token=62b5be9a-8c8a-4d89-b7da-0e75d0a65dac)'}}
        ></div>}
        {this.isFull(10, mark) && arrayMarkDouble.includes(10) && <div className='starFull-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starFull.png?alt=media&token=b229616c-a064-43b3-8ba9-c60293d8cd70)'}}
        ></div>}
        {!arrayMarkDouble.includes(9) && <div className='starEmpty-faculty'
          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/starEmpty.png?alt=media&token=8ec63950-eb04-4242-8b63-90b5d1e8712b)'}}
        ></div>}
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
              {this.countStars(course.starMark)} {course.reviewNumber} {this.countVoises(course.reviewNumber)}
            </div>
          </div>

          <div className='btn-start-faculty'
               style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/btnStartEduc.png?alt=media&token=4e529803-02a9-490d-aa97-6603e520340a)'}}
               onClick={() => {browserHistory.push({ pathname: `/faculty/${course.discipline}/course/${course.id}` })
            }}>Начать обучение
            {/* {startButton} */}
          </div>
        </div>

      </div>
    ))
  }
  render () {
    const { coursesFetched, courses } = this.state
    const { params } = this.props
    if (!coursesFetched) {
      return (<div>Loading...</div>)
    }
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-sm-8 col-md-8'>
            <div className='description-faculty text-description-faculty'
                 style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/description.jpg?alt=media&token=31ec9f84-6425-4356-b662-d07396ea41f7)'}}
              >
              ЗДЕСЬ МЫ ВОСПИТЫВАЕМ СТРАТЕГОВ И МЫСЛИТЕЛЕЙ, РАЗВИВАЕМ ЖИВОСТЬ УМА И РЕАКЦИЮ,
              РАСТИМ ДОСТОЙНЫХ И ЦИВИЛИЗОВАННЫХ ИГРОКОВ. ДОБРО ПОЖАЛОВАТЬ НА ФАКУЛЬТЕТ!
              {/* {hiWord} */}
            </div>
          </div>
          <div className='col-sm-4 col-md-4 '>
            <div className='logo-Dota2-faculty'
              style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/logoDota2.jpg?alt=media&token=43ab41b7-b71e-463d-9d97-3d05e5dc1d86)'}}
              // logoBannerDota:'',
              // logoBannerCSGO:'',
              // logoBannerLoL:'',
                >
            </div>
          </div>
          {this.rederCourses()}
          <div className='col-sm-4 col-md-4'>
            <div className='avatar-faculty' style={{
              width:'359px',
              height:'120px',
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/avatar.jpg?alt=media&token=88a9e8ab-1bed-4599-b50e-069990d9f787)'}}
            >
            </div>
          </div>
          <div className='col-sm-8 col-md-8'>
            <div className='reviews-faculty text-reviews-faculty'
                 style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/reviews.jpg?alt=media&token=02edbc8f-7f3d-4b70-8950-0045a6217288)'}}
              >
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
