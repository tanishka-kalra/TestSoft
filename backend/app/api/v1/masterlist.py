"""Masterlist endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import sqlalchemy.exc
from app.core.db import get_db
from app.models import masterlist


masterlist_router = APIRouter(prefix="/masterlist", tags=["masterlist"])


@masterlist_router.get("/categories", status_code=status.HTTP_200_OK)
def get_categories(db: Session = Depends(get_db)):
    """Fetch all categories from the database."""
    try:
        categories = db.query(masterlist.Category).all()
        return categories
    except sqlalchemy.exc.SQLAlchemyError as sae:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Database error occurred",
        ) from sae
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR, detail=str(e)
        ) from e
