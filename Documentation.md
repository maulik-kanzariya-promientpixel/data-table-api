# Data Tables API Documentation

This API provides comprehensive management of AWS Connect Data Tables, including table operations, attribute management, and data evaluation capabilities.

## Base URL

```
http://localhost:8000
```

## Authentication

The API uses AWS credentials configured via environment variables:

- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_SESSION_TOKEN` (optional)
- `INSTANCE_ID` (AWS Connect Instance ID)

## Error Handling

All endpoints return standardized error responses:

### Validation Errors (400)

```json
{
  "message": "Invalid request body",
  "errors": ["Field-specific error messages"]
}
```

### AWS Service Errors (4xx/5xx)

```json
{
  "error": "AWS service error message"
}
```

### General Errors (500)

```json
{
  "message": "Error description"
}
```

---

# Data Tables

## List Data Tables

Retrieve all data tables in the AWS Connect instance.

**Endpoint:** `GET /data-table/`

### Response

```json
{
  "list": [
    {
      "DataTableId": "string",
      "Name": "string",
      "Description": "string",
      "Status": "PUBLISHED",
      "TimeZone": "string",
      "ValueLockLevel": "NONE|ATTRIBUTE|DATA_TABLE|PRIMARY_VALUE|VALUE",
      "Tags": {
        "key": "value"
      }
    }
  ]
}
```

### Example

```bash
curl -X GET http://localhost:8000/data-table/
```

---

## Create Data Table

Create a new data table in AWS Connect.

**Endpoint:** `POST /data-table/`

### Request Body

```json
{
  "name": "string", // Required: 3-128 characters
  "timezone": "string", // Required: Valid timezone
  "description": "string", // Optional: Max 500 characters
  "status": "PUBLISHED", // Optional
  "valueLockLevel": "NONE|ATTRIBUTE|DATA_TABLE|PRIMARY_VALUE|VALUE", // Required
  "tags": {
    // Optional
    "key": "value"
  }
}
```

### Response (201)

```json
{
  "DataTableId": "string",
  "LockVersion": "string",
  "$metadata": {
    "httpStatusCode": 200,
    "requestId": "string"
  }
}
```

### Example

```bash
curl -X POST http://localhost:8000/data-table/ \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Customer Data",
    "timezone": "America/New_York",
    "description": "Customer information table",
    "valueLockLevel": "NONE",
    "tags": {
      "department": "sales"
    }
  }'
```

---

## Get Data Table by ID

Retrieve a specific data table by its ID.

**Endpoint:** `GET /data-table/{tableId}`

### Path Parameters

- `tableId` (string, required): The data table ID

### Response (200)

```json
{
  "DataTableId": "string",
  "Name": "string",
  "Description": "string",
  "Status": "PUBLISHED",
  "TimeZone": "string",
  "ValueLockLevel": "NONE|ATTRIBUTE|DATA_TABLE|PRIMARY_VALUE|VALUE",
  "LockVersion": "string",
  "Tags": {
    "key": "value"
  }
}
```

### Example

```bash
curl -X GET http://localhost:8000/data-table/12345678-1234-1234-1234-123456789012
```

---

## Update Data Table

Update an existing data table's metadata.

**Endpoint:** `PUT /data-table/{tableId}`

### Path Parameters

- `tableId` (string, required): The data table ID

### Request Body

```json
{
  "name": "string", // Required: 1-127 characters
  "timezone": "string", // Required: Valid timezone
  "description": "string", // Optional: Max 250 characters
  "valueLockLevel": "NONE|ATTRIBUTE|DATA_TABLE|PRIMARY_VALUE|VALUE" // Required
}
```

### Response (200)

```json
{
  "message": "Table updated successfully",
  "data": "string" // LockVersion
}
```

### Example

```bash
curl -X PUT http://localhost:8000/data-table/12345678-1234-1234-1234-123456789012 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Customer Data",
    "timezone": "America/Los_Angeles",
    "description": "Updated customer information",
    "valueLockLevel": "ATTRIBUTE"
  }'
```

---

## Delete Data Table

Delete a data table and all its associated data.

**Endpoint:** `DELETE /data-table/{tableId}`

### Path Parameters

- `tableId` (string, required): The data table ID

### Response (200)

```json
{
  "message": "Table deleted",
  "deletedTable": {
    "httpStatusCode": 200,
    "requestId": "string"
  }
}
```

### Example

```bash
curl -X DELETE http://localhost:8000/data-table/12345678-1234-1234-1234-123456789012
```

---

# Attributes

All attribute endpoints require a `tableId` parameter and use the `tableId` middleware for validation.

## Create Attribute

Create a new attribute for a data table.

**Endpoint:** `POST /table/{tableId}/attribute`

### Path Parameters

- `tableId` (string, required): The data table ID

### Request Body

```json
{
  "name": "string",                    // Required: 1-127 characters
  "valueType": "BOOLEAN|NUMBER|NUMBER_LIST|TEXT|TEXT_LIST", // Required
  "description": "string",             // Optional: Max 250 characters
  "primary": boolean,                  // Optional: Mark as primary key
  "validation": {                      // Optional: Validation rules
    "Enum": {
      "Strict": boolean,
      "Values": ["string"]
    },
    "ExclusiveMaximum": number,
    "ExclusiveMinimum": number,
    "IgnoreCase": boolean,
    "Maximum": number,
    "MaxLength": number,
    "MaxValues": number,
    "Minimum": number,
    "MinLength": number,
    "MinValues": number,
    "MultipleOf": number
  }
}
```

### Response (201)

```json
{
  "message": "Attribute created successfully",
  "data": {
    "AttributeId": "string",
    "LockVersion": "string",
    "$metadata": {
      "httpStatusCode": 200,
      "requestId": "string"
    }
  }
}
```

### Example

```bash
curl -X POST http://localhost:8000/table/12345678-1234-1234-1234-123456789012/attribute \
  -H "Content-Type: application/json" \
  -d '{
    "name": "customer_email",
    "valueType": "TEXT",
    "description": "Customer email address",
    "primary": false,
    "validation": {
      "MaxLength": 255,
      "MinLength": 5
    }
  }'
```

---

## List Attributes

Retrieve all attributes for a data table.

**Endpoint:** `GET /table/{tableId}/attributes`

### Path Parameters

- `tableId` (string, required): The data table ID

### Response (200)

```json
{
  "attributes": [
    {
      "AttributeId": "string",
      "Name": "string",
      "ValueType": "BOOLEAN|NUMBER|NUMBER_LIST|TEXT|TEXT_LIST",
      "Description": "string",
      "Primary": boolean,
      "Validation": {
        "Enum": {
          "Strict": boolean,
          "Values": ["string"]
        },
        "Maximum": number,
        "Minimum": number,
        "MaxLength": number,
        "MinLength": number
      }
    }
  ]
}
```

### Example

```bash
curl -X GET http://localhost:8000/table/12345678-1234-1234-1234-123456789012/attributes
```

---

## Get Attribute by Name

Retrieve a specific attribute by its name.

**Endpoint:** `GET /table/{tableId}/attribute`

### Path Parameters

- `tableId` (string, required): The data table ID

### Request Body

```json
{
  "name": "string" // Required: Attribute name
}
```

### Response (200)

```json
{
  "attribute": {
    "AttributeId": "string",
    "Name": "string",
    "ValueType": "BOOLEAN|NUMBER|NUMBER_LIST|TEXT|TEXT_LIST",
    "Description": "string",
    "Primary": boolean,
    "Validation": {
      "Enum": {
        "Strict": boolean,
        "Values": ["string"]
      },
      "Maximum": number,
      "Minimum": number,
      "MaxLength": number,
      "MinLength": number
    }
  }
}
```

### Example

```bash
curl -X GET http://localhost:8000/table/12345678-1234-1234-1234-123456789012/attribute \
  -H "Content-Type: application/json" \
  -d '{
    "name": "customer_email"
  }'
```

---

## Update Attribute

Update an existing attribute's properties.

**Endpoint:** `PUT /table/{tableId}/attribute`

### Path Parameters

- `tableId` (string, required): The data table ID

### Request Body

```json
{
  "name": "string",                    // Required: Current attribute name
  "newName": "string",                 // Optional: New attribute name (1-127 chars)
  "valueType": "BOOLEAN|NUMBER|NUMBER_LIST|TEXT|TEXT_LIST", // Required
  "description": "string",             // Optional: Max 250 characters
  "primary": boolean,                  // Optional: Mark as primary key
  "validation": {                      // Optional: Validation rules
    "Enum": {
      "Strict": boolean,
      "Values": ["string"]
    },
    "ExclusiveMaximum": number,
    "ExclusiveMinimum": number,
    "IgnoreCase": boolean,
    "Maximum": number,
    "MaxLength": number,
    "MaxValues": number,
    "Minimum": number,
    "MinLength": number,
    "MinValues": number,
    "MultipleOf": number
  }
}
```

### Response (200)

```json
{
  "message": "attribute updated successfully",
  "data": "string" // LockVersion
}
```

### Example

```bash
curl -X PUT http://localhost:8000/table/12345678-1234-1234-1234-123456789012/attribute \
  -H "Content-Type: application/json" \
  -d '{
    "name": "customer_email",
    "newName": "email_address",
    "valueType": "TEXT",
    "description": "Primary email address for customer",
    "validation": {
      "MaxLength": 320,
      "MinLength": 5
    }
  }'
```

---

## Delete Attribute

Delete an attribute from a data table.

**Endpoint:** `DELETE /table/{tableId}/attribute`

### Path Parameters

- `tableId` (string, required): The data table ID

### Request Body

```json
{
  "name": "string" // Required: Attribute name to delete
}
```

### Response (200)

```json
{
  "message": "Table Attribute deleted sucesfully",
  "deletedAttribute": "string" // LockVersion
}
```

### Example

```bash
curl -X DELETE http://localhost:8000/table/12345678-1234-1234-1234-123456789012/attribute \
  -H "Content-Type: application/json" \
  -d '{
    "name": "customer_email"
  }'
```

---

# Search & Evaluation

## Search Data Tables

Search for data tables based on various criteria.

**Endpoint:** `POST /table/search`

### Request Body

```json
{
  "operationType": "AND|OR", // Required: How to combine search criteria
  "name": "string", // Optional: Search by table name (1-255 chars)
  "description": "string", // Optional: Search by description (1-1000 chars)
  "tags": {
    // Optional: Search by tags
    "key": "value" // Each key/value max 256 chars
  }
}
```

**Note:** At least one search filter (name, description, or tags) must be provided.

### Response (200)

```json
{
  "tables": [
    {
      "DataTableId": "string",
      "Name": "string",
      "Description": "string",
      "Status": "PUBLISHED",
      "TimeZone": "string",
      "ValueLockLevel": "NONE|ATTRIBUTE|DATA_TABLE|PRIMARY_VALUE|VALUE",
      "Tags": {
        "key": "value"
      }
    }
  ]
}
```

### Example

```bash
curl -X POST http://localhost:8000/table/search \
  -H "Content-Type: application/json" \
  -d '{
    "operationType": "AND",
    "name": "customer",
    "tags": {
      "department": "sales"
    }
  }'
```

---

## Evaluate Data Table (Not Implemented)

Evaluate data table values based on specified criteria.

**Endpoint:** `POST /table/evaluate`

### Status

This endpoint is currently not implemented. The controller function exists but contains no logic.

---

# Middleware

## Table ID Middleware

All attribute endpoints automatically validate the `tableId` parameter through middleware:

- Extracts `tableId` from URL parameters
- Validates that `tableId` is provided
- Adds `tableId` to the request object for use in controllers
- Returns 400 error if `tableId` is missing

---

# Data Types

## Value Types

Attributes can have the following value types:

- `BOOLEAN`: True/false values
- `NUMBER`: Numeric values
- `NUMBER_LIST`: Array of numbers
- `TEXT`: String values
- `TEXT_LIST`: Array of strings

## Lock Levels

Tables and values can have different lock levels:

- `NONE`: No locking
- `ATTRIBUTE`: Lock at attribute level
- `DATA_TABLE`: Lock entire table
- `PRIMARY_VALUE`: Lock primary values only
- `VALUE`: Lock individual values

## Validation Rules

Attributes support comprehensive validation:

- `Enum`: Restrict to specific values
- `Maximum`/`Minimum`: Numeric range validation
- `MaxLength`/`MinLength`: String length validation
- `MaxValues`/`MinValues`: Array size validation
- `MultipleOf`: Numeric multiple validation
- `ExclusiveMaximum`/`ExclusiveMinimum`: Exclusive range validation
- `IgnoreCase`: Case-insensitive validation

---

# Environment Configuration

Required environment variables:

```env
PORT=8000
ENVIRONMENT="development"
AWS_ACCESS_KEY_ID="your-access-key"
AWS_SECRET_ACCESS_KEY="your-secret-key"
AWS_SESSION_TOKEN="your-session-token"
INSTANCE_ID="your-connect-instance-id"
```

---

