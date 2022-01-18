import { render } from '@vtex/test-tools/react'
import React from 'react'

import GiftCardAdmin from '../GiftCardAdmin'

window.matchMedia =
  window.matchMedia ||
  function () {
    return {
      matches: false,
      addListener() {},
      removeListener() {},
    }
  }

describe('Gift Card Admin', () => {
  it('should render the GiftCardAdmin area', async () => {
    const { container } = render(<GiftCardAdmin />)

    expect(container).not.toBeNull()
  })
})
