var content = `
<p id="top" class="torender" delay="3000">oleksii<span>besida</span></p>
<div id="container" delay="800" class="torender">
  <div delay="500" id="title" class="torender">
    <img id="pf" alt="Profile picture"></img>
    <p>Oleksii</p>
  </div>
  <p delay="800" id="description" class="torender"></p>
  <div delay="2700" id="profiles" class="torender">
    <a href="http://t.me/oleksiibesida" target="_blank"><img delay="2700" class="torender" id="tg" alt="Telegram" width="48px" height="48px" /></a>
    <a href="http://instagram.com/oleksiibesidaa" target="_blank"><img delay="2750" class="torender" id="ig" alt="Instagram" width="48px" height="48px" /></a>
    <a href="http://github.com/oleksiibesida" target="_blank"><img delay="2800" class="torender" id="gh" alt="GitHub" width="48px" height="48px" /></a>
    <a href="http://twitter.com/oleksiibesida" target="_blank"><img delay="2850" class="torender" id="tw" alt="Twitter" width="48px" height="48px" /></a>
    <a href="mailto:besida@oleksii.xyz" id="mta"><img delay="2900" class="torender" id="mt" alt="Email" width="48px" height="48px" /></a>
  </div>
</div>
<div delay="3000" id="footer" class="torender">
  <img id="cr" alt="(c)" width="16px" height="16px" />
  <p>2018-2022 Oleksii Besida</p>
</div>`;

var description = "Redefining the way humans interact*with computers.";

var source = new Map([
  ["pf", new URL("/assets/profilePicture.png?as=webp&width=512", import.meta.url)],
  ["tg", new URL("/assets/telegram.svg", import.meta.url)],
  ["ig", new URL("/assets/instagram.svg", import.meta.url)],
  ["gh", new URL("/assets/github.svg", import.meta.url)],
  ["tw", new URL("/assets/twitter.svg", import.meta.url)],
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
      if (++loaded == 2) resolve(), console.log("--- FONTS ---");
    });
  new FontFace('Google Sans Text',
    'url(' + new URL("/assets/fonts/GoogleSansText-Medium.woff2", import.meta.url) + ')')
    .load().then((font) => {
      document.fonts.add(font);
      if (++loaded == 2) resolve(), console.log("--- FONTS ---");
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
  //await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log("--- LOAD ------");
  await fetched;
  await fonts;
  document.getElementById("content").innerHTML += content;
  console.log(fetches);
  fetches.forEach((value, key) => {
    console.log(key);
    document.getElementById(key).src = value;
  });

  render();
  await new Promise((resolve) => setTimeout(resolve, 500))
  document.getElementById('loader').remove();
});

function render() {
  for (let element of document.getElementsByClassName("torender")) {
    setTimeout(async () => {
      element.classList.replace('torender', 'rendered');
      if (element.id == 'container') {
        document.querySelector(':root').style.setProperty('--background-position', 'left 50% top calc(50% - 48px)');
      }
      if (element.id == 'description') {
        for (var letter of description) {
          element.innerHTML += letter == '*' ? "<br>" : letter;
          var wait = (letter == ' ' ? 50 : 15) + Math.random() * 25;
          await new Promise((resolve) => setTimeout(resolve, wait));
        }
      }
    }, element.getAttribute('delay'))
  }
}