import { render } from '@vtex/test-tools/react'
import React from 'react'

import ConfigurationComponent from '../components/configurationComponent'
import AccountContext from '../Context/accountContext'
// eslint-disable-next-line jest/no-mocks-import
import { values } from '../__mocks__/values'

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    }
  }

describe('Configurate Component', () => {
  it('should render the ConfigurationComponent area', async () => {
    const { container } = render(
      <AccountContext.Provider value={{ ...values }}>
        <ConfigurationComponent />
      </AccountContext.Provider>
    )

    expect(container).not.toBeNull()
  })

  it('should render the modalSave area', async () => {
    const modalSave = { modalSave: true }

    const { getByTestId } = render(
      <AccountContext.Provider value={{ ...values, ...modalSave }}>
        <ConfigurationComponent />
      </AccountContext.Provider>
    )

    expect(getByTestId('button-modal-close')).toContainHTML('button')
  })
})
