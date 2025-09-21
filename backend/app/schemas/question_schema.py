"""Schema for Single Choice Question Model"""
from pydantic import BaseModel, Field
from typing import List
from datetime import datetime

class singleChoiceQuesSchemaInput(BaseModel):
    text: str=Field(...,alias="q_text",example="What is the capital of France?")
    category: int=Field(...,alias="q_category",example=2)
    difficulty: int=Field(...,alias="q_difficulty",example=3)
    option_1: str=Field(...,alias="q_option_1",example="Berlin")
    option_2: str=Field(...,alias="q_option_2",example="Madrid")
    option_3: str=Field(...,alias="q_option_3",example="Paris")
    option_4: str=Field(...,alias="q_option_4",example="Rome")
    correct_ans: str=Field(...,alias="q_correct_ans",example="Paris")
    explanation: str=Field(...,alias="q_explanation",example="Paris is the capital of France.")
    tags: str=Field(...,alias="q_tags",example="gk")
    type: int=Field(...,alias="q_type",example=1)
    image_path: str=Field(...,alias="q_image_path",example="/images/paris.png")
    created_by: int=Field(...,alias="q_created_by",example=1)
    updated_by: int=Field(...,alias="q_updated_by",example=1)
    
    
    class Config:
        populate_by_name=True
        json_schema_extra = {"example": {
                    "text": "What is the capital of France?",
                    "category": 2,
                    "difficulty": 3,
                    "option_1": "Berlin",
                    "option_2": "Madrid",
                    "option_3": "Paris",
                    "option_4": "Rome",
                    "correct_ans": "Paris",
                    "explanation": "Paris is the capital of France.",
                    "tags": "gk",
                    "type": 1,
                    "image_path": "/images/paris.png",
                    "created_by": 2,
                    "updated_by": 2,
                    }}
        

class singleChoiceQuesSchemaOutput(BaseModel):
    id: int=Field(...,alias="q_id")
    text: str=Field(...,alias="q_text")
    question_category: int=Field(...,alias="q_category")
    difficulty_evel: int=Field(...,alias="q_difficulty")
    option_1: str=Field(...,alias="q_option_1")
    option_2: str=Field(...,alias="q_option_2")
    option_3: str=Field(...,alias="q_option_3")
    option_4: str=Field(...,alias="q_option_4")
    correct_ans: str=Field(...,alias="q_correct_ans")
    explanation: str=Field(...,alias="q_explanation")
    tags: str=Field(...,alias="q_tags")
    question_type: int=Field(...,alias="q_type")
    image_path: str=Field(...,alias="q_image_path")
    
    