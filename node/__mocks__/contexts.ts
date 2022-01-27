import {
  save,
  searchUndefined,
  searchValues,
  update,
} from './valuesGiftCardList'

export const ctx = {
  clients: {
    giftCard: {},
    profileSystem: {},
    listGraphql: {
      checkDataValueList: jest
        .fn()
        .mockResolvedValue({ name: 'name', valuePurchased: 2 }),
    },
  },
} as unknown as Context

export const ctxMasterdataUndefinedTrue = {
  clients: {
    giftCard: {
      createGiftCard: jest
        .fn()
        .mockResolvedValue({ id: 'id', redemptionCode: 'redemptionCode' }),
      addCreditInGiftCard: jest.fn().mockResolvedValue(true),
    },
    profileSystem: {
      getRegisterOnProfileSystem: jest.fn(),
    },
    listGraphql: {
      checkDataValueList: jest
        .fn()
        .mockResolvedValue({ name: 'name', valuePurchased: 5 }),
    },
    giftCardList: {
      searchRaw: jest.fn().mockResolvedValue(searchUndefined),
      save: jest.fn().mockResolvedValue(save),
    },
  },
} as unknown as Context

export const ctxMasterdataUndefinedFalse = {
  clients: {
    giftCard: {
      createGiftCard: jest
        .fn()
        .mockResolvedValue({ id: 'id', redemptionCode: 'redemptionCode' }),
      addCreditInGiftCard: jest.fn().mockResolvedValue(false),
    },
    profileSystem: {
      getRegisterOnProfileSystem: jest.fn(),
    },
    listGraphql: {
      checkDataValueList: jest
        .fn()
        .mockResolvedValue({ name: 'name', valuePurchased: 5 }),
    },
    giftCardList: {
      searchRaw: jest.fn().mockResolvedValue(searchUndefined),
      save: jest.fn().mockResolvedValue(save),
    },
  },
} as unknown as Context

export const ctxMasterdataValueTrue = {
  clients: {
    giftCard: {
      addCreditInGiftCard: jest.fn().mockResolvedValue(true),
    },
    listGraphql: {
      checkDataValueList: jest
        .fn()
        .mockResolvedValue({ name: 'name', valuePurchased: 5 }),
    },
    giftCardList: {
      searchRaw: jest.fn().mockResolvedValue(searchValues),
      update: jest.fn().mockResolvedValue(update),
    },
  },
} as unknown as Context

export const ctxMasterdataValueFalse = {
  clients: {
    giftCard: {
      addCreditInGiftCard: jest.fn().mockResolvedValue(false),
    },
    listGraphql: {
      checkDataValueList: jest
        .fn()
        .mockResolvedValue({ name: 'name', valuePurchased: 5 }),
    },
    giftCardList: {
      searchRaw: jest.fn().mockResolvedValue(searchValues),
      update: jest.fn().mockResolvedValue(update),
    },
  },
} as unknown as Context

export const ctxRouteSuccess = {
  clients: {
    giftCardList: {
      searchRaw: jest.fn().mockResolvedValue(searchValues),
    },
  },
} as unknown as Context

export const ctxRouteError = {
  clients: {
    giftCardList: {
      searchRaw: jest.fn().mockResolvedValue(searchUndefined),
    },
  },
} as unknown as Context
