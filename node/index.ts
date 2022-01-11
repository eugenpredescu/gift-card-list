import type { ClientsConfig, ServiceContext } from '@vtex/api'
import { method, Service } from '@vtex/api'

import { Clients } from './clients'
import { createGiftCard } from './middlewares/createGiftCard'
import { routeHistoric } from './middlewares/routeHistoric'
import { routeRedemptionCode } from './middlewares/routeRedemptionCode'

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
    routeHistoric: method({
      GET: [routeHistoric],
    }),
    routeRedemptionCode: method({
      GET: [routeRedemptionCode],
    }),
  },
  graphql: {
    resolvers: {
      Query: {
        getSettings,
      },
    },
  },
})
