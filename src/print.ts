// file used to style up console and to keep track of events

export default function print(message?: any, ...optional: any[]): void {
  let time = performance.now();
  // format time in a way [2s 128ms]
  let timeStr = `[${Math.round(time / 1000)}s ${Math.round(time % 1000)}ms]`;
  // style up so it looks like `⌨️ Fonts [2s 128ms]`
  console.log('%c' + message + ' %c' + timeStr, 'font-weight: bold; padding:4px', 'color: #AAA',
    !optional.length ? '' : optional);
}