import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { store } from 'store'

import { getChannelPreferences } from 'actions/channel'
import App from 'containers/App'

const idChatDiv = 'recast-webchat-div'

if (!document.getElementById(idChatDiv)) {
  document.body.innerHTML += `<div id="${idChatDiv}"></div>`
}

const root = document.getElementById(idChatDiv)

const script = document.currentScript || document.getElementById('recast-webchat')

const channelId = script.getAttribute('channelId')
const token = script.getAttribute('token')

if (root && channelId && token) {
  getChannelPreferences(channelId, token).then(preferences => {

  	// MU: overriding preferences

  	// MU: overriding preferences

    // expanded chat or not (must be above 768px)
    // get screen size from printed var
    var screenWidth = parseInt($("#screen").attr('windowWidth'));
    if (screenWidth > 768 || screenWidth === undefined) {
      // systematically expand if screen size larger than 768
      // or no given screensize
      preferences.openingType = "always" // ("always" | "never" | "memory")
    } else {
      // expand or not based on last state if larger than 768
      preferences.openingType = "memory" // ("always" | "never" | "memory")
    }

  	// preferences.conversationTimeToLive
    preferences.onboardingMessage = "Posez votre question fiscale !"

    // style : (TODO)
    preferences.complementaryColor = "#FFFFFF"
    preferences.accentColor = "#c79d4c"
    preferences.backgroundColor = "transparent"

    if (screenWidth > 768 || screenWidth === undefined) {
      // for desktop view
      preferences.botMessageColor = "#6f7076"
    } else {
      // for mobile view
      preferences.botMessageColor = "#4a4b4f"
    }
    
    // Expander (white)
    preferences.expanderLogo = "https://res.cloudinary.com/hz4pj1unt/image/upload/c_scale,h_133,w_133/v1524563757/brand/IconeEdmonRVB_Blanc.png"
    preferences.expanderTitle = "Commencer l'expérience EDMON"
    
    // header (< 768px)
    preferences.headerLogo = preferences.expanderLogo
    preferences.headerTitle = "Discussion avec votre Conseiller Fiscal"

    // bot picture
    preferences.botPicture = "https://res.cloudinary.com/hz4pj1unt/image/upload/c_scale,h_133,w_133/v1524550940/brand/IconeEdmonRVB_Ocre.png"

    // USER DETAILS

    // Avatar
    var userPicture = $("#user-details-avatar").attr('content');
    if (userPicture === undefined) {
      // use default userPicture
      // preferences.userPicture = "https://res.cloudinary.com/hz4pj1unt/image/upload/c_scale,w_133/v1524551016/website_assets/avatar.jpg"
    } else {
      preferences.userPicture = userPicture
    }

    // Welcome Message
    var userWelcomeMessage = $("#user-details-welcome-message").attr('content');
    if (userWelcomeMessage === undefined) {
      // use default message
      // preferences.welcomeMessage = "Bonjour, je suis Edmon, je peux répondre à vos questions fiscales."
    } else {
      preferences.welcomeMessage = userWelcomeMessage
    }
    
    // added Override
    preferences.closeButton = "https://cdn.recast.ai/webchat/close.svg"

    // not implemented
	// preferences.breakpoint = "768px"

    ReactDOM.render(
      <Provider store={store}>
        <App token={token} channelId={channelId} preferences={preferences} />
      </Provider>,
      root,
    )
  })
}
