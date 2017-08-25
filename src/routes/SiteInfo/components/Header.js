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
      logOutRu: '',
      facultiesEng: '',
      tournamentsEng: '',
      forumEng: '',
      myCoursesEng: '',
      statisticsEng: '',
      logOutEng: ''
    }
  }

  componentWillMount () {
    this.fetchSiteInfoRu()
    this.fetchSiteInfoEng()
  }

  fetchSiteInfoRu () {
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

  fetchSiteInfoEng () {
    this.setState({
      info: [],
      infoLoaded: false
    })
    firebase.database().ref('siteInfo/' + 'header/' + 'english')
    .once('value')
    .then(snapshot => {
      const object = snapshot.val()
      if (object !== null) {
        const {
          facultiesEng,
          tournamentsEng,
          forumEng,
          myCoursesEng,
          statisticsEng,
          logOutEng
        } = object
        this.setState({
          facultiesEng,
          tournamentsEng,
          forumEng,
          myCoursesEng,
          statisticsEng,
          logOutEng,
          siteInfoLoaded: true })
      } else {
        this.setState({ siteInfoLoaded: true })
      }
    }
  )
  }

  editSiteInfo () {
    this.editSiteInfoRu()
    this.editSiteInfoEng()
  }

  editSiteInfoRu () {
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

  editSiteInfoEng () {
    const {
      facultiesEng,
      tournamentsEng,
      forumEng,
      myCoursesEng,
      statisticsEng,
      logOutEng
    } = this.state
    console.log(facultiesEng, tournamentsEng, forumEng, myCoursesEng, statisticsEng, logOutEng)
    const dateEdited = Date.now()
    firebase.database().ref('siteInfo/' + 'header/' + 'english')
    .update({
      facultiesEng,
      tournamentsEng,
      forumEng,
      myCoursesEng,
      statisticsEng,
      logOutEng,
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
      logOutRu,
      facultiesEng,
      tournamentsEng,
      forumEng,
      myCoursesEng,
      statisticsEng,
      logOutEng
    } = this.state
    return (
      <div className='container'>
        <div className='row'>
          <form className='form-horizontal col-md-6'>

            <div className='form-group'>
              <h2>Russian</h2>
            </div>

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

          <form className='form-horizontal col-md-6'>

            <div className='form-group'>
              <h2>English</h2>
            </div>

            <div className='form-group'>
              <label className='control-label'>Faculties</label>
              <input
                value={facultiesEng}
                type='text'
                className='form-control form-control-siteinfo' onChange={(e) => this.setState({ facultiesEng: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>Tournaments</label>
              <input
                value={tournamentsEng}
                type='text'
                className='form-control form-control-siteinfo' onChange={(e) => this.setState({ tournamentsEng: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>Forum</label>
              <input
                value={forumEng}
                type='text'
                className='form-control form-control-siteinfo' onChange={(e) => this.setState({ forumEng: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>My Courses</label>
              <input
                value={myCoursesEng}
                type='text'
                className='form-control form-control-siteinfo' onChange={(e) => this.setState({ myCoursesEng: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>Statistics</label>
                <input
                  value={statisticsEng}
                  type='text'
                  className='form-control form-control-siteinfo' onChange={(e) => this.setState({ statisticsEng: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>Log Out</label>
                <input
                  value={logOutEng}
                  type='text'
                  className='form-control form-control-siteinfo' onChange={(e) => this.setState({ logOutEng: e.target.value })} />
            </div>
          </form>

          <div className='col-xs-12 col-md-12'>
            <button
              type='button'
              className='btn btn-success lg'
              style={{ width:'95%' }}
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
