const sortByStringProp = <T = Record<string | number, string> | string>(
  a: T,
  b: T,
  key?: keyof T
) =>
  ((key ? a[key] : a) as unknown as string).localeCompare(
    (key ? b[key] : b) as unknown as string
  );

export default sortByStringProp;
