import uuid
from fastapi import APIRouter, Depends, Form, HTTPException
from sqlalchemy.orm import Session
from fastapi import File, UploadFile, Form
from pdf2image import convert_from_bytes
from PIL import Image
from fastapi.responses import JSONResponse

from app.db.database import get_db
from app.db import models, crud
from app.schemas.user import UserCreate
from app.dependencies.dependencies import get_current_admin


import os
from datetime import datetime


import io
import base64


router = APIRouter(prefix="/admin", tags=["Admin"])


@router.get("/users/")
def get_all_users(db: Session = Depends(get_db), current_admin: models.User = Depends(get_current_admin)):
    """
    Endpoint for an admin to retrieve all users.
    """
    users = db.query(models.User).filter(models.User.is_admin == False, models.User.is_deleted == False).all()
    return {"users": users}

@router.put("/users/{userID}/role")
def change_user_role(userID: int, new_role: str, db: Session = Depends(get_db), current_admin: models.User = Depends(get_current_admin)):
    """
    Endpoint for an admin to change the role of another user.
    """
    user = crud.get_user_by_id(db, userID)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if new_role == "admin":
        raise HTTPException(status_code=400, detail="Cannot set role to admin")
    

    user.role = new_role
    db.commit()
    db.refresh(user)
    return {"message": f"User role updated to {new_role}", "userID": userID}




@router.delete("/users/{userID}")
def delete_user_account(userID: int, db: Session = Depends(get_db), current_admin: models.User = Depends(get_current_admin)):
    """
    Endpoint for an admin to delete (flag as deleted) a user account.
    """
    user = crud.get_user_by_id(db, userID)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    if user.is_deleted:
        raise HTTPException(status_code=400, detail="User account is already deleted")
    
    user.is_deleted = True
    db.commit()
    db.refresh(user)
    return {"message": f"User account deleted", "userID": userID}




UPLOAD_DIRECTORY = "/Users/mac/Desktop/rdlab/backend/app/uploads/documents"

@router.post("/upload/")
async def upload_document(
    file: UploadFile = File(...),
    title: str = Form(...),
    author: str = Form(...),
    category: str = Form(...),
    db: Session = Depends(get_db),
    current_admin: models.User = Depends(get_current_admin)
):
    try:
        # Generate thumbnail preview
        file_content = await file.read()
        thumbnail_base64 = None
        
        if file.content_type == "application/pdf":
            # Convert first page of PDF to thumbnail
            images = convert_from_bytes(file_content, first_page=1, last_page=1)
            if images:
                img_byte_arr = io.BytesIO()
                images[0].save(img_byte_arr, format='JPEG', quality=70)
                thumbnail_base64 = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')
        elif file.content_type.startswith('image/'):
            # Create thumbnail for image files
            image = Image.open(io.BytesIO(file_content))
            image.thumbnail((300, 300))
            img_byte_arr = io.BytesIO()
            image.save(img_byte_arr, format='JPEG', quality=70)
            thumbnail_base64 = base64.b64encode(img_byte_arr.getvalue()).decode('utf-8')
        
        # Save original file
        file_ext = os.path.splitext(file.filename)[1]
        unique_filename = f"{uuid.uuid4()}{file_ext}"
        file_path = os.path.join(UPLOAD_DIRECTORY, unique_filename)
        
        with open(file_path, "wb") as f:
            f.write(file_content)

        # Create document record
        new_document = models.Document(
            title=title,
            author=author,
            category=category,
            uploadDate=datetime.utcnow(),
            documentPreview=thumbnail_base64, 
        )
        
        db.add(new_document)
        db.commit()
        db.refresh(new_document)

        return {
            "success": True,
            "message": "File uploaded successfully",
            "document": {
                "docID": new_document.docID,
                "title": new_document.title,
                "category": new_document.category,
                "preview": "..."
            }
        }

    except Exception as e:
        db.rollback()
        raise HTTPException(
            status_code=500,
            detail=f"File upload failed: {str(e)}"
        )
    finally:
        await file.close()


@router.get("/files/")
def get_all_files(db: Session = Depends(get_db), current_admin: models.User = Depends(get_current_admin)):
    """
    Endpoint for an admin to retrieve metadata of all uploaded files.
    """
    documents = db.query(models.Document).all()
    return {
        "documents": [
            {
                "docID": doc.docID, 
                "title": doc.title, 
                "author": doc.author, 
                "category": doc.category, 
                "uploadDate": doc.uploadDate,
                "documentPreview": doc.documentPreview  
            } 
            for doc in documents
        ]
    }