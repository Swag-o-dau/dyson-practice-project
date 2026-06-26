from fastapi import FastAPI, status, Depends, HTTPException, Header
import models
from database import engine, SessionLocal
from typing import Annotated
from schemas import ProductSchema
from sqlalchemy.orm import Session
from pydantic import BaseModel, Field
from schemas import CartAdd


app = FastAPI()


models.Base.metadata.create_all(bind=engine)

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


db_dependency = Annotated[Session, Depends(get_db)]


@app.get("/products")
async def get_products(db: db_dependency):
    products = db.query(models.Product).all()
    return products


@app.post("/products", status_code=status.HTTP_201_CREATED)
async def create_product(payload: ProductSchema, db: db_dependency):
    new_product = models.Product(
        name=payload.name,
        price=payload.price,
        description=payload.description,
        image_url=payload.image_url,
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return new_product

@app.post("/cart/add")
async def add_to_cart(item: CartAdd, db: db_dependency):
    cart_item = models.CartItem(
        product_id=item.product_id,
        quantity=item.quantity
    )
    db.add(cart_item)
    db.commit()
    db.refresh(cart_item)
    
    return cart_item


@app.delete("/cart/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_cart_item(item_id: int, db: db_dependency):
    cart = db.query(models.CartItem).filter(models.CartItem.id == item_id).first()
    if cart is None:
        raise HTTPException(status_code=404, detail="Запись не найдена")
    db.delete(cart)
    db.commit()


@app.get("/cart")
async def get_cart(db: db_dependency):
    cart = db.query(models.CartItem).all()
    return cart