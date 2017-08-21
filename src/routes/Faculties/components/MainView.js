import React, {Component} from 'react'
import firebase from 'firebase'
import {browserHistory} from 'react-router'
import './faculties.scss'
class MainView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      courses: [],
      coursesFetched: false
    }
  }

  componentWillMount() {}

  render() {
    return (
      <div className='container'>
        <div className='content-faculties'>
          <div className='row'>
            <div className='col-sm-4 col-md-4'>
              <div className='third1-faculties' onClick={() => {
                browserHistory.push({pathname: '/faculty/CS:GO'})
              }}></div>
              <div className='btnEnterFacult-faculties' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/btnEnterFacult.png?alt=media&token=fd547211-281b-49a0-97c4-37b45691a719)'
              }} onClick={() => {
                browserHistory.push({pathname: '/faculty/CS:GO'})
              }}>
                Поступить на факультет {/* {CSGOButton} */}
              </div>
              <div className='textFrame-faculties' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/textFrame.jpg?alt=media&token=fc8f06c4-b584-4303-9a81-e3ded24b2a10)'
              }}>
                Получай заслуженные награды {/* {CSGODescription} */}
              </div>
            </div>
            <div className='col-sm-4 col-md-4'>
              <div className='third2-faculties' onClick={() => {
                browserHistory.push({pathname: '/faculty/Dota2'})
              }}></div>
              <div className='btnEnterFacult-faculties' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/btnEnterFacult.png?alt=media&token=fd547211-281b-49a0-97c4-37b45691a719)'
              }} onClick={() => {
                browserHistory.push({pathname: '/faculty/Dota2'})
              }}>
                Поступить на факультет {/* {DotaButton} */}
              </div>
              <div className='textFrame-faculties' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/textFrame.jpg?alt=media&token=fc8f06c4-b584-4303-9a81-e3ded24b2a10)'
              }}>
                Получай заслуженные награды {/* {DotaDescription} */}
              </div>
            </div>
            <div className='col-sm-4 col-md-4'>
              <div className='third3-faculties' onClick={() => {
                browserHistory.push({pathname: '/faculty/LoL'})
              }}></div>
              <div className='btnEnterFacult-faculties' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/btnEnterFacult.png?alt=media&token=fd547211-281b-49a0-97c4-37b45691a719)'
              }} onClick={() => {
                browserHistory.push({pathname: '/faculty/LoL'})
              }}>
                Поступить на факультет {/* {LoLButton} */}
              </div>
              <div className='textFrame-faculties' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/textFrame.jpg?alt=media&token=fc8f06c4-b584-4303-9a81-e3ded24b2a10)'
              }}>
                Получай заслуженные награды {/* {LoLDescription} */}
              </div>
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
