import { fireEvent, render } from '@vtex/test-tools/react'
import React from 'react'

import DropdownArea from '../components/dropdown'
import AccountContext from '../context/accountContext'
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

jest.mock('react-intl', () => {
  const reactIntl = jest.requireActual('react-intl')
  const intl = reactIntl.createIntl({
    locale: 'pt',
  })

  return {
    ...reactIntl,
    useIntl: () => intl,
  }
})

describe('Dropdown Area', () => {
  it('should render the dropdown area', async () => {
    const { getByTestId } = render(
      <AccountContext.Provider value={{ ...values }}>
        <DropdownArea />
      </AccountContext.Provider>
    )

    const dropdown = getByTestId('dropdown')

    const text = dropdown.firstChild?.textContent

    expect(text).toContain('giftcard.dropodown.placeholder')
  })

  it('should save value "account" if select value: "account"', async () => {
    const optionsValues = {
      option: [{ label: 'account', value: 'account' }],
    }

    const { getByTestId } = render(
      <AccountContext.Provider value={{ ...values, ...optionsValues }}>
        <DropdownArea />
      </AccountContext.Provider>
    )

    const select = getByTestId('select')

    const changeValue = { value: 'account', label: 'account' }

    fireEvent.change(select, changeValue)

    expect(values.setAccount).toHaveBeenCalledWith('account')
  })
})
