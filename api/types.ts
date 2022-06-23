import { Request } from "express";
import { ParamsDictionary } from "express-serve-static-core";

export interface TypedRequestBody<TBody> extends Request {
  body: TBody;
}

export interface TypedRequestParams<TParams extends ParamsDictionary>
  extends Request {
  params: TParams;
}

export interface TypedRequestBodyAndParams<
  TParams extends ParamsDictionary,
  TBody
> extends Request {
  params: TParams;
  body: TBody;
}
