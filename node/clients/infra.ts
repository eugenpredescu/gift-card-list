import type { InstanceOptions, IOContext } from '@vtex/api'
import { JanusClient } from '@vtex/api'

export class Infra extends JanusClient {
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

  public async getSettings(account: string, workspace: string) {
    const value = await this.http.get<{ settingsAccount: string }>(
      `http://infra.io.vtex.com/apps/v0/${account}/${workspace}/apps/vtex.gift-card-list/settings`
    )

    return value
  }

  public async updateSettings(
    account: string,
    workspace: string,
    settingsAccount: { settingsAccount: string }
  ) {
    const value = await this.http.put(
      `http://infra.io.vtex.com/apps/v0/${account}/${workspace}/apps/vtex.gift-card-list/settings`,
      settingsAccount
    )

    return value
  }
}
