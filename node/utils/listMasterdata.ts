export async function getInfoMasterdata(
  ctx: Context,
  emailOwner: string,
  idList: string
) {
  const {
    clients: { giftCardList },
  } = ctx

  return giftCardList.searchRaw(
    { page: 1, pageSize: 500 },
    ['_all'],
    undefined,
    `email=${emailOwner} AND listId=${idList}`
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
      listId: saveValues.listId,
      profileId: saveValues.profileId,
      quantityAlreadyInGiftCard: saveValues.quantityAlreadyInGiftCard,
      redemptionCode: saveValues.redemptionCode,
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
