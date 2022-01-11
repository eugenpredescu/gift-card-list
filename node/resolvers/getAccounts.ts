export async function getAccounts(_: unknown, __: unknown, ctx: Context) {
  const {
    clients: { vlm },
  } = ctx

  return vlm.getAccounts()
}
