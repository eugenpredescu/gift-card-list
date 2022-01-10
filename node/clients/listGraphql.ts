import { JanusClient } from '@vtex/api'
import type { InstanceOptions, IOContext } from '@vtex/api'

export class listGraphql extends JanusClient {
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

  public async checkDataValueList(idList:string) {

    const value = await this.http.get(
      `https://${this.context.account}.vtexcommercestable.com.br/api/dataentities/vtex_list_graphql_userLists/search?_fields=_all&id=${idList}`,
    )

    return {name: value[0].ownerName, valuePurchased: value[0].valuePurchased}
  }

}
