import { HTTP_ERROR_MESSAGES } from './constants'
import { getAdminEmail } from './getAdminEmail'
import { validateEmail } from './validateEmail'

export async function verifyEmail(ctx: Context) {
  const {
    clients: { vtexid },
    vtex: { storeUserAuthToken },
  } = ctx

  const returnValue = { error: '', email: '' }

  if (!storeUserAuthToken) {
    returnValue.error = HTTP_ERROR_MESSAGES.missingPermissions

    return returnValue
  }

  let authenticatedUser

  if (storeUserAuthToken) {
    authenticatedUser = await vtexid.getAuthenticatedUser(storeUserAuthToken)
  }

  if (!authenticatedUser) {
    returnValue.error = HTTP_ERROR_MESSAGES.missingPermissions

    return returnValue
  }

  const email = getAdminEmail(storeUserAuthToken)

  if (!email) {
    returnValue.error = HTTP_ERROR_MESSAGES.missingEmail

    return returnValue
  }

  if (!validateEmail(email)) {
    returnValue.error = HTTP_ERROR_MESSAGES.invalidEmail

    return returnValue
  }

  returnValue.email = email

  return returnValue
}
