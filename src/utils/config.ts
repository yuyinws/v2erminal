import fs from 'node:fs/promises'
import path from 'node:path'
import type { Config } from '@/type'

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

const home = process.platform === 'win32'
  ? process.env.USERPROFILE
  : process.env.HOME

const defaultConfigPath = path.join(home || '~/', 'v2ex.json')

export async function getConfig(): Promise<Config> {
  try {
    const content = await fs.readFile(defaultConfigPath, 'utf-8')
    const parsedContent = JSON.parse(content)

    if (!parsedContent?.nodes)
      parsedContent.nodes = defaultNodes

    return parsedContent
  }
  catch (error) {
    return {
      token: null,
      nodes: defaultNodes,
    }
  }
}
