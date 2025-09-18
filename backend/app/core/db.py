"""
This file is used to create the database connection and session for the database.
"""

import logging

from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from fastapi import HTTPException

try:
    engine = create_engine(
        "postgresql://myuser:ViratKohli%4005@localhost/testsoft"
    )
    SessionLocal = sessionmaker(
        autocommit=False, autoflush=False, bind=engine, expire_on_commit=False
    )
    Base = declarative_base()
except Exception as exception:
    logging.error("There is issue in database connections now. %s", exception)


async def get_db():
    """Dependency to get DB session."""
    db = SessionLocal()
    try:
        yield db
    except Exception as exc:
        # log if you want
        raise HTTPException(status_code=500, detail=str(exc)) from exc
    finally:
        db.close()

