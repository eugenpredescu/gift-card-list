import { IOClients } from '@vtex/api'
import { masterDataFor } from '@vtex/clients'
import type { GiftCardList } from 'vtex.gift-card-list'

import { ProfileSystem } from './profileSystem'
import { GiftCard } from './giftCard'
import { ListGraphql } from './listGraphql'
import { Vlm } from './vlm'

// Extend the default IOClients implementation with our own custom clients.
export class Clients extends IOClients {
  public get profileSystem() {
    return this.getOrSet('profileSystem', ProfileSystem)
  }

  public get giftCard() {
    return this.getOrSet('giftCard', GiftCard)
  }

  public get listGraphql() {
    return this.getOrSet('listGraphql', ListGraphql)
  }

  public get giftCardList() {
    return this.getOrSet(
      'giftCardList',
      masterDataFor<GiftCardList>('giftCardList')
    )
  }

  public get vlm() {
    return this.getOrSet('vlm', Vlm)
  }
}
