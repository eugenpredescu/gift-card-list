import { getInfoMasterdata } from '../utils/listMasterdata'
import { verifyEmail } from '../utils/verifyEmail'

export async function getValueGiftCard(_: unknown, __: unknown, ctx: Context) {
  const {
    clients: { giftCard },
  } = ctx

  const verify = await verifyEmail(ctx)

  if (verify.email === '') return verify.error

  const returnMasterdata = (await getInfoMasterdata(ctx, verify.email)).data[0]

  if (returnMasterdata !== undefined) {
    return giftCard.getValueGiftCard(returnMasterdata.giftCardId as string)
  }

  return 0
}
