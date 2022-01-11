export const updateSettings = async (
  _: any,
  settingsAccount: { settingsAccount: string },
  ctx: Context
) => {
  const {
    clients: { infra, profileSystem },
  } = ctx

  const accountBefore = await infra.getSettings()

  if (accountBefore.settingsAccount !== settingsAccount.settingsAccount) {
    if (accountBefore.settingsAccount !== undefined) {
      await profileSystem.disjoinProfileSystem()

      await profileSystem.joinProfileSystem(settingsAccount.settingsAccount)
    }

    const update = await infra.updateSettings(settingsAccount)

    return update
  }

  return accountBefore
}
