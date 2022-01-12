import type { FC } from 'react'
import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { Tooltip, Dropdown, IconInfo } from 'vtex.styleguide'

import Context from '../Context/context'
import { dropdown } from '../utils/definedMessages'

const DropdownArea: FC = () => {
  const provider = useContext(Context)
  const intl = useIntl()

  const updateValue = (event: React.ChangeEvent<HTMLInputElement>) => {
    provider.setAccount(event.target.value)
  }

  return (
    <>
      <p className="mt5 mb5">
        <div>
          {intl.formatMessage(dropdown.label)}
          <Tooltip label={intl.formatMessage(dropdown.description)}>
            <span className="c-on-base pointer ml2 mt2">
              <IconInfo />
            </span>
          </Tooltip>
        </div>
      </p>
      <div className="mb5">
        <Dropdown
          size="large"
          options={provider.options}
          value={provider.account}
          onChange={updateValue}
          placeholder={intl.formatMessage(dropdown.placeholder)}
        />
      </div>
    </>
  )
}

export default DropdownArea
