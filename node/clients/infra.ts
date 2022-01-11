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

  public async getSettings() {
    const value = await this.http.get<{ settingsAccount: string }>(
      `http://infra.io.vtex.com/apps/v0/${this.context.account}/${this.context.workspace}/apps/vtex.gift-card-list/settings`
    )

    return value
  }

  public async updateSettings(settingsAccount: { settingsAccount: string }) {
    const value = await this.http.put(
      `http://infra.io.vtex.com/apps/v0/${this.context.account}/${this.context.workspace}/apps/vtex.gift-card-list/settings`,
      settingsAccount
    )

    return value
  }
}
