from fastapi import FastAPI
from app.database import engine, Base , get_db
from fastapi import Depends
from sqlalchemy.orm import Session
from app.models.tables import User, Task
from app.routes.tasks import router as task_router
from app.routes.users import router as user_router

from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
#fastapi <-> react through cors
app.add_middleware(CORSMiddleware , allow_origins = ["http://localhost:5173"],allow_credentials= True, allow_methods = ["*"],allow_headers = ["*"])
app.include_router(task_router)
app.include_router(user_router)



@app.get("/")
def home():
    return {"message" : "Task Manager api"}




    

#fastapi<-> database
Base.metadata.create_all(bind = engine)
