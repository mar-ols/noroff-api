import { server } from "@/test-utils"
import { db } from "@/utils"

beforeEach(async () => {
  await db.rainyDaysProduct.createMany({
    data: [
      {
        title: "Rainy Days Thunderbolt Jacket",
        description:
          "The Women's Rainy Days Thunderbolt jacket is a sleek and stylish waterproof jacket perfect for any outdoor adventure.",
        gender: "Female",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        baseColor: "Black",
        price: 139.99,
        discountedPrice: 139.99,
        onSale: false,
        image: "https://static.cloud.noroff.dev/public/rainy-days/9-thunderbolt-jacket.jpg",
        tags: ["jacket", "womens"],
        favorite: false
      },
      {
        title: "Rainy Days Habita Jacket",
        description:
          "The Women's Rainy Days Habita jacket is a relaxed fit with breathable material that is a packable answer to uncertain weather.",
        gender: "Female",
        sizes: ["XS", "S", "M", "L", "XL", "XXL"],
        baseColor: "Black",
        price: 129.99,
        discountedPrice: 129.99,
        onSale: false,
        image: "https://static.cloud.noroff.dev/public/rainy-days/3-habita-jacket.jpg",
        tags: ["jacket", "womens"],
        favorite: true
      }
    ]
  })
})

afterEach(async () => {
  const rainyDaysProduct = db.rainyDaysProduct.deleteMany()

  await db.$transaction([rainyDaysProduct])
  await db.$disconnect()
})

describe("[GET] /v2/rainy-days", () => {
  it("should return all rainy days products", async () => {
    const response = await server.inject({
      url: "/api/v2/rainy-days",
      method: "GET"
    })
    const res = await response.json()

    expect(response.statusCode).toBe(200)
    expect(res.data).toBeDefined()
    expect(res.data).toHaveLength(2)
    expect(res.data[0].id).toBeDefined()
    expect(res.data[1].id).toBeDefined()
    expect(res.meta).toBeDefined()
    expect(res.meta).toStrictEqual({
      isFirstPage: true,
      isLastPage: true,
      currentPage: 1,
      previousPage: null,
      nextPage: null,
      pageCount: 1,
      totalCount: 2
    })
  })

  it("should return all rainy days products with sort", async () => {
    const response = await server.inject({
      url: "/api/v2/rainy-days?sort=title&sortOrder=desc",
      method: "GET"
    })
    const res = await response.json()

    expect(response.statusCode).toBe(200)
    expect(res.data).toBeDefined()
    expect(res.data).toHaveLength(2)
    expect(res.data[0].id).toBeDefined()
    expect(res.data[0].title).toBe("Rainy Days Thunderbolt Jacket")
    expect(res.data[1].id).toBeDefined()
    expect(res.data[1].title).toBe("Rainy Days Habita Jacket")
    expect(res.meta).toBeDefined()
    expect(res.meta).toStrictEqual({
      isFirstPage: true,
      isLastPage: true,
      currentPage: 1,
      previousPage: null,
      nextPage: null,
      pageCount: 1,
      totalCount: 2
    })
  })

  it("should return all rainy days products with pagination", async () => {
    const response = await server.inject({
      url: "/api/v2/rainy-days?page=1&limit=1",
      method: "GET"
    })
    const res = await response.json()

    expect(response.statusCode).toBe(200)
    expect(res.data).toBeDefined()
    expect(res.data).toHaveLength(1)
    expect(res.data[0].id).toBeDefined()
    expect(res.meta).toBeDefined()
    expect(res.meta).toStrictEqual({
      isFirstPage: true,
      isLastPage: false,
      currentPage: 1,
      previousPage: null,
      nextPage: 2,
      pageCount: 2,
      totalCount: 2
    })
  })
})
