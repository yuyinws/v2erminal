import HttpsProxyAgent from 'https-proxy-agent'
import { getConfig } from '@/utils'
import type { FetchOptions } from '@/type'

export async function fetchOptions(): Promise<FetchOptions> {
  try {
    const res = await getConfig()
    const { token, proxy } = res
    const TOKEN = token || process.env.V2EX_TOKEN
    if (!TOKEN)
      throw new Error('无效的TOKEN')

    const op: FetchOptions = {
      baseURL: 'https://www.v2ex.com/api/v2/',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }

    const _proxy = proxy || process.env.http_proxy
    if (_proxy) {
      // @ts-expect-error
      const agent = new HttpsProxyAgent(_proxy)
      op.agent = agent
    }

    return op
  }
  catch (error) {
    console.log(error)
    process.exit(1)
  }
}

