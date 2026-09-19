from pydantic import BaseModel, EmailStr, Field
from datetime import datetime


class UserCreate(BaseModel):
    username: str = Field(min_length=3, max_length=50)
    email: EmailStr
    password: str = Field(min_length=8, max_length=128)


class UserLogin(BaseModel):
    identifier: str
    password: str


class UserResponse(BaseModel):
    uid: int
    username: str
    email: str
    created_at: datetime

    model_config = {"from_attributes": True}