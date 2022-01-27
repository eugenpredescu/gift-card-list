export const updateSettings = async (
  _: any,
  settingsAccount: { settingsAccount: string },
  ctx: Context
) => {
  const {
    clients: { profileSystem, apps },
  } = ctx

  const accountBefore = await apps.getAppSettings(ctx.vtex.userAgent)

  if (accountBefore.settingsAccount !== settingsAccount.settingsAccount) {
    if (accountBefore.settingsAccount !== undefined) {
      await profileSystem.disjoinProfileSystem()

      await profileSystem.joinProfileSystem(settingsAccount.settingsAccount)
    }

    const update = await apps.saveAppSettings(
      ctx.vtex.userAgent,
      settingsAccount
    )

    return update
  }

  return accountBefore
}
