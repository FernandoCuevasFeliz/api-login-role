/* eslint-disable import/no-extraneous-dependencies */
import { Router } from 'express';
import { BAD_REQUEST, INTERNAL_SERVER_ERROR } from 'http-status-codes';
import { MongoError } from 'mongodb';
import { Error as MongooseError } from 'mongoose';

import ErrorHandler from './ErrorHandler';

interface IRoutes {
  get(...handlers: THandler[]): IRoutes;
  post(...handlers: THandler[]): IRoutes;
  put(...handlers: THandler[]): IRoutes;
  patch(...handlers: THandler[]): IRoutes;
  delete(...handlers: THandler[]): IRoutes;
}

export function errorParse(error: Error, next: TNext) {
  if (
    error instanceof MongoError ||
    error instanceof MongooseError.CastError ||
    error instanceof MongooseError.ValidationError
  ) {
    next(new ErrorHandler(BAD_REQUEST, error.message));
    return;
  }

  if (error instanceof ErrorHandler) {
    next(error);
    return;
  }

  next(new ErrorHandler(INTERNAL_SERVER_ERROR, 'Error Perfoming Action'));
}

export class ErrorRouter {
  private _router = Router();

  constructor() {
    this.route.bind(this);
  }

  get router() {
    return this._router;
  }

  route(path: string): IRoutes {
    const get = this.get.bind(this);
    const post = this.post.bind(this);
    const put = this.put.bind(this);
    const patch = this.patch.bind(this);
    const deleteA = this.delete.bind(this);

    return {
      get(...handlers) {
        get(path, ...handlers);
        return this;
      },
      post(...handlers) {
        post(path, ...handlers);
        return this;
      },
      put(...handlers) {
        put(path, ...handlers);
        return this;
      },
      patch(...handlers) {
        patch(path, ...handlers);
        return this;
      },
      delete(...handlers) {
        deleteA(path, ...handlers);
        return this;
      }
    };
  }

  get(path: string, ...handlers: THandler[]) {
    const handler = this.handlerException(handlers.pop());
    this.router.get(path, handlers, handler);
    return this;
  }

  post(path: string, ...handlers: THandler[]) {
    const handler = this.handlerException(handlers.pop());
    this.router.post(path, handlers, handler);
    return this;
  }

  put(path: string, ...handlers: THandler[]) {
    const handler = this.handlerException(handlers.pop());
    this.router.put(path, handlers, handler);
    return this;
  }

  patch(path: string, ...handlers: THandler[]) {
    const handler = this.handlerException(handlers.pop());
    this.router.patch(path, handlers, handler);
    return this;
  }

  delete(path: string, ...handlers: THandler[]) {
    const handler = this.handlerException(handlers.pop());
    this.router.delete(path, handlers, handler);
    return this;
  }

  handlerException(handler: any) {
    return (req: TRequest, res: TResponse, next: TNext) => {
      try {
        handler(req, res)?.catch(($error: Error) => {
          errorParse($error, next);
        });
      } catch (err) {
        errorParse(err, next);
      }
    };
  }
}
