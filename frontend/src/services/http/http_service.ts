export interface HttpService {
  get(path: string): Promise<object>;

  post(path: string, body?: object): Promise<object>;

  put(path: string, body?: object): Promise<object>;
}

export class HttpServiceError extends Error {

}

export class HttpNotFoundError extends HttpServiceError {

}


export class HttpForbiddenError extends HttpServiceError {

}

export class HttpBadRequestError extends HttpServiceError {

}

export class HttpServerError extends HttpServiceError {

}

export class HttpServiceUnavailableError extends HttpServiceError {

}
