import { HTTP_ERROR_MESSAGES } from '../utils/constants'
import { getInfoMasterdata } from '../utils/listMasterdata'
import { verifyEmail } from '../utils/verifyEmail'

export async function getRouteRedemptionCode(
  _: unknown,
  __: unknown,
  ctx: Context
) {
  const verify = await verifyEmail(ctx)

  if (verify.email === '') return verify.error

  const masterdataInfo = (await getInfoMasterdata(ctx, verify.email)).data[0]

  if (masterdataInfo !== undefined) {
    return masterdataInfo.redemptionCode
  }

  return HTTP_ERROR_MESSAGES.failed
}
