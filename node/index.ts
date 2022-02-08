import type { ClientsConfig, ServiceContext } from '@vtex/api'
import { Service } from '@vtex/api'

import { Clients } from './clients'
import { getRouteHistory } from './resolvers/getRouteHistory'
import { getRouteRedemptionCode } from './resolvers/getRouteRedemptionCode'
import { updateSettings } from './resolvers/updateSettings'
import { updateGiftCard } from './resolvers/updateGiftCard'
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
  graphql: {
    resolvers: {
      Query: {
        getSettings,
        getAccounts,
        getRouteHistory,
        getRouteRedemptionCode,
      },
      Mutation: {
        updateSettings,
        updateGiftCard,
      },
    },
  },
})
