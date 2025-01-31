---
title: "Azure DevOps API Rate Limits"
date: 2025-01-31
categories: ["ops"]
tags: ["Azure DevOps"]
---

Azure DevOps imposes **rate limits** on its REST API to ensure fair usage and prevent abuse. If you exceed these limits, your API requests may be throttled, resulting in HTTP `429 Too Many Requests` responses. To avoid this, it's important to monitor and manage your API usage.

Here’s how you can check and handle Azure DevOps Work Items API rate limits:

---

### **1. Understanding Azure DevOps API Rate Limits**
Azure DevOps API rate limits are based on:
- **Requests per minute (RPM)**: The number of requests allowed within a 60-second window.
- **Concurrent requests**: The number of simultaneous requests allowed.

The exact limits depend on:
- Your Azure DevOps organization tier (e.g., Free, Basic, or Enterprise).
- The type of API being used (e.g., Work Items, Git, Build, etc.).

For most APIs, the default rate limit is **15,000 requests per hour** per organization.

---

### **2. Checking Rate Limits**
Azure DevOps provides rate limit information in the **response headers** of every API request. Look for the following headers:

| Header Name               | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| `X-RateLimit-Limit`        | The total number of requests allowed in the current time window.            |
| `X-RateLimit-Remaining`    | The number of requests remaining in the current time window.                |
| `X-RateLimit-Reset`        | The time (in seconds) until the rate limit resets.                          |

---

### **3. Example: Checking Rate Limits in Python**
Here’s how you can check the rate limits using Python:

```python
import requests
import base64
import time

# Azure DevOps Configuration
organization = "your-organization-name"
project = "your-project-name"
personal_access_token = "your-pat-token"

# API Endpoint
url = f"https://dev.azure.com/{organization}/{project}/_apis/wit/workitems?api-version=7.1-preview.3"

# Prepare Headers
credentials = f":{personal_access_token}"
encoded_credentials = base64.b64encode(credentials.encode()).decode()
headers = {
    "Authorization": f"Basic {encoded_credentials}"
}

# Make API Request
response = requests.get(url, headers=headers)

# Check Rate Limit Headers
rate_limit_limit = response.headers.get("X-RateLimit-Limit")
rate_limit_remaining = response.headers.get("X-RateLimit-Remaining")
rate_limit_reset = response.headers.get("X-RateLimit-Reset")

print(f"Rate Limit: {rate_limit_limit}")
print(f"Remaining Requests: {rate_limit_remaining}")
print(f"Reset Time (seconds): {rate_limit_reset}")

# Handle Throttling (429 Too Many Requests)
if response.status_code == 429:
    reset_time = int(rate_limit_reset)
    print(f"Rate limit exceeded. Waiting for {reset_time} seconds...")
    time.sleep(reset_time)
    # Retry the request
    response = requests.get(url, headers=headers)
```

---

### **4. Handling Rate Limits**
If you exceed the rate limit, Azure DevOps will return an HTTP `429 Too Many Requests` response. To handle this:
1. **Exponential Backoff**: Wait for a progressively longer time before retrying the request.
2. **Respect the Reset Time**: Use the `X-RateLimit-Reset` header to wait until the rate limit resets.
3. **Reduce Request Frequency**: Optimize your code to make fewer requests (e.g., batch requests).

---

### **5. Best Practices to Avoid Rate Limiting**
- **Batch Requests**: Use batch APIs (e.g., `$batch` endpoint) to combine multiple requests into a single call.
- **Caching**: Cache frequently accessed data to reduce the number of API calls.
- **Throttling Logic**: Implement throttling logic in your application to stay within the rate limits.
- **Monitor Usage**: Regularly check the `X-RateLimit-Remaining` header to monitor your usage.

---

### **6. Example: Batch API Request**
Azure DevOps supports batch requests to reduce the number of API calls. Here’s an example:

```python
batch_url = f"https://dev.azure.com/{organization}/{project}/_apis/$batch?api-version=7.1-preview.1"

batch_payload = {
    "requests": [
        {
            "method": "GET",
            "url": f"/{project}/_apis/wit/workitems?ids=1&api-version=7.1-preview.3"
        },
        {
            "method": "GET",
            "url": f"/{project}/_apis/wit/workitems?ids=2&api-version=7.1-preview.3"
        }
    ]
}

response = requests.post(batch_url, headers=headers, json=batch_payload)
print(response.json())
```

---

### **7. Monitoring API Usage**
- Use Azure DevOps **Analytics** or **Logs** to monitor API usage.
- Set up alerts for high API usage or throttling events.

---

### **8. Increasing Rate Limits**
If you consistently hit rate limits, consider:
- **Upgrading Your Plan**: Higher-tier plans (e.g., Enterprise) may have higher rate limits.
- **Contacting Microsoft Support**: Request a rate limit increase for your organization.

---

By monitoring and respecting Azure DevOps API rate limits, you can ensure smooth integration and avoid disruptions in your workflows.