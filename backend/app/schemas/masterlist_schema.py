from pydantic import BaseModel, Field


class RoleSchema(BaseModel):
    id: int=Field(...,alias="r_id")
    name: str=Field(...,alias="r_name")
