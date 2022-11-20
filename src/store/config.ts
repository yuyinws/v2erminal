import { readFile } from 'node:fs/promises'
import { existsSync } from 'node:fs'
import path from 'node:path'
import HttpsProxyAgent from 'https-proxy-agent'
import { defineStore } from 'pinia'
import type { Config, FetchOptions } from '@/type'

const defaultNodes = [
  {
    name: '问与答',
    code: 'qna',
  },
  {
    name: '酷工作',
    code: 'jobs',
  },
  {
    name: '分享发现',
    code: 'share',
  },
  {
    name: '分享创造',
    code: 'create',
  },
  {
    name: 'Apple',
    code: 'apple',
  },
  {
    name: 'macOS',
    code: 'macos',
  },
  {
    name: 'Python',
    code: 'python',
  },
  {
    name: 'iPhone',
    code: 'iphone',
  },
  {
    name: 'Android',
    code: 'android',
  },
]

const homePath = process.platform === 'win32'
  ? process.env.USERPROFILE
  : process.env.HOME

const defaultConfigPath = path.join(homePath || '~/', 'v2ex.json')

export const useConfigStore = defineStore('config', () => {
  const config: Config = reactive({
    token: null,
    proxy: null,
    nodes: null,
  })

  const canRender = ref(false)

  async function getConfig() {
    try {
      if (existsSync(defaultConfigPath)) {
        const rawConfig = await readFile(defaultConfigPath, 'utf-8')
        const parsedConfig: Config = JSON.parse(rawConfig)

        config.token = parsedConfig?.token || process.env.V2EX_TOKEN
        config.proxy = parsedConfig?.proxy || process.env.http_proxy
        config.nodes = parsedConfig?.nodes || defaultNodes
      }
      else {
        config.nodes = defaultNodes
        config.proxy = process.env.http_proxy
        config.token = process.env.V2EX_TOKEN
      }

      if (!config.token)
        throw new Error('未找到token')
      else
        canRender.value = true
    }
    catch (error) {
      console.log(error)
      process.exit(1)
    }
  }

  function fetchOptions(): FetchOptions {
    const TOKEN = config.token
    const options: FetchOptions = {
      baseURL: 'https://www.v2ex.com/api/v2/',
      headers: {
        Authorization: `Bearer ${TOKEN}`,
      },
    }

    if (config.proxy) {
      // @ts-expect-error
      options.agent = new HttpsProxyAgent(config.proxy)
    }

    return options
  }

  return {
    canRender,
    getConfig,
    config,
    fetchOptions,
  }
})
