import React, { Component, PropTypes } from 'react'
import { IndexLink, Link, browserHistory } from 'react-router'
import './Footer.scss'
import firebase from 'firebase'
import LocalizedStrings from 'react-localization'

class Footer extends Component {
  constructor (props) {
    super(props)
    this.state = {
      words: ['about', 'becomeACoach', 'support', 'terms', 'coaches', 'vipStandartAccount', 'vipVipAccount'],
      wordsEng: {},
      wordsRu: {},
      strings: {}
    }
  }

  componentDidMount () {
    this.fetchText('footer')
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

  render () {
    const { strings } = this.state
    return (
      <div className='container'>
        <div className='row'>
          <div className='footer-block-footer '>
            <div className='container d-flex align-items-start'>
              <a className='block-footer ' href='/about'>{strings.about}</a>
              <a className='block-footer ' href='/becomeacoach'>{strings.becomeACoach}</a>
              <a className='block-footer ' href='/vip'>{strings.vipStandartAccount}</a>
              <a className='block-footer ' href='/vip'>{strings.vipVipAccount}</a>
              <a className='block-footer ' href='/support'>{strings.support}</a>
              <a className='block-footer ' href='/terms'>{strings.terms}</a>
              <a className='block-footer ' href='/coaches'>{strings.coaches}</a>
              <a href='http://facebook.com'><p className='fb-footer '
                style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sm-fb.png?alt=media&token=102f2bd1-7284-47fa-bb93-1a19044d6c31)'}}
                ></p></a>
              <a href='http://viber.com'><p className='viber-footer'
                style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sm-twitter.png?alt=media&token=7188ed23-a878-4b5a-92d4-4f950c0ddb95)'}}
                ></p></a>
              <a href='http://twitter.com'><p className='twitter-footer'
                style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sm-viber.png?alt=media&token=e7178a41-5beb-407d-94e3-e268e15e488c)'}}
                ></p></a>
              <a href='http://vk.com' ><p className='vk-footer'
                style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sm-vk.png?alt=media&token=9bdf350e-808c-4f02-81a8-5f9ca8bf9d7c)'}}
                ></p></a>
            </div>
          </div>
        </div>
      </div>
    )
  }

}
Footer.propTypes = {
  user: PropTypes.object
}

export default Footer
