import { getInfoMasterdata } from '../utils/listMasterdata'
import { verifyEmail } from '../utils/verifyEmail'

export async function getValueAlreadyInGiftCard(
  _: unknown,
  __: unknown,
  ctx: Context
) {
  const verify = await verifyEmail(ctx)

  if (verify.email === '') return verify.error

  const returnMasterdata = (await getInfoMasterdata(ctx, verify.email)).data[0]

  if (returnMasterdata !== undefined) {
    return returnMasterdata.quantityAlreadyInGiftCard
  }

  return 0
}
