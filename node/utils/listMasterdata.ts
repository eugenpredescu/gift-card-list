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
