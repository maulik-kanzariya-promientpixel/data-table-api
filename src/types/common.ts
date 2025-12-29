export interface IPrimaryValue {
  AttributeName: string;
  Value: string;
}

export interface IPrimaryValueFilter {
  AttributeName: string;
  Values: string[];
}

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginationMeta {
  nextToken?: string;
  hasMore: boolean;
  totalCount?: number;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T> {
  pagination: PaginationMeta;
}

export interface ConnectConfig {
  instanceId: string;
  region: string;
}

export interface ServiceErrorContext {
  service: string;
  operation: string;
  tableId?: string;
  attributeId?: string;
}
