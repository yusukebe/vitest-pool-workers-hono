import { env } from 'cloudflare:test'
import app from '../src'

it('Should get a environment variable', async () => {
  const res = await app.request('/', {}, env)
  expect(await res.text()).toBe('My name is Hono')
})

it('Should put a name to KV and get a name from KV', async () => {
  const form = new FormData()
  form.append('name', 'Cloudflare')
  let res = await app.request(
    '/name',
    {
      method: 'PUT',
      body: form
    },
    env
  )
  expect(res.headers.get('location')).toBe('/name')

  res = await app.request('/name', {}, env)
  expect(await res.text()).toBe('Get your name Cloudflare')
})
