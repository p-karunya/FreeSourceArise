from typing import List
from phoenix.otel import register
from openinference.instrumentation.openai import OpenAIInstrumentor
from openai import OpenAI
import os
from pydantic import BaseModel

class InitialSpecification(BaseModel):
    problem: str
    solution: str
    keyFeatures: List[str]
    targetAudience: str
    constraints: List[str]

class InitialResponse(BaseModel):
    questions: List[str]
    specification: InitialSpecification


tracer_provider = register(
  project_name="FreeSourceArize",
  endpoint="https://app.phoenix.arize.com/v1/traces"
)

BrainstormPrompt = "Ask me one question at a time so we can develop a thorough, step-by-step spec for this idea. Each question should build on my previous answers, and our end goal is to have a detailed specification I can hand off to a developer. Let’s do this iteratively and dig into every relevant detail. Remember, only one question at a time.\n Here’s the idea: \n"

def flatten(nested_list):
    for item in nested_list:
        if isinstance(item, list):
            yield from flatten(item)
        else:
            yield item

def genIdea(UserInput, pastContext:List =None):
    OpenAIInstrumentor().instrument(tracer_provider=tracer_provider)
    client = OpenAI()

    if pastContext is None:
        content = [{"role": "user", "content": BrainstormPrompt+UserInput}]
    else:
        content = flatten([
            pastContext,
            {"role": "user", "content": BrainstormPrompt+UserInput},
        ])

    completion = client.beta.chat.completions.parse(
    model="gpt-4o",
    messages=content,
    response_format=InitialResponse,
    )

    event = completion.choices[0]
    print(event)

genIdea("I want to build a new social media platform for dogs")


    
