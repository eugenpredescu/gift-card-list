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
    const update = await infra.updateSettings(
      account,
      workspace,
      settingsAccount
    )

    return update
  }

  return accountBefore
}
