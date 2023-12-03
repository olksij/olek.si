import display from '/assets/fonts/display.woff2?url';
import text    from '/assets/fonts/text.woff2?url' ;
import inter   from '/assets/fonts/inter.woff2?url';

// list of fonts to download
const fonts = { display, text, inter };

type  FontRequest = {
  resolve: ()     => void, 
  request: XMLHttpRequest, 
  font   : string
}

function loadFont(req: FontRequest) {
  req.request.onload  = function () {
    let resp     = this.response; req.resolve();
    let fontFace = new FontFace(req.font, resp);
    document.fonts.add(fontFace);   }
  req.request.send();
}

function initRequest([font, url]: string[]) {
  let request = new XMLHttpRequest();
      request.open('get', url, true);
      request.responseType = 'arraybuffer';
  return new     Promise  <void>(resolve => 
      loadFont ({resolve, request, font}));
}

export default (): Promise<void[]> => Promise.all
  (Object.entries(fonts).map(initRequest));
