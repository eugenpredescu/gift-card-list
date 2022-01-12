import { Apps } from '@vtex/api'

export async function getSettings(_: unknown, __: unknown, ctx: Context) {
  const apps = new Apps(ctx.vtex)

  return apps.getAppSettings(ctx.vtex.userAgent)
}
