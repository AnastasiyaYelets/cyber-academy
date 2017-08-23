import React, { PropTypes } from 'react'
import { IndexLink, browserHistory } from 'react-router'
import './Header.scss'
import backend from '../../apis'
import firebase from 'firebase'

export const Header = ({ user, language, onEngLang, onRusLang }) =>
<div>
  <div className='col-xs-12 col-md-12'>
    <div
      style={{ float: 'right'}}

      onClick={() => {
        console.log(language)
        onEngLang()
      }
    }
    >  ENG
  </div>

  <div
    style={{ float: 'right'}}
    onClick={() =>{
      onRusLang()
      console.log(language)
    }
  }
  >RUS|
</div>
</div>
<div className='container'>


  <div>
    <a href='/' title='Return to the homepage'>
    <div className='logo'
      style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/logo.png?alt=media&token=338a7d4a-1e8a-4b6a-87a0-0d9e2e9353dc)'}}
      ></div>
    </a>
  </div>
  <div className='dropdown firstButton'>
    <div className='navbtn1'
      onClick={() => { browserHistory.push({ pathname: `/faculties` }) }}
      >Факультеты</div>
      <div className='dropdown-content firstButton-dropdown'>
        <a href='/faculty/CS:GO'>CS:GO</a>
        <a href='/faculty/Dota2'>Dota2</a>
        <a href='/faculty/LoL'>LOL</a>
      </div>
    </div>
    <div
      className='navbtn2'
      onClick={() => { browserHistory.push({ pathname: `` }) }}
      >Турниры
    </div>
    <div
      className='navbtn2'
      onClick={() => { browserHistory.push({ pathname: '/forum' }) }}
      >Форум
    </div>
    {!Object.keys(user).length &&
      <div
        className='navbtnLogin'>
        <a href={`${backend}/auth/steam`}> LOGIN </a>
      </div> }

      {Boolean(Object.keys(user).length) &&
        <div className='dropdown'>
          <div className='navbtn4'>{user.displayName}</div>
          <div className='dropdown-content'>
            <a href='/MyCourses'>My courses</a>
            <a href='/statistics'>Statistics</a>
            <a href='/'
            onClick={() => firebase.auth().signOut()}>
            Log out</a>
          </div>
        </div>
      }
    </div>
  </div>

  Header.propTypes = {
    user: PropTypes.object
  }

  export default Header
