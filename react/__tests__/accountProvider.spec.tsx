import { fireEvent, render } from '@vtex/test-tools/react'
import React from 'react'
import { MockedProvider, wait } from '@apollo/react-testing'

// eslint-disable-next-line jest/no-mocks-import
import { mocks, mocksWithNullReturn } from '../__mocks__/mockUseQuery'
import AccountContext from '../Context/accountContext'
import AccountProvider from '../Provider/accountProvider'

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    }
  }

describe('Provider', () => {
  it('should render provider', async () => {
    const { container } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AccountProvider />
      </MockedProvider>
    )

    await wait(0)

    expect(container).not.toBeNull()
  })

  it('should test function handleCloseAlert', async () => {
    const TestComponent = () => {
      const { handleCloseAlert, showAlert } = React.useContext(AccountContext)

      return (
        <>
          <div data-testid="showAlert">{showAlert}</div>
          <button onClick={handleCloseAlert} data-testid="buttonShowAlert">
            SetShowAlert
          </button>
        </>
      )
    }

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AccountProvider>
          <TestComponent />
        </AccountProvider>
      </MockedProvider>
    )

    const showAlertValue = getByTestId('showAlert').textContent

    getByTestId('buttonShowAlert').click()

    expect(showAlertValue).toBe('0')
  })

  it('should test function clickSave', async () => {
    const TestComponent = () => {
      const { clickSave, showAlert, modalSave } =
        React.useContext(AccountContext)

      return (
        <>
          <button data-testid="buttonSave" onClick={clickSave} />
          <div data-testid="showAlert">{showAlert}</div>
          <div data-testid="modalSave">{modalSave}</div>
        </>
      )
    }

    const { getByTestId } = render(
      <AccountProvider>
        <TestComponent />
      </AccountProvider>
    )

    fireEvent.click(getByTestId('buttonSave'))

    await wait(0)

    expect(getByTestId('showAlert').textContent).toBe('0')
  })

  it('should test function save with query return', async () => {
    const TestComponent = () => {
      const { save, showAlert, setAccount } = React.useContext(AccountContext)

      return (
        <>
          <button
            data-testid="buttonAddAccount"
            onClick={() => setAccount('account2')}
          />
          <button data-testid="buttonSave" onClick={save} />
          <div data-testid="showAlert">{showAlert}</div>
        </>
      )
    }

    const { getByTestId } = render(
      <MockedProvider mocks={mocks} addTypename={false}>
        <AccountProvider>
          <TestComponent />
        </AccountProvider>
      </MockedProvider>
    )

    fireEvent.click(getByTestId('buttonAddAccount'))
    fireEvent.click(getByTestId('buttonSave'))

    await wait(0)

    expect(getByTestId('showAlert').textContent).toBe('1')
  })

  it('should test function save without query return', async () => {
    const TestComponent = () => {
      const { save, showAlert, setAccount } = React.useContext(AccountContext)

      return (
        <>
          <button
            data-testid="buttonAddAccount"
            onClick={() => setAccount('account2')}
          />
          <button data-testid="buttonSave" onClick={save} />
          <div data-testid="showAlert">{showAlert}</div>
        </>
      )
    }

    const { getByTestId } = render(
      <MockedProvider mocks={mocksWithNullReturn} addTypename={false}>
        <AccountProvider>
          <TestComponent />
        </AccountProvider>
      </MockedProvider>
    )

    fireEvent.click(getByTestId('buttonAddAccount'))
    fireEvent.click(getByTestId('buttonSave'))
    await wait(0)

    expect(getByTestId('showAlert').textContent).toBe('2')
  })
})
