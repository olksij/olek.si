import { fireAnimation } from "./signature";

window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', event => {
  document.querySelector('meta[name="theme-color"]').setAttribute('content', event.matches ? '#111' : '#F5F5F5');
});

var content = `
<div id="container" delay="700" class="torender">
  <div delay="400" id="title" class="torender">
    <div id="pf"><img id="pfi" alt="Profile picture"></img></div>
    <p>Oleksii</p>
  </div>
  <p delay="700" id="description" class="torender"></p>
  <div delay="3100" id="profiles" class="torender">
    <a href="https://t.me/oleksiibesida" target="_blank" delay="3100" class="torender"><img id="tg" alt="Telegram" width="48px" height="48px" /></a>
    <a href="mailto:human@oleksii.xyz" delay="3150" class="torender"><img id="mt" alt="Email" width="48px" height="48px" /></a>
    <a href="https://instagram.com/oleksiibesidaa" target="_blank" delay="3150" class="torender"><img id="ig" alt="Instagram" width="48px" height="48px" /></a>
    <a href="https://github.com/oleksiibesida" target="_blank" delay="3200" class="torender"><img id="gh" alt="GitHub" width="48px" height="48px" /></a>
    <a href="https://linkedin.com/in/oleksiibesida" id="mta" target="_blank" delay="3250" class="torender"><img id="in" alt="LinkedIn" width="48px" height="48px" /></a>
  </div>
</div>
<div id="footer" class="torender">
  <img id="cr" alt="(c)" width="16px" height="16px" />
  <p>2018-2023 Oleksii Besida</p>
</div>
<lottie-player id="signature" autoplay mode="normal">
</lottie-player>`;

var description = "IxD Designer & Flutter developer based*in Stockholm, Sweden.";

if (new Date().getMonth() == 5 && new Date().getDate() == 12)
  description = "🎂 It's my birthday today!*June 12";

if (new Date().getMonth() == 7 && new Date().getDate() == 24)
  description = "Restoration of independence of Ukraine*🇺🇦  August 24  🎉";

var source = new Map([
  ["pfi", new URL("/assets/profilePicture.jpeg?as=webp&width=512", import.meta.url)],
  ["tg", new URL("/assets/telegram.svg", import.meta.url)],
  ["ig", new URL("/assets/instagram.svg", import.meta.url)],
  ["gh", new URL("/assets/github.svg", import.meta.url)],
  ["in", new URL("/assets/linkedin.svg", import.meta.url)],
  ["mt", new URL("/assets/email.svg", import.meta.url)],
  ["cr", new URL("/assets/copyright.svg", import.meta.url)],
]);

var fetches = new Map([]);

var fonts = new Promise((resolve) => {
  var loaded = 0;
  new FontFace('Google Sans Display',
    'url(' + new URL("/assets/fonts/GoogleSansDisplay-Bold.woff2", import.meta.url) + ')')
    .load().then((font) => {
      document.fonts.add(font);
      if (++loaded == 3) resolve(), console.log("--- FONTS ---");
    });
  new FontFace('Google Sans Text',
    'url(' + new URL("/assets/fonts/GoogleSansText-Medium.woff2", import.meta.url) + ')')
    .load().then((font) => {
      document.fonts.add(font);
      if (++loaded == 3) resolve(), console.log("--- FONTS ---");
    });
  new FontFace('Inter',
    'url(' + new URL("/assets/fonts/Inter-Medium.woff2", import.meta.url) + ')')
    .load().then((font) => {
      document.fonts.add(font);
      if (++loaded == 3) resolve(), console.log("--- FONTS ---");
    });
});

var fetched = new Promise((resolve) => {
  source.forEach((src, id) => fetch(src).then(async (response) => {
    var blob = await response.blob();
    fetches.set(id, URL.createObjectURL(blob));
    if (fetches.size == 7) resolve(), console.log("--- FETCHED ---");
  }));
});

window.addEventListener('load', async () => {
  await fetched;
  await fonts;
  document.getElementById("content").innerHTML += content;
  console.log(fetches);
  fetches.forEach((value, key) => {
    document.getElementById(key).src = value;
  });

  render();
  await new Promise((resolve) => setTimeout(resolve, 400))
  document.getElementById('loader').remove();

  setTimeout(fireAnimation, 2500);
});

function render() {
  for (let element of document.getElementsByClassName("torender")) {
    if (element.getAttribute('delay')) {
      setTimeout(async () => {
        element.classList.replace('torender', 'rendered');
        if (element.id == 'container') {
          document.querySelector(':root').style.setProperty('--background-position', 'left 50% top calc(50% - 48px)');
        }
        if (element.id == 'description') {
          await new Promise((resolve) => setTimeout(resolve, 200))
          for (var letter of description) {
            element.innerHTML += letter == '*' ? "<br>" : letter;
            var wait = ([' ', ',', '&'].includes(letter) ? 48 : 16) + Math.random() * 64;
            await new Promise((resolve) => setTimeout(resolve, wait));
          }
        }
      }, element.getAttribute('delay'))  
    }
  }
}