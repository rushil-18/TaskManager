from sqlalchemy import create_engine
from sqlalchemy.orm import declarative_base
from sqlalchemy.orm import sessionmaker
#pushing to env
import os
from dotenv import load_dotenv
load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")


#create engine
engine = create_engine(DATABASE_URL)
#declare_base 
Base = declarative_base()
#sessions
SessionLocal = sessionmaker(autocommit = False , autoflush = False , bind = engine)
def get_db(): 
    db = SessionLocal()
    try :
        yield db
    finally:
        db.close()


