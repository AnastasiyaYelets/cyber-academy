import React, { PropTypes } from 'react'
import { IndexLink, Link, browserHistory } from 'react-router'
import './Footer.scss'

export const Footer = ({ user }) =>
<div className='container'>
  <div className='row'>
    <div className='footer-block-footer '>
      <div className='container d-flex align-items-start'>
        <a className='block-footer ' href='/about'>ABOUT</a>
        <a className='block-footer ' href='/becomeacoach'>BECOME A COACH</a>
        <a className='block-footer ' href='/vip'>VIP</a>
        <a className='block-footer ' href='/support'>SUPPORT</a>
        <a className='block-footer ' href='/terms'>TERMS</a>
        <a className='block-footer ' href='/coaches'>COACHES</a>
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
        Footer.propTypes = {
          user: PropTypes.object
        }

        export default Footer
