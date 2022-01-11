interface SaveMasterdataValues {
  giftCardId: string
  email: string
  profileId: string
  redemptionCode: string
  quantityAlreadyInGiftCard: number
  historic: Historic[]
}

interface Historic {
  dateAndTime: string
  value: number
  [k: string]: unknown
}
