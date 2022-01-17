import { fireEvent, render } from '@vtex/test-tools/react'
import React from 'react'

import ModalSave from '../Components/modalSave'
import AccountContext from '../Context/accountContext'
// eslint-disable-next-line jest/no-mocks-import
import { values } from '../__mocks__/values'

const noop = () => {}

Object.defineProperty(window, 'scroll', { value: noop, writable: true })

describe('Modal Save Area', () => {
  it('should render the modal save', async () => {
    const modalSave = { modalSave: true }

    const { container } = render(
      <AccountContext.Provider value={{ ...values, ...modalSave }}>
        <ModalSave />
      </AccountContext.Provider>
    )

    expect(container).not.toBeNull()
  })

  it('button should close modal if click on it', async () => {
    const modalSave = { modalSave: true }
    const { getAllByTestId } = render(
      <AccountContext.Provider value={{ ...values, ...modalSave }}>
        <ModalSave />
      </AccountContext.Provider>
    )

    const onClick = jest.fn()
    const button = getAllByTestId('button-modal-close')

    button[0].onclick = onClick

    fireEvent.click(button[0])

    expect(onClick).toHaveBeenCalled()
  })

  it('button should save modal if click on it', async () => {
    const modalSave = { modalSave: true }
    const { getAllByTestId } = render(
      <AccountContext.Provider value={{ ...values, ...modalSave }}>
        <ModalSave />
      </AccountContext.Provider>
    )

    const onClick = jest.fn()
    const button = getAllByTestId('button-modal-save')

    button[0].onclick = onClick

    fireEvent.click(button[0])

    expect(onClick).toHaveBeenCalled()
  })
})
