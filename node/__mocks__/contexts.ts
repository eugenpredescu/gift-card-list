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
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: 'test@test.com',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q',
  },
} as unknown as Context

export const ctxMissingPermissions = {
  clients: {
    giftCard: {},
    profileSystem: {},
    listGraphql: {
      checkDataValueList: jest
        .fn()
        .mockResolvedValue({ name: 'name', valuePurchased: 2 }),
    },
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: 'test@test.com',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken: '',
  },
} as unknown as Context

export const ctxMissingAuthentication = {
  clients: {
    giftCard: {},
    profileSystem: {},
    listGraphql: {
      checkDataValueList: jest
        .fn()
        .mockResolvedValue({ name: 'name', valuePurchased: 2 }),
    },
    vtexid: {
      getAuthenticatedUser: jest.fn(),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q',
  },
} as unknown as Context

export const ctxMissingEmail = {
  clients: {
    giftCard: {},
    profileSystem: {},
    listGraphql: {},
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: '',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiIiLCJhY2NvdW50IjoidGVzdCIsImF1ZGllbmNlIjoiYWRtaW4iLCJzZXNzIjoic2VzcyIsImV4cCI6ImV4cCIsInVzZXJJZCI6InVzZXJJZCIsImlhdCI6MSwiaXNzIjoiaXNzIiwianRpIjoianRpIn0.L7cQlvYyxA5TsP7p5CUGX69xaIz-DTiVX4Uv8mVdaN0',
  },
} as unknown as Context

export const ctxInvalidEmail = {
  clients: {
    giftCard: {},
    profileSystem: {},
    listGraphql: {},
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: 'test',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0IiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nm9eqHR8Mkf_Pp9LcDRm_euW84V_OQaRxdMGM0bbWFI',
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
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: 'test@test.com',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q',
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
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: 'test@test.com',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q',
  },
} as unknown as Context

export const ctxMasterdataValueTrue = {
  clients: {
    giftCard: {
      addCreditInGiftCard: jest.fn().mockResolvedValue(true),
      getValueGiftCard: jest.fn().mockResolvedValue(3),
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
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: 'test@test.com',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q',
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
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: 'test@test.com',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q',
  },
} as unknown as Context

export const ctxRouteSuccess = {
  clients: {
    giftCardList: {
      searchRaw: jest.fn().mockResolvedValue(searchValues),
    },
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: 'test@test.com',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q',
  },
} as unknown as Context

export const ctxRouteError = {
  clients: {
    giftCardList: {
      searchRaw: jest.fn().mockResolvedValue(searchUndefined),
    },
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: 'test@test.com',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q',
  },
} as unknown as Context

export const ctxMasterdataWithoutValues = {
  clients: {
    giftCardList: {
      searchRaw: jest.fn().mockResolvedValue(searchUndefined),
    },
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: 'test@test.com',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q',
  },
} as unknown as Context

export const ctxCredit = {
  clients: {
    giftCard: {},
    listGraphql: {
      checkDataValueList: jest
        .fn()
        .mockResolvedValue({ name: 'name', valuePurchased: 5 }),
    },
    giftCardList: {
      searchRaw: jest.fn().mockResolvedValue(searchValues),
    },
    vtexid: {
      getAuthenticatedUser: jest.fn().mockResolvedValue({
        sub: 'test@test.com',
        account: 'test',
        audience: 'admin',
        sess: 'sess',
        exp: 'exp',
        userId: 'userId',
        iat: 1,
        iss: 'iss',
        jti: 'jti',
      }),
    },
  },
  vtex: {
    storeUserAuthToken:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6IjEyMzQifQ.eyJzdWIiOiJ0ZXN0QHRlc3QuY29tIiwiYWNjb3VudCI6InRlc3QiLCJhdWRpZW5jZSI6ImFkbWluIiwic2VzcyI6InNlc3MiLCJleHAiOiJleHAiLCJ1c2VySWQiOiJ1c2VySWQiLCJpYXQiOjEsImlzcyI6ImlzcyIsImp0aSI6Imp0aSJ9.nnqmVfGsobK5hfdtAu10a0NU36-kFQ0f2LmN4R9rs8Q',
  },
} as unknown as Context
