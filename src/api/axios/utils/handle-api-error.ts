import { isAxiosError } from "axios";
import type { ApiResponse } from "@/src/core/responses";

export function handleApiError<Body>(
  error: unknown,
  statusCode: number,
  ApiResponseClass: typeof ApiResponse,
) {
  if (isAxiosError(error)) {
    if (error.response && error.response.data) {
      const serverError = error.response.data;
      if (typeof serverError === "object" && serverError !== null) {
        if ("message" in serverError && typeof serverError.message === "string") {
          console.log(`Api error message from server: ${serverError.message}`);
          return new ApiResponseClass({
            errorMessage: serverError.message,
            statusCode,
          }) as ApiResponse<Body>;
        }
      }
    }
    return new ApiResponseClass({
      errorMessage: error.message,
      statusCode,
    }) as ApiResponse<Body>;
  }

  if (typeof error === "object" && error !== null) {
    if ("title" in error && "message" in error) {
      console.error(`Api error title: ${error.title}`);
      console.error(`Api error message: ${error.message}`);
      return new ApiResponseClass({
        errorMessage: String(error.message),
        statusCode,
      }) as ApiResponse<Body>;
    }
  }

  return new ApiResponseClass({
    errorMessage: "Unknown api error",
    statusCode,
  }) as ApiResponse<Body>;
}
