import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import firebase from 'firebase'
import toastr from 'toastr'
import './siteInfo.scss'

class HomePage extends Component {
  constructor (props) {
    super(props)
    this.state = {
      siteInfoLoaded: false,
      quaterText1Ru: '',
      quaterText2Ru: '',
      quaterText3Ru: '',
      quaterText4Ru: '',
      linkVideoToParentsRu: '',
      buttonTextRu: '',
      videoButtonVideoToParentsRu: '',
      videoButtonCoverVideoRu: ''
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
    firebase.database().ref('siteInfo/' + 'russian/' + 'homepage')
    .once('value')
    .then(snapshot => {
      const object = snapshot.val()
      if (object !== null) {
        const {
          quaterText1Ru,
          quaterText2Ru,
          quaterText3Ru,
          quaterText4Ru,
          linkVideoToParentsRu,
          buttonTextRu,
          videoButtonVideoToParentsRu,
          videoButtonCoverVideoRu
        } = object
        this.setState({
          quaterText1Ru,
          quaterText2Ru,
          quaterText3Ru,
          quaterText4Ru,
          linkVideoToParentsRu,
          buttonTextRu,
          videoButtonVideoToParentsRu,
          videoButtonCoverVideoRu,
          siteInfoLoaded: true })
      } else {
        this.setState({ siteInfoLoaded: true })
      }
    }
  )
  }

  editSiteInfo () {
    const {
      quaterText1Ru,
      quaterText2Ru,
      quaterText3Ru,
      quaterText4Ru,
      linkVideoToParentsRu,
      buttonTextRu,
      videoButtonVideoToParentsRu,
      videoButtonCoverVideoRu
    } = this.state
    console.log(quaterText1Ru, quaterText2Ru, quaterText3Ru, quaterText4Ru, linkVideoToParentsRu, buttonTextRu)
    const dateEditedRu = Date.now()
    firebase.database().ref('siteInfo/' + 'russian/' + 'homepage')
    .update({
      quaterText1Ru,
      quaterText2Ru,
      quaterText3Ru,
      quaterText4Ru,
      linkVideoToParentsRu,
      buttonTextRu,
      dateEditedRu,
      videoButtonVideoToParentsRu,
      videoButtonCoverVideoRu
    })
    .then(() => {
      toastr.success('Your siteInfo saved!')
      browserHistory.push(`/admin/siteInfo`)
    })
  }

  renderCoursesList () {
    const {
      quaterText1Ru,
      quaterText2Ru,
      quaterText3Ru,
      quaterText4Ru,
      linkVideoToParentsRu,
      buttonTextRu,
      videoButtonVideoToParentsRu,
      videoButtonCoverVideoRu
    } = this.state
    return (
      <div className='container'>
        <div className='row'>
          <form className='form-horizontal'>

            <div className='form-group'>
              <label className='control-label'>quaterText1</label>
              <input
                value={quaterText1Ru}
                type='text'
                className='form-control s' onChange={(e) => this.setState({ quaterText1Ru: e.target.value })} />
            </div>

              <div className='form-group'>
                <label className='control-label'>quaterText2</label>
                <input
                  value={quaterText2Ru}
                  type='text'
                  className='form-control form-control-siteinfo' onChange={(e) => this.setState({ quaterText2Ru: e.target.value })} />
              </div>

            <div className='form-group'>
              <label className='control-label'>quaterText3</label>
              <input
                value={quaterText3Ru}
                type='text'
                className='form-control form-control-siteinfo' onChange={(e) => this.setState({ quaterText3Ru: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>quaterText4</label>
              <input
                value={quaterText4Ru}
                type='text'
                className='form-control form-control-siteinfo' onChange={(e) => this.setState({ quaterText4Ru: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'> Video link to parents</label>
                <input
                  value={linkVideoToParentsRu}
                  type='text'
                  className='form-control form-control-siteinfo' onChange={(e) => this.setState({ linkVideoToParentsRu: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>Button text</label>
                <input
                  value={buttonTextRu}
                  type='text'
                  className='form-control form-control-siteinfo' onChange={(e) => this.setState({ buttonTextRu: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>Video Button Video To Parents</label>
                <input
                  value={videoButtonVideoToParentsRu}
                  type='text'
                  className='form-control form-control-siteinfo' onChange={(e) => this.setState({ videoButtonVideoToParentsRu: e.target.value })} />
            </div>

            <div className='form-group'>
              <label className='control-label'>Video Button Cover Video</label>
                <input
                  value={videoButtonCoverVideoRu}
                  type='text'
                  className='form-control form-control-siteinfo' onChange={(e) => this.setState({ videoButtonCoverVideoRu: e.target.value })} />
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

export default HomePage
