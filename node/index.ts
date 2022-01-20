import type { ClientsConfig, ServiceContext } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { createGiftCard } from './middlewares/createGiftCard'
import { routeHistory } from './middlewares/routeHistory'
import { routeRedemptionCode } from './middlewares/routeRedemptionCode'
import { updateSettings } from './resolvers/updateSettings'
import { getSettings } from './resolvers/getSettings'
import { getAccounts } from './resolvers/getAccounts'

const TIMEOUT_MS = 800

const clients: ClientsConfig<Clients> = {
  implementation: Clients,
  options: {
    default: {
      retries: 2,
      timeout: TIMEOUT_MS,
    },
  },
}

declare global {
  type Context = ServiceContext<Clients>
}

// Export a service that defines route handlers and client options.
export default new Service({
  clients,
  routes: {
    createGiftCard: method({
      POST: [createGiftCard],
    }),
    routeHistory: method({
      GET: [routeHistory],
    }),
    routeRedemptionCode: method({
      GET: [routeRedemptionCode],
    }),
  },
  graphql: {
    resolvers: {
      Query: {
        getSettings,
        getAccounts,
      },
      Mutation: {
        updateSettings,
      },
    },
  },
})
