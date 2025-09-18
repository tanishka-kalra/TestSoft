"""API routes for the application."""
from fastapi import APIRouter
from app.api.v1 import masterlist

router = APIRouter()
router.include_router(masterlist.masterlist_router, prefix="/v1", tags=["masterlist"])
