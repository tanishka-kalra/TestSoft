from pydantic import BaseModel, Field


class RoleSchema(BaseModel):
    schema_id:int=Field(...,alias="r_id")
    schema_name: str=Field(...,alias="r_name")

class difficultyLevelSchema(BaseModel):
    id: int=Field(...,alias="d_id")
    name: str=Field(...,alias="d_name")
    
class questionTypeSchema(BaseModel):
    id: int=Field(...,alias="q_id")
    type: str=Field(...,alias="q_type")
    
