import { FastifyInstance } from "fastify"

import { bookSchema, bookParamsSchema } from "./books.schema"
import { createResponseSchema, sortAndPaginationSchema } from "@noroff/api-utils"
import { getBooksHandler, getBookHandler, getRandomBookHandler } from "./books.controller"

async function bookRoutes(server: FastifyInstance) {
  server.get(
    "/",
    {
      schema: {
        tags: ["books"],
        querystring: sortAndPaginationSchema,
        response: {
          200: createResponseSchema(bookSchema.array())
        }
      }
    },
    getBooksHandler
  )

  server.get(
    "/random",
    {
      schema: {
        tags: ["books"],
        response: {
          200: createResponseSchema(bookSchema)
        }
      }
    },
    getRandomBookHandler
  )

  server.get(
    "/:id",
    {
      schema: {
        tags: ["books"],
        params: bookParamsSchema,
        response: {
          200: createResponseSchema(bookSchema)
        }
      }
    },
    getBookHandler
  )
}

export default bookRoutes