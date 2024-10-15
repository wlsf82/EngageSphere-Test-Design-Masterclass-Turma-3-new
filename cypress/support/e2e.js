import 'cypress-plugin-api'
import 'cypress-axe'
import './commands'

Cypress.on('window:before:load', window => {
  window.document.cookie = 'cookieConsent=accepted'
})
