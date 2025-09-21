"""Service for Question CRUD operations"""
from sqlalchemy.orm import Session
from app.models.models import SingleChoiceQuestion
from app.schemas.question_schema import singleChoiceQuesSchemaInput 

class QuestionCRUD:
    """Methods to handle question-related database operations."""    

    def add_single_choice_question_db(self,q_details: singleChoiceQuesSchemaInput,db:Session):
        new_question=SingleChoiceQuestion(**q_details.model_dump(by_alias=True))        
        db.add(new_question)
        db.commit()
        db.refresh(new_question)
        return new_question
    
    def get_all_single_choice_questions(self,db:Session):
        return db.query(SingleChoiceQuestion).all()
    
    
    
questioncrud=QuestionCRUD()

#   id: int=Field(...,alias="q_id")
#     text: str=Field(...,alias="q_question")
#     category: int=Field(...,alias="q_category")
#     difficulty: int=Field(...,alias="q_difficulty")
#     option_1: str=Field(...,alias="q_option_1")
#     option_2: str=Field(...,alias="q_option_2")
#     option_3: str=Field(...,alias="q_option_3")
#     option_4: str=Field(...,alias="q_option_4")
#     correct_ans: str=Field(...,alias="q_correct_ans")
#     explanation: str=Field(...,alias="q_explanation")
#     tags: int=Field(...,alias="q_tags")
#     type: int=Field(...,alias="q_type")
#     image_path: str=Field(...,alias="q_image_path")
#     created_by: int=Field(...,alias="q_created_by")
#     created_at: str=Field(...,alias="q_created_at")
#     updated_by: int=Field(...,alias="q_updated_by")
#     updated_at: str=Field(...,alias="q_updated_at")

#  __tablename__ = "question"
#     q_id = Column(Integer, primary_key=True, index=True)
#     q_text = Column(String)
#     q_option_1=Column(String)
#     q_option_2=Column(String)
#     q_option_3=Column(String)
#     q_option_4=Column(String)
#     q_correct_ans=Column(String)
#     q_category = Column(Integer)
#     q_difficulty= Column(Integer)
#     q_tags=Column(Integer)
#     q_explanation=Column(String)
#     q_created_by=Column(Integer)
#     q_created_at=Column(DateTime)
#     q_type = Column(Integer)
#     q_updated_at=Column(DateTime)
#     q_updated_by=Column(Integer)
#     q_image_path=Column(String)