import '@testing-library/cypress/add-commands'
import { mount } from 'cypress/react18';

import '../../src/index.css'
import '../../../cypress/support/commands'

Cypress.Commands.add('mount', mount);