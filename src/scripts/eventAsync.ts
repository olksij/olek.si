export default function waitFor<Type>(name: string) {
  return new Promise(resolve => addEventListener(name, resolve));
}