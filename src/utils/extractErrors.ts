import { ValidationError } from "class-validator";

export const extractErrors = (
  errors: ValidationError[],
  parentPath = "",
  ignoreFields: string[] = [],
  validateFields: string[] = [],
// eslint-disable-next-line @typescript-eslint/no-explicit-any
): any => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = {};

  errors.forEach((error) => {
    const propertyPath = parentPath
      ? `${parentPath}.${error.property}`
      : error.property;

    if (error.constraints) {
      result[propertyPath] = Object.values(error.constraints)[0];
    }

    if (error.children && error.children.length > 0) {
      const childrenErrors = extractErrors(
        error.children,
        propertyPath,
        ignoreFields,
        validateFields,
      );
      result = { ...result, ...childrenErrors };
    }
  });

  return result;
};
