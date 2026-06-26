from database import Base
from sqlalchemy import Column, Integer, String


class Product(Base):
    __tablename__ = 'products'

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    price = Column(Integer)
    description = Column(String)
    image_url = Column(String)


class Cart(Base):
    __tablename__ = 'cart'

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)


class CartItem(Base):
    __tablename__ = 'cart_item'

    id = Column(Integer, primary_key=True, index=True)
    cart_id = Column(Integer)
    product_id = Column(Integer)
    quantity = Column(Integer)