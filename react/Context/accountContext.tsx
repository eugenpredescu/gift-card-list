import React from 'react'

import type { ShowAlertOptions } from '../utils/showAlertOptions'

interface ContextType {
  account: string
  options: Options[]
  setAccount: (account: string) => void
  save: () => void
  clickSave: () => void
  showAlert: ShowAlertOptions
  modalSave: boolean
  handleCloseAlert: () => void
  setModalSave: (modalSave: boolean) => void
}
const AccountContext = React.createContext<ContextType>({
  account: '',
  options: [{ label: '', value: '' }],
  setAccount: () => {},
  save: () => {},
  clickSave: () => {},
  showAlert: 0,
  modalSave: false,
  handleCloseAlert: () => {},
  setModalSave: () => {},
})

export default AccountContext
