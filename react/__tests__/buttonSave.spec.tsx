import { fireEvent, render, screen } from '@vtex/test-tools/react'
import React from 'react'

import ButtonSaveArea from '../Components/buttonSave'
import AccountContext from '../context/accountContext'
// eslint-disable-next-line jest/no-mocks-import
import { values } from '../__mocks__/values'

describe('Button Save Area', () => {
  it('should render the save button', async () => {
    render(
      <AccountContext.Provider value={values}>
        <ButtonSaveArea />
      </AccountContext.Provider>
    )

    const screenValue = await screen.findByTestId('button-save')

    expect(screenValue).toContainHTML('button')
  })

  it('should test onClick button', async () => {
    const onClick = jest.fn()
    const { getByTestId } = render(
      <AccountContext.Provider value={values}>
        <ButtonSaveArea />
      </AccountContext.Provider>
    )

    const button = getByTestId('button-save')

    button.onclick = onClick

    fireEvent.click(button)

    expect(onClick).toHaveBeenCalled()
  })
})
