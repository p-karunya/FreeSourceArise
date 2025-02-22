from typing import Dict, List, NewType, Optional
from phoenix.otel import register
from openinference.instrumentation.openai import OpenAIInstrumentor
from openai import OpenAI
import os
from pydantic import BaseModel
from typing import List, Dict
from pydantic import BaseModel

# Define Markdown as a type alias for str
Markdown = NewType("Markdown", str)

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
    freeApis: Optional[Dict[str, List[FreeAPI]]] = None  # Made optional
    timeline: str
    dependencies: List[str]

class PlanningResponse(BaseModel):
    blueprint: Blueprint
    markdown: Markdown


tracer_provider = register(
  project_name="FreeSourceArizeSpecFileGen",
  endpoint="https://app.phoenix.arize.com/v1/traces"
)

SpecGenerationPrompt = "Now that we’ve wrapped up the brainstorming process, can you compile our findings into a comprehensive, developer-ready specification? Include all relevant requirements, architecture choices, data handling details, error handling strategies, and a testing plan so a developer can immediately begin implementation.\n"
def flatten(nested_list):
    for item in nested_list:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

def genIdea(pastContext:List):
    OpenAIInstrumentor().instrument(tracer_provider=tracer_provider)
    client = OpenAI()

    completion = client.beta.chat.completions.parse(
    model="gpt-4o",
    messages=flatten([
        pastContext,
        {"role": "user", "content": SpecGenerationPrompt},
    ]),
    response_format=PlanningResponse,
    )

    event = completion.choices[0].message.parsed
    print(event)

genIdea([{"role": "user", "content": "I have an idea for a new app that helps people find the best local restaurants. It should have a clean, user-friendly interface and be able to recommend restaurants based on user preferences. What do you think?"}, {"role": "system", "content": "That sounds like a great idea! Let's start by defining the problem you're trying to solve and the solution you have in mind."}, {"role": "user", "content": "The problem is that people often struggle to find good restaurants in their area, and the solution is an app that uses AI to recommend the best options based on user preferences."}])