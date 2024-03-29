import { SELF } from 'cloudflare:test'

it('Should return a 200 response - GET /', async () => {
  const response = await SELF.fetch('http://localhost/')
  expect(await response.text()).toBe('My name is Hono')
})
