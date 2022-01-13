import type { FC } from 'react'
import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { Button } from 'vtex.styleguide'

import AccountContext from '../Context/accountContext'
import { buttonSave } from '../utils/definedMessages'

const ButtonSaveArea: FC = () => {
  const provider = useContext(AccountContext)

  const intl = useIntl()

  return (
    <div className="flex flex-column w-100" style={{ alignItems: 'flex-end' }}>
      <span className="mt5">
        <Button onClick={() => provider.clickSave()} testId="button-save">
          {intl.formatMessage(buttonSave.save)}
        </Button>
      </span>
    </div>
  )
}

export default ButtonSaveArea
