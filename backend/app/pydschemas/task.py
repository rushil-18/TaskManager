from pydantic import BaseModel
from datetime import datetime
from typing import Optional


class TaskCreate(BaseModel):
    
    content: str
    priority: str
    due_date: Optional[datetime] = None


class TaskResponse(BaseModel):
    task_id: int
    content: str
    priority: str
    completed: bool
    due_date: Optional[datetime] = None
    model_config = {'from_attributes' : True}


class TaskUpdate(BaseModel):
    content: Optional[str] = None
    priority: Optional[str] = None
    due_date: Optional[datetime] = None


class TaskComplete(BaseModel):
    completed : bool