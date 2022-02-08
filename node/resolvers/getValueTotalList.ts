import { verifyEmail } from '../utils/verifyEmail'

export async function getValueTotalList(_: unknown, __: unknown, ctx: Context) {
  const {
    clients: { listGraphql },
  } = ctx

  const verify = await verifyEmail(ctx)

  if (verify.email === '') return verify.error

  return (await listGraphql.checkDataValueList(verify.email)).valuePurchased
}
