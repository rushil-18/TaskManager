from pwdlib import PasswordHash
from jose import jwt
from jose import JWTError
from datetime import datetime, timezone , timedelta
from fastapi import Cookie , HTTPException , Depends
import os 
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.tables import User


password_hash = PasswordHash.recommended()
def hash_password(password : str):
    return password_hash.hash(password)
def verify_password(plain_password : str , hash_password : str):
    return password_hash.verify(plain_password , hash_password)


load_dotenv()
SECRET_KEY = os.getenv("JWT_SECRET_KEY")
ALGORITHM = "HS256"

def create_access_token(user_id : int):
    payload = {"sub" : str(user_id),
               "exp" : datetime.now(timezone.utc)+timedelta(minutes=30)}
    token = jwt.encode(payload , SECRET_KEY, algorithm= ALGORITHM)

    return token

def get_current_user(access_token : str = Cookie(None) , db : Session = Depends(get_db)):
    if not access_token:
        raise HTTPException(status_code = 401 , detail = "Not Authenticated")
    try:
        payload = jwt.decode(access_token , SECRET_KEY , algorithms= [ALGORITHM])
        user_id = payload.get("sub")
        user_id = int(user_id)
        user = db.query(User).filter(User.uid == user_id).first()
    except JWTError:
        raise HTTPException(status_code = 401 , detail = "Invalid token or expired")
    
    if not user :
        raise HTTPException(status_code = 401 , detail = "User Not Found")
    return user
