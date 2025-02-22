from pydantic import BaseModel
from typing import List, Dict

# ---------------------------
# Initial Stage Models
# ---------------------------
class InitialSpecification(BaseModel):
    problem: str
    solution: str
    keyFeatures: List[str]
    targetAudience: str
    constraints: List[str]

class InitialResponse(BaseModel):
    questions: List[str]
    specification: InitialSpecification


# ---------------------------
# Planning Stage Models
# ---------------------------
class Phase(BaseModel):
    name: str
    tasks: List[str]

class FreeAPI(BaseModel):
    name: str
    description: str
    url: str
    features: List[str]

class Blueprint(BaseModel):
    phases: List[Phase]
    freeApis: Dict[str, List[FreeAPI]]
    timeline: str
    dependencies: List[str]

class PlanningResponse(BaseModel):
    blueprint: Blueprint


# ---------------------------
# Development Stage Models
# ---------------------------
class DevelopmentSetup(BaseModel):
    environment: List[str]
    testing: List[str]
    tooling: List[str]
    configuration: List[str]

class DevelopmentResponse(BaseModel):
    setup: DevelopmentSetup


# ---------------------------
# Testing Stage Models
# ---------------------------
class TestPlan(BaseModel):
    unit: List[str]
    integration: List[str]
    e2e: List[str]
    coverage: str

class TestingResponse(BaseModel):
    testPlan: TestPlan


# ---------------------------
# Progress Stage Models
# ---------------------------
class Checklist(BaseModel):
    setup: List[str]
    development: List[str]
    testing: List[str]
    deployment: List[str]

class ProgressResponse(BaseModel):
    checklist: Checklist


# ---------------------------
# Summary Stage Models
# ---------------------------
class ProjectOverview(BaseModel):
    title: str
    description: str
    objectives: List[str]

class TechnicalStack(BaseModel):
    frontend: List[str]
    backend: List[str]
    deployment: List[str]

class ImplementationPhase(BaseModel):
    name: str
    tasks: List[str]

class Implementation(BaseModel):
    phases: List[ImplementationPhase]
    timeline: str
    milestones: List[str]

class TestingSummary(BaseModel):
    strategy: str
    coverage: str
    types: List[str]

class SummaryContent(BaseModel):
    projectOverview: ProjectOverview
    technicalStack: TechnicalStack
    implementation: Implementation
    testing: TestingSummary

class SummaryResponse(BaseModel):
    summary: SummaryContent