import { json } from 'co-body'

import { ERROR, HTTP_ERROR_MESSAGES, SUCESS } from '../utils/constants'
import { getInfoMasterdata } from '../utils/listMasterdata'
import { validateEmail } from '../utils/validateEmail'

export async function routeHistory(ctx: Context) {
  const body = await json(ctx.req)

  if (!body.email) {
    ctx.body = { message: HTTP_ERROR_MESSAGES.missingEmail }
    ctx.status = ERROR

    return
  }

  if (!validateEmail(body.email)) {
    ctx.body = { message: HTTP_ERROR_MESSAGES.invalidEmail }
    ctx.status = ERROR

    return
  }

  const masterdataInfo = await getInfoMasterdata(ctx, body.email)

  if (masterdataInfo.data[0] !== undefined) {
    ctx.body = masterdataInfo.data[0].history
    ctx.status = SUCESS
  } else {
    ctx.body = HTTP_ERROR_MESSAGES.failed
    ctx.status = ERROR
  }
}
