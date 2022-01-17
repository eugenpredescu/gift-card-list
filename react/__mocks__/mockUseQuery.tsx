import getAccount from '../queries/getAccount.gql'
import getSettings from '../queries/getSettings.gql'
import updateSettings from '../queries/updateSettings.gql'

export const mocks = [
  {
    request: {
      query: getSettings,
    },
    response: {
      data: {
        getSettings: {
          settingsAccount: 'account1',
        },
      },
    },
  },

  {
    request: {
      query: getAccount,
    },
    response: {
      data: {
        getAccounts: ['account1', 'account2', 'account3'],
      },
    },
  },

  {
    request: {
      query: updateSettings,
      variables: {
        settings: 'account2',
      },
    },
    result: {
      data: {
        updateSettings: {
          settingsAccount: 'account2',
        },
      },
    },
  },
]

export const mocksWithNullReturn = [
  {
    request: {
      query: updateSettings,
      variables: {
        settings: 'account2',
      },
    },
    result: {
      data: {},
    },
  },
]
