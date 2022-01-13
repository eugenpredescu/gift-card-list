import type { FC } from 'react'
import React, { useContext } from 'react'

import AlertArea from './alert'
import ButtonSaveArea from './buttonSave'
import DropdownArea from './dropdown'
import ModalSave from './modalSave'
import AccountContext from '../Context/accountContext'

const ConfigurationComponent: FC = () => {
  const provider = useContext(AccountContext)

  if (provider.modalSave) return <ModalSave />

  return (
    <>
      <DropdownArea />
      <ButtonSaveArea />
      <AlertArea />
    </>
  )
}

export default ConfigurationComponent
