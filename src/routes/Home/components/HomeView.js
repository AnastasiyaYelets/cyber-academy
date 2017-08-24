import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import './HomeView.scss'
import Slider from 'react-slick'
import VideoPlayer from './VideoPlayer'
import firebase from 'firebase'

class HomeView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showVideo: false,
      transactionToChange: {},
      stopVideo:false,
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
    })
  }

  render () {
    const { showVideo, stopVideo } = this.state
    console.log(this.props)
    const settings = {
      accessibility: false,
      autoplay: true,
      autoplaySpeed: 3000,
      centerMode: false,
      useCSS: true,
      fade:true,
      arrows: false,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    }
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
    const classNameButtonPause = stopVideo && showVideo ? 'pauseVideoToParents-home' : 'playVideoToParents-home'
    const videoButtonName = showVideo ? videoButtonCoverVideoRu : videoButtonVideoToParentsRu
    return (
      <div className='container'>
        <div className='row'>

          {!showVideo &&
            <div className='content-home'>
              { <Slider {...settings}>
                <div className='sliderDota-home'
                  style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sliderDota.jpg?alt=media&token=15ae6608-fd44-426d-a363-3cb76852816a)'}}
                  ></div>
                  <div className='sliderCSGO-home'
                    style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sliderCSGO.jpg?alt=media&token=3759d60e-e83a-49b8-b035-20417f63c1bb)'}}
                    ></div>
                  </Slider> }

                  <div className='fourQuaters-home'>
                    <div className='quater1-home'
                      style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater1.jpg?alt=media&token=bc601b6e-1b69-4577-9516-990632295b32)'}}
                      >
                        <div className='text-home'>
                          {quaterText1Ru}
                        </div>
                    </div>

                    <div className='quater2-home'
                      style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater2.jpg?alt=media&token=81576f1b-f2db-47a5-ac13-47800638a1ea)'}}
                      >
                      <div className='text-home'>
                        {quaterText2Ru}
                      </div>
                    </div>

                    <div className='quater3-home'
                      style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater3.jpg?alt=media&token=7465059e-d328-453d-8654-c6cb877ee9cf)'}}
                      >
                      <div className='text-home'>
                        {quaterText3Ru}
                      </div>
                    </div>

                    <div className='quater4-home'
                      style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater4.jpg?alt=media&token=8b03c259-44ee-44cc-ab5f-f3bee55c99d1)'}}
                      >
                      <div className='text-home'>
                        {quaterText4Ru}
                      </div>
                    </div>
                  </div>

                  <div className='col-xs-12 col-md-12'>
                    <div className='btnStart-home'
                      style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/btnStartEduc.png?alt=media&token=3699ba5c-b048-4656-914f-5b1c5b9afcb7)'}}
                      onClick={() => { browserHistory.push({ pathname: '/faculties' }) }}
                      >
                        {buttonTextRu}
                    </div>
                  </div>
                </div>}
                {!!showVideo && <div style={{ marginTop: '30px' }}>
                  <div>
                    <VideoPlayer
                      url={linkVideoToParentsRu}
                      stopVideo={stopVideo && showVideo}
                    />
                  </div>
                </div>}
                <div className='videoToParents-home' >
                  <div
                    className={classNameButtonPause}
                    onClick={() => { this.setState({ stopVideo: !stopVideo, showVideo:true }) }}
                  >
                  </div>
                  <div className='textVideoToParents-home'
                    onClick={() => { this.setState({ showVideo: !showVideo, stopVideo: !showVideo  }) }}
                    >{videoButtonName}
                  </div>
               </div>
             </div>
          </div>
        )
      }
    }
export default HomeView
