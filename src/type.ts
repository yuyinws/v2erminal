export interface Node {
  name: string
  code: string
  isSelect?: boolean
}

export interface Topic {
  id: number
  title: string
  replies: number
  isSelect: boolean
  created: number
}

export interface Topics {
  list: Topic[]
  activeIndex: number
  page: number
}

export interface Reply {
  id: number
  content: string
  member: Member
  index: number
}

export interface Member {
  id: number
  username: string
}

export interface Detail {
  title: string
  content: string
  replies: Reply[] | null
  allReplies: Reply[] | null
  total: number
  page: number
}

export interface Config {
  token?: string | null
  nodes?: Node[] | null
  proxy?: string | null
}

export interface FetchOptions {
  baseURL: string
  headers: any
  agent?: any
}

export type Component = 'topic' | 'detail'
