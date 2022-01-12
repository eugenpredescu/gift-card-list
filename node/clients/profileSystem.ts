import { JanusClient } from '@vtex/api'
import type { InstanceOptions, IOContext } from '@vtex/api'

export class ProfileSystem extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...(ctx.authToken ? { VtexIdclientAutCookie: ctx.authToken } : null),
      },
    })
  }

  public async getRegisterOnProfileSystem(email: string, name: string) {
    const value = await this.http.get(
      `https://${this.context.account}.vtexcommercestable.com.br/api/profile-system/pvt/profiles/${email}/PersonalData?extraFields=_all`
    )

    if (value.firstName != null) return value.userId

    return this.createRegisterOnProfileSystem(email, name)
  }

  private async createRegisterOnProfileSystem(email: string, name: string) {
    const value = await this.http.post<{ profileId: string }>(
      `https://${this.context.account}.vtexcommercestable.com.br/api/profile-system/pvt/profiles/${email}/PersonalData?extraFields=_all`,
      {
        firstName: name,
      }
    )

    return value.profileId
  }

  public async joinProfileSystem(mainAccount: string) {
    await this.http.put(
      `/api/profile-system/pvt/profilerepository?accountNameTo=${mainAccount}`
    )
  }

  public async disjoinProfileSystem() {
    await this.http.delete(`/api/profile-system/pvt/profilerepository`)
  }
}
