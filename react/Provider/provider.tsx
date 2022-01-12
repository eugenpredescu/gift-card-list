/* eslint-disable vtex/prefer-early-return */
import type { FC } from 'react'
import React, { useMemo, useEffect, useState } from 'react'
import { useMutation, useQuery } from 'react-apollo'

import Context from '../Context/context'
import getAccounts from '../queries/getAccount.gql'
import getSettings from '../queries/getSettings.gql'
import updateSettings from '../queries/updateSettings.gql'
import { ShowAlertOptions } from '../utils/showAlertOptions'

const Provider: FC = (props) => {
  const [account, setAccount] = useState('')
  const [showAlert, setShowAlert] = useState(ShowAlertOptions.notShow)
  const [modalSave, setModalSave] = useState(false)

  const { data: dataAccountsName } = useQuery(getAccounts)
  const { data: dataSettings } = useQuery(getSettings)
  const [updateSettingsMutation] = useMutation(updateSettings)

  const options: Options[] = useMemo(() => {
    if (dataAccountsName === undefined) return []

    const optionsValues: Array<{ label: string; value: string }> = []

    dataAccountsName?.getAccounts?.forEach((element: string) => {
      optionsValues.push({ label: element, value: element })
    })

    return optionsValues
  }, [dataAccountsName])

  useEffect(() => {
    const value = dataSettings?.getSettings?.settingsAccount

    if (value) {
      setAccount(value)
    }
  }, [dataSettings])

  async function clickSave() {
    setModalSave(true)
    setShowAlert(ShowAlertOptions.notShow)
  }

  async function save() {
    setModalSave(false)
    const valueReturn = await updateSettingsMutation({
      variables: { settings: account },
    })

    if (valueReturn) {
      setShowAlert(ShowAlertOptions.alertSave)

      return true
    }

    setShowAlert(ShowAlertOptions.alertError)

    return false
  }

  const handleCloseAlert = () => {
    setShowAlert(ShowAlertOptions.notShow)
  }

  return (
    <Context.Provider
      value={{
        account,
        options,
        setAccount,
        save,
        clickSave,
        showAlert,
        modalSave,
        handleCloseAlert,
        setModalSave,
      }}
    >
      {props.children}
    </Context.Provider>
  )
}

export default Provider
