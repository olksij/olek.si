export default function print(message?: any, ...optional: any[]): void {
  let time = Date.now() - window["loadTime"];
  let timeStr = `[${Math.round(time / 1000)}s ${time % 1000}ms]`;
  console.log('%c' + message + ' %c' + timeStr, 'font-weight: bold; padding:4px', 'color: #AAA',
    !optional.length ? '' : optional);
}