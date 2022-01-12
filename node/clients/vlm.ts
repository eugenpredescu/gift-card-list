import { JanusClient } from '@vtex/api'
import type { InstanceOptions, IOContext } from '@vtex/api'

export class Vlm extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...(ctx.adminUserAuthToken
          ? { VtexIdclientAutCookie: ctx.adminUserAuthToken }
          : null),
      },
    })
  }

  public async getAccounts() {
    const value = await this.http.get(`/api/vlm/account`)

    const accounts: string[] = []

    value.sites.forEach((element: { name: string }) => {
      return accounts.push(element.name)
    })

    return accounts
  }
}
