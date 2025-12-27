# Data Tables

POST /data-tables → CreateDataTable - Done
GET /data-tables → ListDataTables - Done
GET /data-tables/{tableId} → DescribeDataTable - Done
PUT /data-tables/{tableId} → UpdateDataTableMetadata - Done
DELETE /data-tables/{tableId} → DeleteDataTable - Done

# Attributes

POST /table/{tableId}/attribute → CreateDataTableAttribute - Done
GET /table/{tableId}/attribute → ListDataTableAttributes - Done
GET /table/{tableId}/attribute/ → DescribeDataTableAttribute - Done
PUT /table/{tableId}/attributes/{attributeId} → UpdateDataTableAttribute - Done
DELETE /table/{tableId}/attribute/{attributeId} → DeleteDataTableAttribute - Done

# Values

GET /table/{tableId}/values → ListDataTableValues - Done
POST /table/{tableId}/values/batch → BatchCreateDataTableValue
PUT /table/{tableId}/values/batch → BatchUpdateDataTableValue
DELETE /table/{tableId}/values/batch → BatchDeleteDataTableValue
POST /table/{tableId}/values/search → BatchDescribeDataTableValue
GET /table/{tableId}/primary-values → ListDataTablePrimaryValues - Done
PUT /table/{tableId}/primary-values → UpdateDataTablePrimaryValues - Done

# Search & Evaluate

POST /data-tables/search → SearchDataTables - Done
POST /data-tables/{tableId}/evaluate → EvaluateDataTableValues - Done
