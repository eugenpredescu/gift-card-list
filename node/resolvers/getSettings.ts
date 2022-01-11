export async function getSettings(_: unknown, __: unknown, ctx: Context) {
  const {
    clients: { infra },
    vtex: { account, workspace },
  } = ctx

  return infra.getSettings(account, workspace)
}
