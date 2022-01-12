import type { FC } from 'react'
import React, { useContext } from 'react'

import AlertArea from './alert'
import ButtonSaveArea from './buttonSave'
import DropdownArea from './dropdown'
import ModalSave from './modalSave'
import Context from '../Context/context'

const ConfigurationComponent: FC = () => {
  const provider = useContext(Context)

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
