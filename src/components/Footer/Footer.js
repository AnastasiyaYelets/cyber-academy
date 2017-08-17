import React, { PropTypes } from 'react'
import { IndexLink, Link, browserHistory } from 'react-router'
import './Footer.scss'

export const Footer = ({ user }) =>
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
        style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sm-fb.png?alt=media&token=8a4c071b-e4a9-4c73-a4e1-3a4634726231)'}}
        ></p></a>
      <a href='http://viber.com'><p className='viber-footer'
        style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sm-viber.png?alt=media&token=92eb863e-16fa-42fe-b6ea-b7f70222b74a)'}}
        ></p></a>
      <a href='http://twitter.com'><p className='twitter-footer'
        style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sm-twitter.png?alt=media&token=b6fa68a8-17c9-4a30-8f69-73d49d73f462)'}}
        ></p></a>
      <a href='http://vk.com' ><p className='vk-footer'
        style={{ backgroundImage: 'url(https://firebasestorage.googleapis.com/v0/b/cyber-academy.appspot.com/o/sm-vk.png?alt=media&token=111601ae-1316-429c-9e19-9293ad59f78c)'}}
        ></p></a>
    </div>
  </div>
</div>
Footer.propTypes = {
  user: PropTypes.object
}

export default Footer
