interface SaveMasterdataValues {
  giftCardId: string
  email: string
  profileId: string
  redemptionCode: string
  quantityAlreadyInGiftCard: number
  history: HistoryInterface[]
}

interface HistoryInterface {
  dateAndTime: string
  value: number
  [k: string]: unknown
}
