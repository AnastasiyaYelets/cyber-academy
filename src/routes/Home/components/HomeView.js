import React, {Component} from 'react'
import {Link, browserHistory} from 'react-router'
import './homeView.scss'
import Slider from 'react-slick'
import VideoPlayer from './VideoPlayer'

class HomeView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showVideo: false,
      transactionToChange: {},
      stopVideo: false
    }
  }
  render() {
    const {showVideo, stopVideo} = this.state
    const settings = {
      accessibility: false,
      autoplay: true,
      autoplaySpeed: 3000,
      centerMode: false,
      useCSS: true,
      fade: true,
      arrows: false,
      dots: false,
      infinite: true,
      slidesToShow: 1,
      slidesToScroll: 1
    }
    const classNameButtonPause = stopVideo && showVideo
      ? 'pauseVideoToParents-home'
      : 'playVideoToParents-home'
    const videoButtonName = showVideo
      ? 'СВЕРНУТЬ ВИДЕО'
      : 'ВИДЕООБРАЩЕНИЕ К РОДИТЕЛЯМ'
    return (
      <div className='container'>
        <div className='row'>

          {!showVideo && <div className='content-home'>
            {< Slider {
              ...settings
            } > <div className='sliderDota-home' style={{
              backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sliderDota.jpg?alt=media&token=15ae6608-fd44-426d-a363-3cb76852816a)'
            }}></div> < div className = 'sliderCSGO-home'
            style = {{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sliderCSGO.jpg?alt=media&token=3759d60e-e83a-49b8-b035-20417f63c1bb)'}} > </div> < /Slider>}

            <div className='fourQuaters-home'>
              <div className='quater1-home' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater1.jpg?alt=media&token=bc601b6e-1b69-4577-9516-990632295b32)'
              }}>
                <div className='text-home'>
                  Изучи механизм игры и взаимодействие с командой {/* {quaterText1} */}
                </div>
              </div>

              <div className='quater2-home' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater2.jpg?alt=media&token=81576f1b-f2db-47a5-ac13-47800638a1ea)'
              }}>
                <div className='text-home'>
                  Улучши свои навыки и контроль за игрой {/* {quaterText2} */}
                </div>
              </div>

              <div className='quater3-home' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater3.jpg?alt=media&token=7465059e-d328-453d-8654-c6cb877ee9cf)'
              }}>
                <div className='text-home'>
                  Изучи продвинутые техники профессиональных спортсменов и научись их применять {/* {quaterText3} */}
                </div>
              </div>

              <div className='quater4-home' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater4.jpg?alt=media&token=8b03c259-44ee-44cc-ab5f-f3bee55c99d1)'
              }}>
                <div className='text-home'>
                  Каждый ученик получает право бесплатно попасть на турнир с 2000$ призовых {/* {quaterText4} */}
                </div>
              </div>
            </div>

            <div className='col-xs-12 col-md-12'>
              <div className='btnStart-home' style={{
                backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/btnStartEduc.png?alt=media&token=3699ba5c-b048-4656-914f-5b1c5b9afcb7)'
              }} onClick={() => {
                browserHistory.push({pathname: '/faculties'})
              }}>
                Начать обучение {/* {buttonText} */}
              </div>
            </div>
          </div>}
          {!!showVideo && <div style={{
            marginTop: '30px'
          }}>
            <div>
              <VideoPlayer url={`https://www.youtube.com/watch?v=fvySzEH85hk`} stopVideo={stopVideo && showVideo}/>
            </div>
          </div>}
          <div className='videoToParents-home'>
            <div className={classNameButtonPause} onClick={() => {
              this.setState({
                stopVideo: !stopVideo,
                showVideo: true
              })
            }}></div>
            <div className='textVideoToParents-home' onClick={() => {
              this.setState({
                showVideo: !showVideo
              })
            }}>{videoButtonName}
            </div>
          </div>
        </div>
      </div>
    )
  }
}
export default HomeView
