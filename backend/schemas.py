from pydantic import BaseModel

class ProductSchema(BaseModel):
    name: str
    price: int
    description: str
    image_url: str


class CartAdd(BaseModel):
    product_id: int
    quantity: int