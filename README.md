<p align="center">
 <img src="https://cdn.jsdelivr.net/gh/yuyinws/static@master/2022/11/upgit_20221115_1668520164.png"/>
</p>


<p align="center">
  Interactive terminal client for  <a href="https://v2ex.com">V2EX</a>. Powered by <a href="https://github.com/vue-terminal/vue-termui">vue-termui</a> and <a href="https://www.v2ex.com/help/api">V2ex API</a>.
</p>



## Preview
<p align="center">
 <img src="https://cdn.jsdelivr.net/gh/yuyinws/static@master/2022/11/upgit_20221115_1668521573.gif?"/>
</p>



## Install

```sh
npm install -g v2erminal
```

> Recommend node version 16

## Usage

1. Get a  [Personal V2ex Token](https://www.v2ex.com/settings/tokens)

2. Set token as Environmental Variable

   ```bash
   export V2EX_TOKEN="XXXXXXXXX"
   ```

3. Open the terminal and then typing `V2EX`

   ```bash
   v2ex
   ```

## Config

Create a file named `v2ex.json` in home path.

```json
{
  "token": "xxxxxxxxxx",
  "proxy": "http://127.0.0.1:7890",
  "nodes": [
    {
      "name": "问与答",
      "code": "qna"
    },
    {
      "name": "酷工作",
      "code": "jobs"
    },
    {
      "name": "分享发现",
      "code": "share"
    }
  ]
}

```



## Known Issus

- http proxy not working on `node >= 18`. 
