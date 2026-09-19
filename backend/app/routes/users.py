from fastapi import APIRouter
from fastapi import Depends
from fastapi import HTTPException
from fastapi import Response
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.tables import User
from app.pydschemas.user import UserCreate, UserResponse , UserLogin
from app.security.auth import hash_password,verify_password,create_access_token,get_current_user

router = APIRouter(prefix = "/auth" , tags = ["Authentication"])



@router.post("/register", response_model=UserResponse, status_code=201)
def register(user_data: UserCreate, db: Session = Depends(get_db)):
    existing_user = db.query(User).filter((User.email == user_data.email) |(User.username == user_data.username)).first()
    if existing_user:
        raise HTTPException(status_code=400,detail="Email or username already exists")
    new_user = User(
        username=user_data.username,
        email=user_data.email,
        password_hash=hash_password(user_data.password)
    )
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user

@router.post("/login", response_model=UserResponse)
def login(user_data: UserLogin,response : Response ,db: Session = Depends(get_db)):
    if "@" in user_data.identifier:
        login_user = db.query(User).filter(User.email == user_data.identifier).first()
    else:
        login_user = db.query(User).filter(User.username == user_data.identifier).first()
    if not login_user:
        raise HTTPException(status_code=401,detail="User not found")
    if not verify_password(
        user_data.password,
        login_user.password_hash
    ):
        raise HTTPException(status_code=401,detail="Wrong password")

    access_token = create_access_token(login_user.uid)
    response.set_cookie(
        key = "access_token",
        value = access_token,
        httponly = True
    )
    return login_user


@router.get("/me", response_model = UserResponse)
def get_me(current_user : User = Depends(get_current_user)):
    return current_user

@router.post("/logout" )
def logout(response : Response):
    response.delete_cookie(key = "access_token")
    return {"message" : "Logged out successfully"}


    
    

