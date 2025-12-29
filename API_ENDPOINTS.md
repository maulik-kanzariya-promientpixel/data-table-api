# AWS Connect Data Tables API - Complete Documentation

## URL Structure

The API requires the AWS Connect Instance ID to be included in the URL path:

```
/api/instance/{instanceId}/...
```

## Authentication

The API uses AWS Lambda execution environment credentials. No additional authentication headers are required.

## Common Error Responses

All endpoints may return these common errors:

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "MISSING_INSTANCE_ID",
    "message": "Instance ID is required in the URL path"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "ENDPOINT_NOT_FOUND",
    "message": "Endpoint GET /invalid/path not found"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_SERVER_ERROR",
    "message": "An unexpected error occurred"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

---

## Health Check

### GET `/health`

Health check endpoint to verify API status.

**Request:** No body required

**Response (200):**
```json
{
  "success": true,
  "data": {
    "status": "healthy",
    "timestamp": "2024-01-01T00:00:00.000Z",
    "version": "1.0.0",
    "environment": "production",
    "runtime": "AWS Lambda"
  }
}
```

---

## Tables

### GET `/api/instance/{instanceId}/tables`

List all data tables in the Connect instance.

**Request:** No body required

**Response (200):**
```json
{
  "list": [
    {
      "DataTableId": "12345678-1234-1234-1234-123456789012",
      "Name": "CustomerData",
      "Description": "Customer information table",
      "Status": "PUBLISHED",
      "TimeZone": "UTC",
      "ValueLockLevel": "NONE",
      "CreatedTime": 1640995200000,
      "LastModifiedTime": 1640995200000,
      "Tags": {
        "Environment": "Production"
      }
    }
  ]
}
```

### POST `/api/instance/{instanceId}/tables`

Create a new data table.

**Request Body:**
```json
{
  "name": "CustomerData",
  "timezone": "UTC",
  "description": "Customer information table",
  "status": "PUBLISHED",
  "valueLockLevel": "NONE",
  "tags": {
    "Environment": "Production"
  }
}
```

**Required Fields:**
- `name` (string, 3-128 chars): Table name
- `timezone` (string): Timezone identifier
- `valueLockLevel` (enum): One of "ATTRIBUTE", "DATA_TABLE", "NONE", "PRIMARY_VALUE", "VALUE"

**Optional Fields:**
- `description` (string, max 500 chars): Table description
- `status` (enum): "PUBLISHED"
- `tags` (object): Key-value pairs for tagging

**Response (201):**
```json
{
  "DataTableId": "12345678-1234-1234-1234-123456789012",
  "LockVersion": {
    "Value": "1"
  }
}
```

**Validation Errors (400):**
```json
{
  "message": "Validation error",
  "errors": [
    {
      "field": "name",
      "message": "Table name must be at least 3 characters"
    }
  ]
}
```

### GET `/api/instance/{instanceId}/tables/{tableId}`

Get a specific table by ID.

**Request:** No body required

**Response (200):**
```json
{
  "DataTableId": "12345678-1234-1234-1234-123456789012",
  "Name": "CustomerData",
  "Description": "Customer information table",
  "Status": "PUBLISHED",
  "TimeZone": "UTC",
  "ValueLockLevel": "NONE",
  "CreatedTime": 1640995200000,
  "LastModifiedTime": 1640995200000,
  "LockVersion": {
    "Value": "1"
  },
  "Tags": {
    "Environment": "Production"
  }
}
```

### PUT `/api/instance/{instanceId}/tables/{tableId}`

Update an existing table.

**Request Body:**
```json
{
  "name": "UpdatedCustomerData",
  "timezone": "America/New_York",
  "description": "Updated customer information table",
  "valueLockLevel": "ATTRIBUTE"
}
```

**Required Fields:**
- `name` (string, 1-127 chars): Table name
- `timezone` (string): Timezone identifier
- `valueLockLevel` (enum): Lock level

**Response (200):**
```json
{
  "message": "Table updated successfully",
  "data": {
    "Value": "2"
  }
}
```

### DELETE `/api/instance/{instanceId}/tables/{tableId}`

Delete a table.

**Request:** No body required

**Response (200):**
```json
{
  "message": "Table deleted",
  "deletedTable": {
    "httpStatusCode": 200,
    "requestId": "12345678-1234-1234-1234-123456789012"
  }
}
```

---

## Attributes

### GET `/api/instance/{instanceId}/tables/{tableId}/attributes`

List all attributes for a table.

**Request:** No body required

**Response (200):**
```json
{
  "attributes": [
    {
      "AttributeId": "attr-123",
      "Name": "CustomerName",
      "ValueType": "TEXT",
      "Description": "Customer full name",
      "Primary": false,
      "Validation": {
        "MaxLength": 100,
        "MinLength": 1
      }
    }
  ]
}
```

### POST `/api/instance/{instanceId}/tables/{tableId}/attribute`

Create a new attribute.

**Request Body:**
```json
{
  "name": "CustomerEmail",
  "valueType": "TEXT",
  "description": "Customer email address",
  "primary": false,
  "validation": {
    "MaxLength": 255,
    "MinLength": 5
  }
}
```

**Required Fields:**
- `name` (string, 1-127 chars): Attribute name
- `valueType` (enum): "BOOLEAN", "NUMBER", "NUMBER_LIST", "TEXT", "TEXT_LIST"

**Optional Fields:**
- `description` (string, max 250 chars): Attribute description
- `primary` (boolean): Whether this is a primary attribute
- `validation` (object): Validation rules

**Response (201):**
```json
{
  "message": "Attribute created successfully",
  "data": {
    "AttributeId": "attr-456",
    "LockVersion": {
      "Value": "1"
    }
  }
}
```

### GET `/api/instance/{instanceId}/tables/{tableId}/attribute`

Get a specific attribute by name.

**Request Body:**
```json
{
  "name": "CustomerEmail"
}
```

**Response (200):**
```json
{
  "attribute": {
    "AttributeId": "attr-456",
    "Name": "CustomerEmail",
    "ValueType": "TEXT",
    "Description": "Customer email address",
    "Primary": false,
    "Validation": {
      "MaxLength": 255,
      "MinLength": 5
    }
  }
}
```

### PUT `/api/instance/{instanceId}/tables/{tableId}/attribute`

Update an existing attribute.

**Request Body:**
```json
{
  "name": "CustomerEmail",
  "newName": "CustomerEmailAddress",
  "valueType": "TEXT",
  "description": "Updated customer email address",
  "primary": false,
  "validation": {
    "MaxLength": 320,
    "MinLength": 5
  }
}
```

**Required Fields:**
- `name` (string): Current attribute name
- `valueType` (enum): Value type

**Response (200):**
```json
{
  "message": "attribute updated successfully",
  "data": {
    "Value": "2"
  }
}
```

### DELETE `/api/instance/{instanceId}/tables/{tableId}/attribute`

Delete an attribute.

**Request Body:**
```json
{
  "name": "CustomerEmail"
}
```

**Response (200):**
```json
{
  "message": "Table Attribute deleted sucesfully",
  "deletedAttribute": {
    "Value": "3"
  }
}
```

---

## Values

### GET `/api/instance/{instanceId}/tables/{tableId}/values`

Get table values with optional filtering.

**Request Body (Optional):**
```json
{
  "recordIds": ["record-123", "record-456"],
  "primaryValues": [
    {
      "AttributeName": "CustomerId",
      "Values": ["CUST001", "CUST002"]
    }
  ]
}
```

**Response (200):**
```json
{
  "values": [
    {
      "RecordId": "record-123",
      "PrimaryValues": [
        {
          "AttributeName": "CustomerId",
          "Value": "CUST001"
        }
      ],
      "AttributeName": "CustomerName",
      "Value": "John Doe",
      "LockVersion": {
        "Value": "1"
      }
    }
  ]
}
```

### GET `/api/instance/{instanceId}/tables/{tableId}/primary-values`

Get primary values for a table.

**Request Body (Optional):**
```json
{
  "recordIds": ["record-123"],
  "primaryValues": [
    {
      "AttributeName": "CustomerId",
      "Values": ["CUST001"]
    }
  ]
}
```

**Response (200):**
```json
{
  "values": [
    {
      "PrimaryValues": [
        {
          "AttributeName": "CustomerId",
          "Value": "CUST001"
        }
      ]
    }
  ]
}
```

### POST `/api/instance/{instanceId}/tables/{tableId}/primary-values`

Update primary values.

**Request Body:**
```json
{
  "primaryValue": [
    {
      "AttributeName": "CustomerId",
      "Value": "CUST001"
    }
  ],
  "newPrimaryValue": [
    {
      "AttributeName": "CustomerId",
      "Value": "CUST001_NEW"
    }
  ]
}
```

**Response (200):**
```json
{
  "lockVersion": {
    "Value": "2"
  }
}
```

### POST `/api/instance/{instanceId}/tables/{tableId}/values`

Batch create values.

**Request Body:**
```json
{
  "values": [
    {
      "PrimaryValues": [
        {
          "AttributeName": "CustomerId",
          "Value": "CUST003"
        }
      ],
      "AttributeName": "CustomerName",
      "Value": "Jane Smith",
      "LockVersion": {
        "Value": "0"
      }
    }
  ]
}
```

**Response (200):**
```json
{
  "values": {
    "Values": [
      {
        "RecordId": "record-789",
        "LockVersion": {
          "Value": "1"
        }
      }
    ]
  }
}
```

### PUT `/api/instance/{instanceId}/tables/{tableId}/values`

Batch update values.

**Request Body:**
```json
{
  "values": [
    {
      "PrimaryValues": [
        {
          "AttributeName": "CustomerId",
          "Value": "CUST003"
        }
      ],
      "AttributeName": "CustomerName",
      "Value": "Jane Smith Updated",
      "LockVersion": {
        "Value": "1"
      }
    }
  ]
}
```

**Response (200):**
```json
{
  "values": {
    "Values": [
      {
        "RecordId": "record-789",
        "LockVersion": {
          "Value": "2"
        }
      }
    ]
  }
}
```

### DELETE `/api/instance/{instanceId}/tables/{tableId}/values`

Batch delete values.

**Request Body:**
```json
{
  "values": [
    {
      "PrimaryValues": [
        {
          "AttributeName": "CustomerId",
          "Value": "CUST003"
        }
      ],
      "AttributeName": "CustomerName",
      "LockVersion": {
        "Value": "2"
      }
    }
  ]
}
```

**Response (200):**
```json
{
  "values": {
    "Values": [
      {
        "RecordId": "record-789"
      }
    ]
  }
}
```

### GET `/api/instance/{instanceId}/tables/{tableId}/value`

Batch describe values.

**Request Body:**
```json
{
  "values": [
    {
      "PrimaryValues": [
        {
          "AttributeName": "CustomerId",
          "Value": "CUST001"
        }
      ],
      "AttributeName": "CustomerName",
      "Value": "John Doe"
    }
  ]
}
```

**Response (200):**
```json
{
  "values": {
    "Values": [
      {
        "RecordId": "record-123",
        "AttributeName": "CustomerName",
        "Value": "John Doe",
        "ValueType": "TEXT",
        "LockVersion": {
          "Value": "1"
        }
      }
    ]
  }
}
```

---

## Evaluation

### POST `/api/instance/{instanceId}/evaluate/search`

Search for tables based on criteria.

**Request Body:**
```json
{
  "operationType": "AND",
  "name": "Customer",
  "description": "customer data",
  "tags": {
    "Environment": "Production",
    "Department": "Sales"
  }
}
```

**Required Fields:**
- `operationType` (enum): "AND" or "OR"
- At least one of: `name`, `description`, or `tags`

**Response (200):**
```json
{
  "tables": [
    {
      "DataTableId": "12345678-1234-1234-1234-123456789012",
      "Name": "CustomerData",
      "Description": "Customer information table",
      "Status": "PUBLISHED",
      "Tags": {
        "Environment": "Production",
        "Department": "Sales"
      }
    }
  ]
}
```

### POST `/api/instance/{instanceId}/tables/{tableId}/evaluate`

Evaluate table values.

**Request Body:**
```json
{
  "timezone": "UTC",
  "values": [
    {
      "PrimaryValues": [
        {
          "AttributeName": "CustomerId",
          "Value": "CUST001"
        }
      ],
      "AttributeNames": ["CustomerName", "CustomerEmail"]
    }
  ]
}
```

**Required Fields:**
- `timezone` (string): Timezone for evaluation
- `values` (array): Values to evaluate

**Response (200):**
```json
{
  "message": "Data table evaluation completed",
  "data": [
    {
      "PrimaryValues": [
        {
          "AttributeName": "CustomerId",
          "Value": "CUST001"
        }
      ],
      "Values": [
        {
          "AttributeName": "CustomerName",
          "Value": "John Doe"
        },
        {
          "AttributeName": "CustomerEmail",
          "Value": "john.doe@example.com"
        }
      ]
    }
  ]
}
```

---

## Error Handling

### Validation Errors (400)
When request validation fails:
```json
{
  "message": "Validation error",
  "errors": [
    {
      "field": "name",
      "message": "Table name must be at least 3 characters"
    }
  ]
}
```

### AWS Service Errors (400/500)
When AWS Connect service returns an error:
```json
{
  "message": "AWS Connect service error",
  "error": {
    "code": "ResourceNotFoundException",
    "message": "The specified resource was not found"
  }
}
```

### Missing Parameters (400)
When required parameters are missing:
```json
{
  "message": "Table id is required"
}
```

---

## Rate Limits

The API inherits AWS Lambda and AWS Connect service rate limits. Refer to AWS documentation for current limits.

## SDK Compatibility

This API is compatible with AWS Connect Data Tables service and follows AWS API conventions.