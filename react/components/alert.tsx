import type { FC } from 'react'
import React, { useContext } from 'react'
import { Alert } from 'vtex.styleguide'
import { useIntl } from 'react-intl'

import { alert } from '../utils/definedMessages'
import AccountContext from '../Context/accountContext'
import { ShowAlertOptions } from '../utils/showAlertOptions'

const AlertArea: FC = () => {
  const intl = useIntl()

  const provider = useContext(AccountContext)

  if (provider.showAlert === ShowAlertOptions.alertSave) {
    return (
      <Alert type="success" onClose={provider.handleCloseAlert}>
        {intl.formatMessage(alert.save)}
      </Alert>
    )
  }

  if (provider.showAlert === ShowAlertOptions.alertError) {
    return (
      <Alert type="error" onClose={provider.handleCloseAlert}>
        {intl.formatMessage(alert.error)}
      </Alert>
    )
  }

  return null
}

export default AlertArea
