import React, { Component } from 'react'
import { Link, browserHistory } from 'react-router'
import './homeView.scss'
import Slider from 'react-slick'
import VideoPlayer from './VideoPlayer'

class HomeView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      showVideo: false,
      transactionToChange: {}
    }
  }
  render () {
    const { showVideo } = this.state
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
    return (
      <div className='container'>
        <div className='row'>

            {!showVideo && <div className='content-home'>
              {
                <Slider {...settings}>
                  <div className='sliderDota-home'
                       style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sliderDota.jpg?alt=media&token=1b449ffe-f1f1-4a9c-9927-c5bc29a84129)'}}
                    ></div>
                  <div className='sliderCSGO-home'
                      style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sliderCSGO.jpg?alt=media&token=05a5f7a9-feb1-489d-abb9-4b601cd41bc7)'}}
                    ></div>
                </Slider>
              }


            {/* <div className='col-xs-12 col-md-12'> */}

              <div className='fourQuaters-home'>
                {/* <div className='col-sm-3 col-md-3'> */}
                  <div className='quater1-home'
                       style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater1.jpg?alt=media&token=1a689d21-c801-4ac3-98f6-05dd5563f551)'}}
                  >
                    <div className='text-home'>
                      Изучи механизм игры и взаимодействие с командой
                      {/* {quaterText1} */}
                    </div>
                  </div>
                {/* </div> */}
                {/* <div className='col-sm-3 col-md-3'> */}
                  <div className='quater2-home'
                       style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater2.jpg?alt=media&token=cceeae04-2905-4cc3-82a4-d24d2e1d1631)'}}
                   >
                    <div className='text-home'>
                      Улучши свои навыки и контроль за игрой
                      {/* {quaterText2} */}
                    </div>
                  </div>
                {/* </div> */}
                {/* <div className='col-sm-3 col-md-3'> */}
                  <div className='quater3-home'
                       style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater3.jpg?alt=media&token=d75693f9-7274-41e8-8cff-bb6620192be7)'}}
                  >
                    <div className='text-home'>
                      Изучи продвинутые техники профессиональных спортсменов и научись их применять
                      {/* {quaterText3} */}
                    </div>
                  </div>
                {/* </div> */}
                {/* <div className='col-sm-3 col-md-3'> */}
                  <div className='quater4-home'
                       style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/quater4.jpg?alt=media&token=09f73a11-9f50-40ec-831d-e239756ac515)'}}
                  >
                    <div className='text-home'>
                      Каждый ученик получает право бесплатно попасть на турнир с 2000$ призовых
                      {/* {quaterText4} */}
                    </div>
                  </div>
                {/* </div> */}
              </div>
            {/* </div> */}

                <div className='col-xs-12 col-md-12'>
                  <div className='btnStart-home'
                       style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/btnStartEduc.png?alt=media&token=4e529803-02a9-490d-aa97-6603e520340a)'}}
                       onClick={() => {  browserHistory.push({ pathname: '/faculties'}) }}
                    >
                    Начать обучение
                    {/* {buttonText} */}
                  </div>
                </div>
  </div>

          }
            {!!showVideo && <div style={{ marginTop: '30px' }}>
              <div>
                <VideoPlayer
                  url={`https://www.youtube.com/watch?v=fvySzEH85hk`}
                  // url={`linkVideoToParents`}
                />
              </div>
            </div>}
          <button
            type='button'
            className='videoToParents-home'
            style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/videoToParents.jpg?alt=media&token=fbfccf7a-9e8c-45d7-ba14-6d18b6a37254)'}}
            onClick={() => { this.setState({ showVideo: !showVideo }) }}
            >
         </button>
        </div>
      </div>
    )
  }
}

export default HomeView
