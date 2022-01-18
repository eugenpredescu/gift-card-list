import { ShowAlertOptions } from '../utils/showAlertOptions'

export const values = {
  account: 'account',
  options: [{ label: 'account', value: 'account' }],
  setAccount: jest.fn(),
  save: jest.fn(),
  clickSave: jest.fn(),
  showAlert: ShowAlertOptions.notShow,
  modalSave: false,
  handleCloseAlert: jest.fn(),
  setModalSave: jest.fn(),
}
