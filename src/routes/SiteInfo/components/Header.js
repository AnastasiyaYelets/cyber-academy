import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import firebase from 'firebase'
import toastr from 'toastr'
import './siteInfo.scss'

class Header extends Component {
  constructor (props) {
    super(props)
    this.state = {
      siteInfoLoaded: false,
      facultiesRu: '',
      tournamentsRu: '',
      forumRu: '',
      myCoursesRu: '',
      statisticsRu: '',
      logOutRu: ''
    }
  }

  componentWillMount () {
    this.fetchSiteInfo()
  }

  fetchSiteInfo () {
    this.setState({
      info: [],
      infoLoaded: false
    })
    firebase.database().ref('siteInfo/' + 'header/' + 'russian')
    .once('value')
    .then(snapshot => {
      const object = snapshot.val()
      if (object !== null) {
        const {
          facultiesRu,
          tournamentsRu,
          forumRu,
          myCoursesRu,
          statisticsRu,
          logOutRu
        } = object
        this.setState({
          facultiesRu,
          tournamentsRu,
          forumRu,
          myCoursesRu,
          statisticsRu,
          logOutRu,
          siteInfoLoaded: true })
      } else {
        this.setState({ siteInfoLoaded: true })
      }
    }
  )
  }

  editSiteInfo () {
    const {
      facultiesRu,
      tournamentsRu,
      forumRu,
      myCoursesRu,
      statisticsRu,
      logOutRu
    } = this.state
    console.log(facultiesRu, tournamentsRu, forumRu, myCoursesRu, statisticsRu, logOutRu)
    const dateEdited = Date.now()
    firebase.database().ref('siteInfo/' + 'header/' + 'russian')
    .update({
      facultiesRu,
      tournamentsRu,
      forumRu,
      myCoursesRu,
      statisticsRu,
      logOutRu,
      dateEdited
    })
    .then(() => {
      toastr.success('Your siteInfo saved!')
      browserHistory.push(`/admin/siteInfo`)
    })
  }

  renderCoursesList () {
    const {
      facultiesRu,
      tournamentsRu,
      forumRu,
      myCoursesRu,
      statisticsRu,
      logOutRu
    } = this.state
    return (
      <div className='container'>
        <div className='row'>
          <form className='form-horizontal'>

            <div className='form-group'>
              <label className='control-label'>Faculties</label>
              <input
                value={facultiesRu}
                type='text'
                className='form-control form-control-siteinfo' onChange={(e) => this.setState({ facultiesRu: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>Tournaments</label>
              <input
                value={tournamentsRu}
                type='text'
                className='form-control form-control-siteinfo' onChange={(e) => this.setState({ tournamentsRu: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>Forum</label>
              <input
                value={forumRu}
                type='text'
                className='form-control form-control-siteinfo' onChange={(e) => this.setState({ forumRu: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>My Courses</label>
              <input
                value={myCoursesRu}
                type='text'
                className='form-control form-control-siteinfo' onChange={(e) => this.setState({ myCoursesRu: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>Statistics</label>
                <input
                  value={statisticsRu}
                  type='text'
                  className='form-control form-control-siteinfo' onChange={(e) => this.setState({ statisticsRu: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>Log Out</label>
                <input
                  value={logOutRu}
                  type='text'
                  className='form-control form-control-siteinfo' onChange={(e) => this.setState({ logOutRu: e.target.value })} />
            </div>
          </form>

          <div className='col-xs-12 col-md-12'>
            <button
              type='button'
              className='btn btn-success lg'
              style={{ width:'100%', margin: '15px' }}
              onClick={() => this.editSiteInfo()}
              >Save changes
            </button>
          </div>
        </div>
      </div>
    )
  }
  render () {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-xs-6 col-md-10' style={{ padding: '15px' }}>
            <ul className='list-unstyled'>
              {this.renderCoursesList()}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default Header