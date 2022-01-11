export const updateSettings = async (
  _: any,
  settingsAccount: { settingsAccount: string },
  ctx: Context
) => {
  const {
    clients: { infra, profileSystem },
    vtex: { account, workspace },
  } = ctx

  const accountBefore = await infra.getSettings(account, workspace)

  if (accountBefore.settingsAccount !== settingsAccount.settingsAccount) {
    if (accountBefore.settingsAccount !== undefined) {
      await profileSystem.disjoinProfileSystem(account)

      await profileSystem.joinProfileSystem(
        account,
        settingsAccount.settingsAccount
      )
    }

    const update = await infra.updateSettings(
      account,
      workspace,
      settingsAccount
    )

    return update
  }

  return accountBefore
}
