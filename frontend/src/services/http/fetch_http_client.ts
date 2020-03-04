import {
  HttpBadRequestError,
  HttpForbiddenError,
  HttpNotFoundError,
  HttpServerError,
  HttpService,
  HttpServiceError,
  HttpServiceUnavailableError,
} from './http_service';

export class FetchHttpClient implements HttpService {
  async get(path: string): Promise<object> {
    const resp = await fetch('/_api' + path);
    return this.handleResponse(resp);
  }

  async post(path: string, body?: object): Promise<object> {
    const resp = await fetch('/_api' + path, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return this.handleResponse(resp);
  }

  async put(path: string, body?: object): Promise<object> {
    const resp = await fetch('/_api' + path, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    return this.handleResponse(resp);
  }

  private handleResponse(resp: Response): Promise<object> {
    if (resp.status === 400) {
      throw new HttpBadRequestError();
    } else if (resp.status === 403) {
      throw new HttpForbiddenError();
    } else if (resp.status === 404) {
      throw new HttpNotFoundError();
    } else if (resp.status === 500) {
      throw new HttpServerError();
    } else if (resp.status === 503) {
      throw new HttpServiceUnavailableError();
    } else if (resp.status < 200 || resp.status >= 300) {
      throw new HttpServiceError();
    }

    return resp.json();
  }
}
