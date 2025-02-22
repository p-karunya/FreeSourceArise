import requests
import base64
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
    repo_url = data.get("url")
    name = data.get("name")
    content = data.get("content")
    commit = data.get("commit", f"Updating {name} file")
    branch = data.get("branch", "main")

    # Extract owner and repo name from URL
    repo_parts = repo_url.split('github.com/')[1]
    owner, repo_name = repo_parts.split('/')

    # Base64 encode the content
    content_base64 = base64.b64encode(content.encode()).decode()

    # Prepare headers
    headers = {
        "Authorization": f"token {token}",
        "Accept": "application/vnd.github.v3+json"
    }

    # Check if the file exists in the repository
    file_url = f"https://api.github.com/repos/{owner}/{repo_name}/contents/{name}?ref={branch}"
    
    try:
        response = requests.get(file_url, headers=headers)
        
        if response.status_code == 200:
            # File exists, get the SHA to update
            file_data = response.json()
            sha = file_data['sha']
        elif response.status_code == 404:
            # File doesn't exist, no SHA, create a new file
            sha = None
        else:
            return context.res.text(f"Error: {response.status_code} - {response.text}")
        
    except Exception as e:
        return context.res.text(f"Request failed: {str(e)}")
    
    # Prepare data for the API request
    api_data = {
        "message": commit,
        "content": content_base64,
        "branch": branch
    }

    if sha:
        # If the file exists, update it by including the SHA
        api_data["sha"] = sha
    
    # Construct the API URL for uploading the file (creating or updating)
    api_url = f"https://api.github.com/repos/{owner}/{repo_name}/contents/{name}"

    try:
        # Make the API request to upload or update the file
        response = requests.put(api_url, headers=headers, data=json.dumps(api_data))

        if response.status_code == 201 or response.status_code == 200:
            output = "File uploaded/updated successfully!"
        else:
            output = f"Error: {response.status_code} - {response.text}"

    except Exception as e:
        output = f"Request failed: {str(e)}"

    # Log and return the response
    context.log(output)
    return context.res.text(output)
