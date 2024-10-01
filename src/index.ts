import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import {generateChildrenAlbumList, generateAlbumList} from './factories/album-factory';
import { faker } from '@faker-js/faker';
import { cors } from 'hono/cors'

const albums = generateAlbumList(10);

const app = new Hono()

app.use('*', async (c, next) => {
  const corsMiddlewareHandler = cors({
    origin: "*",
  })
  return corsMiddlewareHandler(c, next)
})

app.get('/albums', (c) => {
  const params = c.req.query()

  const albumId = params['filters.filters.Filters[0].Value']
console.log(albumId)
  return c.json(
    {
      Data: albumId ? generateChildrenAlbumList(20) : albums,
      PageIndex: 2,
      PageSize: 5,
      TotalCount: 40
    },
    200
  )
})

app.get('/pageData', (c) => {
    return c.json({
      Permissions: {
        AllowDeleteAlbum: true,
        AllowRenameAlbum: true,
        AllowShareAlbum: true,
        AllowAddAlbum: true
      }
    },
    200
  )
})

app.post('/renameAlbum', async (c) => {
  return c.json({
    Success: true,
    Errors: [],
    Data: []
  }, 200)
})

app.post('/removeImages', async (c) => {
  const body = await c.req.parseBody()
  console.log(body)

  return c.json({
    Success: true,
    Errors: [],
    Data: []
  }, 200)
})

app.post('/createAlbum', async (c) => {
  const body = await c.req.parseBody()

  albums.push({ 
    Name: body.albumName,
    AlbumOwner: 'Owner',
    ItemsCount: 1,
    ImageUrl: "https://picsum.photos/200"
  })
})

app.post('/addImages', async (c) => {
  return c.json({
    Success: true,
    Errors: [],
    Data: []
  }, 200)
})

app.get('/getAlbumChildren', (c) => {
  return c.json( 
    {
      Data: generateChildrenAlbumList(20),
      PageIndex: 2,
      PageSize: 5,
      TotalCount: 40
    },
    200
  )
})

app.get('/getAlbumTree', (c) => {
  const params = c.req.query()
  let isHome = false;

  if (!params.albumId)
    isHome = true

  const response = isHome ? [] : Array.from({ length: 20}, () => {
    return {
      albumId: faker.number.int({ min: 1, max: 1000 }), 
      name: faker.music.genre(),
    }
  })

  return c.json( 
    {
      Tree: response
    },
    200
  )
})

const port = 3000
console.log(`Server is running on port ${port}`)

serve({
  fetch: app.fetch,
  port
})
