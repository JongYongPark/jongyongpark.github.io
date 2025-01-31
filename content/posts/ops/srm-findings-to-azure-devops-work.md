---
title: "How to send findings from SRM (Software Risk Management) to Azure DevOps Work Items"
date: 2025-01-31
categories: ["ops"]
tags: ["SDLC","SRM","Azure DevOps"]
---

how to check Azure DevOps Work Items API rate limit

## How to send findings from SRM (Software Risk Management) to Azure DevOps Work Items

To send findings from **SRM (Software Risk Management)** to **Azure DevOps Work Items**, you can follow the steps outlined below. This process involves using the Azure DevOps REST API to create or update work items based on the SRM findings. Here's a detailed guide:

---

### **1. Prerequisites**
Before starting, ensure the following:
- **Azure DevOps Organization and Project**: You must have an Azure DevOps organization and project set up.
- **Personal Access Token (PAT)**:
  1. Log in to Azure DevOps.
  2. Go to **User Settings > Personal Access Tokens**.
  3. Create a new token with **Work Items (Read & Write)** permissions.
  4. Save the token securely; it will be used for API authentication.

---

### **2. Azure DevOps Work Item API Endpoint**
The Azure DevOps REST API allows you to create or update work items. The API endpoint for creating a work item is:
```
POST https://dev.azure.com/{organization}/{project}/_apis/wit/workitems/${type}?api-version=7.1-preview.3
```
- `{organization}`: Your Azure DevOps organization name.
- `{project}`: Your Azure DevOps project name.
- `{type}`: The type of work item to create (e.g., `Bug`, `Task`, `Issue`).

---

### **3. Mapping SRM Findings to Azure DevOps Work Item Fields**
Map the SRM findings to the relevant fields in Azure DevOps Work Items. For example:
- **SRM Finding Title** → Azure DevOps `Title`
- **SRM Finding Description** → Azure DevOps `Description`
- **SRM Finding Severity** → Azure DevOps `Severity`
- **SRM Finding Status** → Azure DevOps `State`

---

### **4. Example Implementation (Python)**
Below is a Python script to send SRM findings to Azure DevOps Work Items:

```python
import requests
import json
import base64

# Azure DevOps Configuration
organization = "your-organization-name"
project = "your-project-name"
personal_access_token = "your-pat-token"
work_item_type = "Bug"  # Work item type (e.g., Bug, Task, Issue)

# Azure DevOps API Endpoint
url = f"https://dev.azure.com/{organization}/{project}/_apis/wit/workitems/${work_item_type}?api-version=7.1-preview.3"

# SRM Finding Data (Example)
srm_finding = {
    "Title": "SRM Finding: Security Vulnerability",
    "Description": "A security vulnerability was identified in the authentication module.",
    "Severity": "High",
    "State": "New"
}

# Map SRM Finding to Azure DevOps Work Item Fields
work_item_payload = [
    {
        "op": "add",
        "path": "/fields/System.Title",
        "value": srm_finding["Title"]
    },
    {
        "op": "add",
        "path": "/fields/System.Description",
        "value": srm_finding["Description"]
    },
    {
        "op": "add",
        "path": "/fields/Microsoft.VSTS.Common.Severity",
        "value": srm_finding["Severity"]
    },
    {
        "op": "add",
        "path": "/fields/System.State",
        "value": srm_finding["State"]
    }
]

# Prepare API Request Headers
credentials = f":{personal_access_token}"
encoded_credentials = base64.b64encode(credentials.encode()).decode()
headers = {
    "Content-Type": "application/json-patch+json",
    "Authorization": f"Basic {encoded_credentials}"
}

# Send API Request
response = requests.post(url, headers=headers, data=json.dumps(work_item_payload))

# Check Response
if response.status_code == 200:
    print("Work Item created successfully!")
    print(response.json())
else:
    print("Failed to create Work Item!")
    print(f"Status Code: {response.status_code}")
    print(f"Response: {response.text}")
```

---

### **5. Field Mapping and Customization**
- Azure DevOps Work Items have predefined fields like `Title`, `Description`, `Severity`, and `State`.
- If you need additional fields, you can customize the work item type in Azure DevOps:
  1. Go to **Project Settings > Work Item Types**.
  2. Add or modify fields as needed.

---

### **6. Error Handling and Logging**
- Handle potential errors such as:
  - Network issues.
  - Invalid field values.
  - Authentication failures.
- Add logging to track the success or failure of API calls.

---

### **7. Automation and Scheduling**
- To automate this process:
  - Use a scheduler like **cron** (Linux) or **Task Scheduler** (Windows).
  - Alternatively, deploy the script to a cloud service like **Azure Functions** or **AWS Lambda**.

---

### **8. Testing and Validation**
- Test the script with sample SRM findings.
- Verify that the work items are created correctly in Azure DevOps.
- Check the fields and ensure the data is accurate.

---

### **9. Advanced Features**
- **Update Existing Work Items**: Use the `PATCH` method to update existing work items.
- **Attachments**: If SRM findings include files or screenshots, use the Azure DevOps API to attach files to work items.
- **Bulk Processing**: If you have multiple findings, loop through the data and create work items in bulk.

---

### **10. Example: Updating an Existing Work Item**
To update an existing work item, use the following API endpoint:
```
PATCH https://dev.azure.com/{organization}/{project}/_apis/wit/workitems/{id}?api-version=7.1-preview.3
```
- `{id}`: The ID of the work item to update.

Example payload:
```json
[
    {
        "op": "add",
        "path": "/fields/System.State",
        "value": "In Progress"
    }
]
```

---

### **Conclusion**
By following these steps, you can seamlessly integrate SRM findings into Azure DevOps Work Items. This approach improves traceability and ensures that risks and issues are managed effectively within your development workflow. Customize the script and process to fit your specific requirements.