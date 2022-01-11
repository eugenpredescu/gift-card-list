import { json } from 'co-body'

import { getInfoMasterdata } from '../utils/listMasterdata'
import { validateEmail } from '../utils/validateEmail'

export async function routeRedemptionCode(ctx: Context) {
  const body = await json(ctx.req)

  if (!body.email) {
    ctx.body = { message: 'missed email' }
    ctx.status = 400

    return
  }

  if (!validateEmail(body.email)) {
    ctx.body = { message: 'email com formato inválido' }
    ctx.status = 400

    return
  }

  const masterdataInfo = await getInfoMasterdata(ctx, body.email)

  if (masterdataInfo.data[0] !== undefined) {
    ctx.body = masterdataInfo.data[0].redemptionCode
    ctx.status = 200
  } else {
    ctx.body = 'failed'
    ctx.status = 400
  }
}
