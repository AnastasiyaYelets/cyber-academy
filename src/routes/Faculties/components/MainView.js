import React, {Component} from 'react'
import firebase from 'firebase'
import {browserHistory} from 'react-router'
import './faculties.scss'
import LocalizedStrings from 'react-localization'

class MainView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      // courses: [],
      // coursesFetched: false,
      words: ['DotaButton', 'LoLButton', 'CSGOButton', 'DotaDescription', 'LoLDescription', 'CSGODescription'],
      wordsEng: {},
      wordsRu: {},
      strings: {}
    }
  }

  componentDidMount () {
    this.fetchText('faculties')
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

  render() {
    const { strings } = this.state
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
                {strings.CSGOButton}
              </div>
              <div className='textFrame-faculties' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/textFrame.jpg?alt=media&token=fc8f06c4-b584-4303-9a81-e3ded24b2a10)'
              }}>
                {strings.CSGODescription}
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
                {strings.DotaButton}
              </div>
              <div className='textFrame-faculties' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/textFrame.jpg?alt=media&token=fc8f06c4-b584-4303-9a81-e3ded24b2a10)'
              }}>
                {strings.DotaDescription}
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
                {strings.LoLButton}
              </div>
              <div className='textFrame-faculties' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/textFrame.jpg?alt=media&token=fc8f06c4-b584-4303-9a81-e3ded24b2a10)'
              }}>
                {strings.LoLDescription}
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
