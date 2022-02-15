import type { InstanceOptions, IOContext } from '@vtex/api'
import { ExternalClient } from '@vtex/api'

export class ListGraphql extends ExternalClient {
  constructor(ctx: IOContext, options?: InstanceOptions) {
    super(`http://${ctx.workspace}--${ctx.account}.myvtex.com`, ctx, {
      ...options,
      headers: {
        VtexIdclientAutCookie: ctx.authToken,
        'X-Vtex-Use-Https': 'true',
        ...options?.headers,
      },
    })
  }

  public async checkDataValueList(email: string) {
    const value = await this.http.get(`/_v/getDataList/${email}`)

    return value
  }
}
