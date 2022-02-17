interface HistoryInterface {
  dateAndTime: string
  value: number
  [k: string]: unknown
}

interface MasterdataValues {
  giftCardId: string
  email: string
  profileId: string
  redemptionCode: string
  quantityAlreadyInGiftCard: number
  history: HistoryInterface[]
  id: ID
}
