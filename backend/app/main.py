"""Main application file for the backend service."""
from fastapi import FastAPI
from app.api import common,question

app=FastAPI()
app.include_router(common.router)
app.include_router(question.router)
