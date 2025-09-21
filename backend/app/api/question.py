from fastapi import APIRouter
from app.schemas.question_schema import singleChoiceQuesSchemaOutput,singleChoiceQuesSchemaInput
from app.core.database import get_db
from sqlalchemy.orm import Session
from typing import List
from app.services.question import  questioncrud
from fastapi import Depends
router=APIRouter()


"""API route to add a single choice question to the database."""
@router.post("/add-single-choice-question",response_model=singleChoiceQuesSchemaOutput,response_model_by_alias=False)
def add_single_choice_question(q_details:singleChoiceQuesSchemaInput,db:Session=Depends(get_db)):
    return questioncrud.add_single_choice_question_db(q_details,db)


@router.get("/get-all-single-choice-questions", response_model=List[singleChoiceQuesSchemaOutput],response_model_by_alias=False)
def get_all_single_choice_questions(db:Session=Depends(get_db)):
    return questioncrud.get_all_single_choice_questions(db)
    

    
