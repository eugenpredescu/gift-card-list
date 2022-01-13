import type { FC, SyntheticEvent } from 'react'
import React, { useContext } from 'react'
import { useIntl } from 'react-intl'
import { Button, Modal } from 'vtex.styleguide'

import AccountContext from '../Context/accountContext'
import { modalSave } from '../utils/definedMessages'

const ModalSave: FC = () => {
  const provider = useContext(AccountContext)

  const intl = useIntl()

  function closeModal() {
    provider.setModalSave(false)
  }

  return (
    <Modal
      isOpen={provider.modalSave}
      title={intl.formatMessage(modalSave.title)}
      responsiveFullScreen
      bottomBar={
        <div className="nowrap">
          <span className="mr4">
            <Button
              testId="button-modal-close"
              variation="tertiary"
              onClick={(e: SyntheticEvent) => {
                e.preventDefault()
                closeModal()
              }}
            >
              {intl.formatMessage(modalSave.cancel)}
            </Button>
          </span>
          <span>
            <Button
              testId="button-modal-ok"
              variation="primary"
              onClick={(e: SyntheticEvent) => {
                e.preventDefault()
                provider.save()
              }}
            >
              {intl.formatMessage(modalSave.save)}
            </Button>
          </span>
        </div>
      }
      onClose={(e: SyntheticEvent) => {
        e.preventDefault
        closeModal()
      }}
    >
      <div className="pv3 t-body c-muted-2 mb5">
        {intl.formatMessage(modalSave.text)}
      </div>
      <div className="pv3 t-body c-muted-2 mb5">
        {intl.formatMessage(modalSave.confirm)}
      </div>
    </Modal>
  )
}

export default ModalSave
