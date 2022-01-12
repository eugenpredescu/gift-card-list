export async function getInfoMasterdata(ctx: Context, emailOwner: string) {
  const {
    clients: { giftCardList },
  } = ctx

  return giftCardList.searchRaw(
    { page: 1, pageSize: 500 },
    ['_all'],
    undefined,
    `email=${emailOwner}`
  )
}

export async function saveInfoMasterdata(
  ctx: Context,
  saveValues: SaveMasterdataValues
) {
  const {
    clients: { giftCardList },
  } = ctx

  return giftCardList
    .save({
      email: saveValues.email,
      giftCardId: saveValues.giftCardId,
      profileId: saveValues.profileId,
      quantityAlreadyInGiftCard: saveValues.quantityAlreadyInGiftCard,
      redemptionCode: saveValues.redemptionCode,
      history: saveValues.history,
    })
    .catch((e: any) => {
      ctx.vtex.logger.error({
        message: 'Error to save gift card lista values through MasterdataV2',
        name: e.name,
        exception: e.message,
      })

      return false
    })
}

export async function updateInfoMasterdata(
  ctx: Context,
  id: string,
  quantityAlreadyInGiftCard: number,
  history: HistoryInterface[],
  valueHistory: number
) {
  const {
    clients: { giftCardList },
  } = ctx

  history.push({
    dateAndTime: new Date().toISOString(),
    value: valueHistory,
  })

  return giftCardList
    .update(id, {
      quantityAlreadyInGiftCard,
      history,
    })
    .then(() => true)
    .catch((e: any) => {
      ctx.vtex.logger.error({
        message: 'Error to update gift card lista values through MasterdataV2',
        name: e.name,
        exception: e.message,
      })

      return false
    })
}
