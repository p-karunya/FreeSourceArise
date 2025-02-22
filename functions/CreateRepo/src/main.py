import requests
import json

def main(context):
    body = context.req.body

    if not body:
        return context.res.text("Error: Empty request body")

    try:
        data = json.loads(body)
    except json.JSONDecodeError as e:
        return context.res.text(f"JSON parsing error: {str(e)}")

    token = data.get("token")
    name = data.get("repo_name", "project_repo")
    desc = data.get("repo_description", "This is an automated repository created using GitHub API")
    private = data.get("private", False)
    url = "https://api.github.com/user/repos"

    payload = {
        "name": name,
        "description": desc,
        "private": private
    }

    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }

    response = requests.post(url, json=payload, headers=headers)

    if response.status_code == 201:
        output = "Repo URL: " + response.json()["html_url"]
    else:
        output = "Failed to create repository: " + response.json()
    
    context.log(output)
    return context.res.json(output, 200)