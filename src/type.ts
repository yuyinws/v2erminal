export interface Node {
  name: string
  code: string
  isSelect: boolean
}

export interface Topic {
  id: number
  title: string
  replies: number
  isSelect: boolean
}

export interface Topics {
  list: Topic[]
  activeIndex: number
  page: number
}

export interface Detail {
  title: string
  content: string
  replies: []
}

export type Component = 'topic' | 'detail'
