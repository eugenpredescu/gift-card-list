import { JanusClient } from '@vtex/api'
import type { InstanceOptions, IOContext } from '@vtex/api'

export class ListGraphql extends JanusClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(ctx, {
      ...options,
      headers: {
        ...options?.headers,
        ...(ctx.authToken ? { VtexIdclientAutCookie: ctx.authToken } : null),
      },
    })
  }

  public async checkDataValueList(email: string) {
    // PEDIR PARA A ACCT CRIAR UM ENDPOINT PARA ESSA CHAMADA

    interface ValueList {
      ownerName: string
      valuePurchased: number
    }

    const value = await this.http.get<ValueList[]>(
      `https://${this.context.account}.vtexcommercestable.com.br/api/dataentities/vtex_list_graphql_userLists/search?_schema=1.6.0&_fields=_all&ownerEmail=${email}`
    )

    let valuePurchasedTotal = 0

    value.forEach((element: { valuePurchased: number }) => {
      valuePurchasedTotal += element.valuePurchased
    })

    return { name: value[0].ownerName, valuePurchased: valuePurchasedTotal }
  }
}
