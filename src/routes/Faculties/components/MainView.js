import React, { Component } from 'react'
import firebase from 'firebase'
import { browserHistory } from 'react-router'
import './faculties.scss'
class MainView extends Component {
  constructor (props) {
    super(props)

    this.state = {
      courses: [],
      coursesFetched: false
    }
  }

  componentWillMount () {
  }

  render () {
    return (
      <div className='container'>
        <div className='content-faculties'>
          <div className='row'>
            <div className='col-sm-4 col-md-4'>
              <div className='third1-faculties'
                   style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/bannerCSGOblue.jpg?alt=media&token=014e66d6-2f08-464e-9514-586d7350511d)'}}
                   onClick={() => { browserHistory.push({ pathname: '/faculty/CS:GO'}) }}>
              </div>
              <div className='btnEnterFacult-faculties'
                   style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/btnEnterFacult.png?alt=media&token=078e6b3c-3a3b-4116-9443-c18d4d2e650b)'}}
                   onClick={() => { browserHistory.push({ pathname: '/faculty/CS:GO'}) }}
                >
                  Поступить на факультет
                  {/* {CSGOButton} */}
                </div>
                <div className='textFrame-faculties'
                     style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/textFrame.jpg?alt=media&token=ff7f96e4-bc4c-445b-b314-fa2ae9dbe5c0)'}}
                  >
                    Получай заслуженные награды
                    {/* {CSGODescription} */}
                </div>
                </div>
                <div className='col-sm-4 col-md-4'>
                  <div className='third2-faculties'
                    style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/bannerDota2blue.jpg?alt=media&token=57479623-e2de-415e-9d73-b9e7ba7d85a6)'}}
                    onClick={() => { browserHistory.push({ pathname: '/faculty/Dota2'}) }}>
                  </div>
                  <div className='btnEnterFacult-faculties'
                       style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/btnEnterFacult.png?alt=media&token=078e6b3c-3a3b-4116-9443-c18d4d2e650b)'}}
                       onClick={() => { browserHistory.push({ pathname: '/faculty/Dota2'}) }}
                    >
                      Поступить на факультет
                      {/* {DotaButton} */}
                    </div>
                    <div className='textFrame-faculties'
                      style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/textFrame.jpg?alt=media&token=ff7f96e4-bc4c-445b-b314-fa2ae9dbe5c0)'}}
                      >
                        Получай заслуженные награды
                        {/* {DotaDescription} */}
                      </div>
                    </div>
                    <div className='col-sm-4 col-md-4'>
                      <div className='third3-faculties'
                        style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/bannerLoLblue.jpg?alt=media&token=2b075e49-fe58-4e1e-a62d-bbfa8e6cfe8e)'}}
                        onClick={() => { browserHistory.push({ pathname: '/faculty/LoL'}) }}>
                      </div>
                      <div className='btnEnterFacult-faculties'
                           style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/btnEnterFacult.png?alt=media&token=078e6b3c-3a3b-4116-9443-c18d4d2e650b)'}}
                           onClick={() => { browserHistory.push({ pathname: '/faculty/LoL'}) }}
                        >
                          Поступить на факультет
                          {/* {LoLButton} */}
                        </div>
                        <div className='textFrame-faculties'
                          style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/textFrame.jpg?alt=media&token=ff7f96e4-bc4c-445b-b314-fa2ae9dbe5c0)'}}
                          >
                            Получай заслуженные награды
                            {/* {LoLDescription} */}
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
