export default function print(message?: any, ...optional: any[]): void {
  let date = new Date();
  let time = `[${date.toLocaleTimeString('sv-SE')}.${date.getMilliseconds()}]`;
  console.log('%c' + message + ' %c' + time, 'font-weight: bold; padding:4px', 'color: #AAA',
    !optional.length ? '' : optional);
}
