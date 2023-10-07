import { NextFunction, Request, RequestHandler, Response } from "express";
import * as yup from "yup";

type TMethodsValidation = "body" | "headers" | "params" | "query";
type TValidationAll = Partial<{
  [key in TMethodsValidation]: yup.Schema;
}>;

export class Validation {
  public static validation(objectSchema: TValidationAll): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      const resultErros: Record<string, Record<string, string>> = {};

      Object.entries(objectSchema).forEach(([key, schema]) => {
        try {
          schema.validateSync(req[key as TMethodsValidation], {
            abortEarly: false,
          });
        } catch (err) {
          const yupError = err as yup.ValidationError;
          const errors: Record<string, string> = {};

          yupError.inner.forEach((error) => {
            if (!error.path) return;
            errors[error.path] = error.message;
          });

          resultErros[key] = errors;
        }
      });

      if (!Object.entries(resultErros).length) {
        next();
      } else {
        res.status(400).json({ errors: resultErros });
      }
    };
  }
}
