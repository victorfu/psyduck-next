export function Log(
  target: any,
  propertyName: string,
  propertyDescriptor: PropertyDescriptor,
): PropertyDescriptor {
  const method = propertyDescriptor.value;

  propertyDescriptor.value = function (...args: any[]) {
    if (process.env.NODE_ENV === "development") {
      console.log(`Calling ${propertyName} with args: ${JSON.stringify(args)}`);
      const result = method.apply(this, args);
      console.log(
        `Result from ${propertyName}: ${
          result ? JSON.stringify(result) : "N/A"
        }`,
      );
      return result;
    } else {
      return method.apply(this, args);
    }
  };

  return propertyDescriptor;
}
