import React from 'react'
import PropTypes from 'prop-types'

import './style.scss'

// MU: replaced close button by clear button :

const Header = ({ closeWebchat, preferences, logoStyle }) => (
  <div
    className="RecastAppHeader"
    style={{
      color: preferences.complementaryColor,
      backgroundColor: preferences.accentColor,
    }}
  >
    <img className="RecastAppHeader--logo" src={preferences.headerLogo} style={logoStyle} />

    <div className="RecastAppHeader--title">{preferences.headerTitle}</div>

    <div className="RecastAppHeader--btn">
      <a href="/sessions/clear_conversation" title="Effacer votre conversation avec Edmon">Effacer</a>
    </div>

    <div className="RecastAppHeader--btn close" onClick={closeWebchat}>
      <b>x</b>
    </div>
  </div>
)

Header.propTypes = {
  closeWebchat: PropTypes.func,
  preferences: PropTypes.object,
  logoStyle: PropTypes.object,
}

export default Header
