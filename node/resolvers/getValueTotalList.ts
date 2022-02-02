import { HTTP_ERROR_MESSAGES } from '../utils/constants'
import { getAdminEmail } from '../utils/getAdminEmail'
import { validateEmail } from '../utils/validateEmail'

export async function getValueTotalList(_: unknown, __: unknown, ctx: Context) {
  const {
    clients: { listGraphql, vtexid },
    vtex: { storeUserAuthToken },
  } = ctx

  if (!storeUserAuthToken) {
    return HTTP_ERROR_MESSAGES.missingPermitions
  }

  let authenticatedUser

  if (storeUserAuthToken) {
    authenticatedUser = await vtexid.getAuthenticatedUser(storeUserAuthToken)
  }

  if (!authenticatedUser) {
    return HTTP_ERROR_MESSAGES.missingPermitions
  }

  const email = getAdminEmail(storeUserAuthToken)

  if (!email) {
    return HTTP_ERROR_MESSAGES.missingEmail
  }

  if (!validateEmail(email)) {
    return HTTP_ERROR_MESSAGES.invalidEmail
  }

  return (await listGraphql.checkDataValueList(email)).valuePurchased
}
