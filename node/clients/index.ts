import { IOClients } from '@vtex/api'

import { profileSystem } from './profileSystem'
import { giftCard } from './giftCard'
import { listGraphql } from './listGraphql'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get profileSystem() {
    return this.getOrSet('profileSystem', profileSystem)
  }

  public get giftCard() {
    return this.getOrSet('giftCard', giftCard)
  }

  public get listGraphql() {
    return this.getOrSet('listGraphql', listGraphql)
  }
}
