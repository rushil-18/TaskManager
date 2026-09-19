from pydantic import BaseModel
from datetime import datetime


class UserCreate(BaseModel):
    username : str
    email : str
    password : str


class UserLogin(BaseModel):
    identifier : str
    password : str

class UserResponse(BaseModel):
    uid : int
    username : str
    email : str
    created_at : datetime
    model_config = {"from_attributes" : True}