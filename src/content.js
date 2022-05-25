var content = `
<p class="top">oleksii<span>besida</span></p>
<div class="container">
  <div class="title">
    <img id="pf" alt="Profile picture"></img>
    <p>Oleksii</p>
  </div>
  <p class=description>Redefining the way humans interact<br>with computers.</p>
  <div class="profiles">
    <img id="tg" alt="Telegram" />
    <img id="ig" alt="Instagram" />
    <img id="gh" alt="GitHub" />
    <img id="tw" alt="Twitter" />
    <img id="mt" alt="Email" />
  </div>
</div>
<div class="footer">
  <img id="cr" alt="(c)" />
  <p>2018-2022 Oleksii Besida</p>
</div>`;


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

var fetched = new Promise((resolve, reject) => {
  source.forEach((src, id) => fetch(src).then(async (response) => {
    var blob = await response.blob();
    fetches.set(id, URL.createObjectURL(blob));
    if (fetches.size == 7) resolve();
  }));
});

window.addEventListener('load', async () => {
  console.log("--- LOAD ---");
  document.body.innerHTML = content;
  await fetched;
  console.log(fetches);
  fetches.forEach((value, key) => {
    console.log(key);
    document.getElementById(key).src = value;
  });
});