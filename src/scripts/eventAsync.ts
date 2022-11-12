export default function waitFor(name: string) {
  return new Promise(resolve => addEventListener(name, resolve));
}