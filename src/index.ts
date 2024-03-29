import { Hono } from 'hono'

type Bindings = {
  MY_NAME: string
  MY_KV: KVNamespace
}

const app = new Hono<{ Bindings: Bindings }>()

app.get('/', (c) => {
  return c.text(`My name is ${c.env.MY_NAME}`)
})

app.get('/name', async (c) => {
  const name = await c.env.MY_KV.get('name')
  return c.text(`Get your name ${name}`)
})

app.put('/name', async (c) => {
  const { name } = await c.req.parseBody<{ name: string }>()
  await c.env.MY_KV.put('name', name)
  return c.redirect('/name')
})

export default app
