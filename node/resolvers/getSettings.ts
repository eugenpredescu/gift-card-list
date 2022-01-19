export async function getSettings(_: unknown, __: unknown, ctx: Context) {
  const {
    clients: { apps },
  } = ctx

  return apps.getAppSettings(ctx.vtex.userAgent)
}
