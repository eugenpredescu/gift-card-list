import {
  getInfoMasterdata,
  saveInfoMasterdata,
  updateInfoMasterdata,
} from '../../utils/listMasterdata'
// eslint-disable-next-line jest/no-mocks-import
import {
  save,
  saveValues,
  searchValues,
  update,
} from '../../__mocks__/valuesGiftCardList'

describe('Test listMasterdata', () => {
  const ctx = {
    clients: {
      giftCardList: {
        searchRaw: jest.fn().mockResolvedValue(searchValues),
        save: jest.fn().mockResolvedValue(save),
        update: jest.fn().mockResolvedValue(update),
      },
    },
  } as unknown as Context

  const ctxError = {
    clients: {
      giftCardList: {
        searchRaw: jest.fn().mockResolvedValue(searchValues),
        save: jest.fn().mockRejectedValue(new Error('error')),
        update: jest.fn().mockRejectedValue(new Error('error')),
      },
    },
    vtex: {
      logger: {
        error: jest.fn(),
      },
    },
  } as unknown as Context

  it('Test function getInfoMasterdata have a return', async () => {
    const returnValue = await getInfoMasterdata(ctx, 'email@email.com.br')

    expect(returnValue).toStrictEqual(searchValues)
  })

  it('Test function saveInfoMasterdata have a return', async () => {
    const returnValue = await saveInfoMasterdata(ctx, saveValues)

    expect(returnValue).toStrictEqual(save)
  })

  it('Test function saveInfoMasterdata have a error', async () => {
    const returnValue = await saveInfoMasterdata(ctxError, saveValues)

    expect(returnValue).toBe(false)
  })

  it('Test function updateInfoMasterdata have a return', async () => {
    const returnValue = await updateInfoMasterdata(
      ctx,
      'id',
      1,
      [
        {
          dateAndTime: '2022-01-07T19:37:16.2853567Z',
          value: 2,
        },
      ],
      2
    )

    expect(returnValue).toStrictEqual(true)
  })

  it('Test function updateInfoMasterdata have a error', async () => {
    const returnValue = await updateInfoMasterdata(
      ctxError,
      'id',
      1,
      [
        {
          dateAndTime: '2022-01-07T19:37:16.2853567Z',
          value: 2,
        },
      ],
      2
    )

    expect(returnValue).toStrictEqual(false)
  })
})
