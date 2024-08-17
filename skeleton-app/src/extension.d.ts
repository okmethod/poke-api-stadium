declare module "*.json" {
  const value: { [key: string]: any }; // eslint-disable-line @typescript-eslint/no-explicit-any
  export default value;
}
