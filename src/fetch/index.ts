const TOKEN = process.env.V2EX_TOKEN

export const fetchOptions = {
  baseURL: 'https://www.v2ex.com/api/v2/',
  headers: {
    Authorization: `Bearer ${TOKEN}`,
  },
}

