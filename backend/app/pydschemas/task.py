from pydantic import BaseModel, Field
from datetime import datetime
from typing import Optional


class TaskCreate(BaseModel):
    content: str = Field(min_length=1, max_length=500)
    priority: str = Field(min_length=1, max_length=20)
    due_date: Optional[datetime] = None


class TaskResponse(BaseModel):
    task_id: int
    content: str
    priority: str
    completed: bool
    due_date: Optional[datetime] = None

    model_config = {"from_attributes": True}


class TaskUpdate(BaseModel):
    content: Optional[str] = Field(default=None, min_length=1, max_length=500)
    priority: Optional[str] = Field(default=None, min_length=1, max_length=20)
    due_date: Optional[datetime] = None


class TaskComplete(BaseModel):
    completed: bool