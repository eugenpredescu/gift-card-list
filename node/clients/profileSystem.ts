import { JanusClient } from '@vtex/api'
import type { InstanceOptions, IOContext } from '@vtex/api'

export class profileSystem extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...(ctx.authToken
          ? { VtexIdclientAutCookie: ctx.authToken }
          : null),
      },
    })
  }

  public async getRegisterOnProfileSystem(email:string) {

    const value = await this.http.get(
      `https://${this.context.account}.vtexcommercestable.com.br/api/profile-system/pvt/profiles/${email}/PersonalData?extraFields=_all`
    )

    if(value.firstName != null) return value.userId

    else{
      return this.createRegisterOnProfileSystem(email)
    }

  }

private async createRegisterOnProfileSystem(email:string) {

    const value = await this.http.post<{ profileId: string }>(
      `https://${this.context.account}.vtexcommercestable.com.br/api/profile-system/pvt/profiles/${email}/PersonalData?extraFields=_all`,
      {
        //CONECTAR O NOME COM A LISTA GRAPHQL
        firstName: "Name",
      }
    )

    return value.profileId

  }

}
