// backend/src/api/store/search/route.ts
import type {
  MedusaRequest,
  MedusaResponse
} from "@medusajs/framework/http";

export async function GET(req: MedusaRequest, res: MedusaResponse) {
  try {
    const { q, limit = "12", offset = "0" } = req.query;
    console.log("query ", q);
    
    const productService = req.scope.resolve("product");

    // Get paginated products - search only in title
    const products = await productService.listProducts(
      {
        title: { $ilike: `%${q}%` }
      },
      {
        take: parseInt(limit as string),
        skip: parseInt(offset as string),
      }
    );

    // Get total count
    const allProducts = await productService.listProducts({
      title: { $ilike: `%${q}%` }
    });
    const count = allProducts.length;

    res.json({
      products,
      count,
    });

  } catch (error) {
    res.status(500).json({
      error: error.message
    });
  }
}
