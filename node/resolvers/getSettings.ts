export async function getSettings(_: unknown, __: unknown, ctx: Context) {
  const {
    clients: { infra },
  } = ctx

  return infra.getSettings()
}
