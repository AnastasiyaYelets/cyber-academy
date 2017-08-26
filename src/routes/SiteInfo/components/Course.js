import React, { Component } from 'react'
import { browserHistory } from 'react-router'
import firebase from 'firebase'
import toastr from 'toastr'
import './siteInfo.scss'

class Course extends Component {
  constructor (props) {
    super(props)
    this.state = {
      siteInfoLoaded: false,
      words: ['duration'],
      wordsEng: {},
      wordsRu: {}
    }
  }

  componentWillMount () {
    this.fetchSiteInfo('course')
  }

  fetchSiteInfo (page) {
    this.setState({
      infoLoaded: false
    })
    firebase.database().ref('siteInfo/' + `${page}/`)
    .once('value')
    .then(snapshot => {
      const object = snapshot.val()
      if (object !== null) {
        this.saveInfo('russian', 'Ru', object)
        this.saveInfo('english', 'Eng', object)
      } else {
        this.setState({ siteInfoLoaded: true })
      }
    }
  )
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

  editSiteInfo () {
    const { wordsEng, wordsRu } = this.state
    firebase.database().ref('siteInfo/' + 'course/')
    .update({
      english: wordsEng,
      russian: wordsRu
    })
    .then(() => {
      toastr.success('Your siteInfo saved!')
      browserHistory.push(`/admin/siteInfo`)
    })
  }

  renderFields (suff) {
    const { wordsEng, wordsRu } = this.state
    const arrayFields = suff === 'Ru' ? wordsRu : wordsEng
    return (
      <div>
        {Object.keys(arrayFields).map((item, i) =>
          <div className='form-group' key={i}>
            <label className='control-label'>{item}</label>
            <input
              value={arrayFields[`${item}`]}
              type='text'
              className='form-control form-control-siteinfo'
              onChange={(e) => {
                const newArray = arrayFields
                newArray[`${item}`] = e.target.value
                if (suff === 'Ru') {
                  this.setState({ wordsRu: newArray })
                } else if (suff === 'Eng') {
                  this.setState({ wordsEng: newArray })
                }
              }
            }
            />
          </div>
          )
        }
      </div>
    )
  }

  renderCoursesList () {
    return (
      <div className='container'>
        <div className='row'>
          <form className='form-horizontal col-md-6'>
            <div className='form-group'>
              <h2>Russian</h2>
            </div>
            {this.renderFields('Ru')}
          </form>

          <form className='form-horizontal col-md-6'>
            <div className='form-group'>
              <h2>English</h2>
            </div>
            {this.renderFields('Eng')}
          </form>

          <div className='col-xs-12 col-md-12'>
            <button
              type='button'
              className='btn btn-success lg'
              style={{ width:'30%' }}
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

export default Course
