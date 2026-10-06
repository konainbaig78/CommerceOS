const API_URL =
  import.meta.env.VITE_API_URL ??
  "http://localhost:3001";

export class ApiError extends Error {
  status: number;
  code: string;
  details?: {
    path: string;
    message: string;
  }[];

  constructor(
    status: number,
    code: string,
    message: string,
    details?: {
      path: string;
      message: string;
    }[],
  ) {
    super(message);

    this.name = "ApiError";
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

export interface Pagination {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
}

type QueryValue =
  | string
  | number
  | boolean
  | string[]
  | undefined;

type Query = Record<string, QueryValue>;

function toQuery(params?: Query) {
  if (!params) return "";

  const query = new URLSearchParams();

  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === "") continue;

    query.set(
      key,
      Array.isArray(value)
        ? value.join(",")
        : String(value),
    );
  }

  const result = query.toString();

  return result ? `?${result}` : "";
}

async function request<T>(
  method: string,
  path: string,
  options: {
    query?: Query;
    body?: unknown;
  } = {},
) {
  const response = await fetch(
    `${API_URL}${path}${toQuery(options.query)}`,
    {
      method,
      headers: options.body
        ? {
            "Content-Type": "application/json",
          }
        : undefined,
      body: options.body
        ? JSON.stringify(options.body)
        : undefined,
    },
  );

  const json = await response.json();

  if (!response.ok || !json.success) {
    const error = json.error ?? {};

    throw new ApiError(
      response.status,
      error.code ?? "UNKNOWN",
      error.message ?? "Request failed",
      error.details,
    );
  }

  return json as {
    data: T;
    pagination?: Pagination;
  };
}

export const api = {
  get: <T>(path: string, query?: Query) =>
    request<T>("GET", path, { query }),

  post: <T>(path: string, body: unknown) =>
    request<T>("POST", path, { body }),

  patch: <T>(path: string, body: unknown) =>
    request<T>("PATCH", path, { body }),

  delete: <T>(path: string, query?: Query) =>
    request<T>("DELETE", path, { query }),
};