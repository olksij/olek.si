var content = `
<p class="top torender" delay="275">oleksii<span>besida</span></p>
<div class="container">
  <div delay="1000" class="title torender">
    <img id="pf" alt="Profile picture"></img>
    <p>Oleksii</p>
  </div>
  <p delay="1500" class="description torender">Redefining the way humans interact<br>with computers.</p>
  <div delay="1800" class="profiles torender">
    <img delay="1825" class="torender" id="tg" alt="Telegram" />
    <img delay="1850" class="torender" id="ig" alt="Instagram" />
    <img delay="1875" class="torender" id="gh" alt="GitHub" />
    <img delay="1900" class="torender" id="tw" alt="Twitter" />
    <img delay="1925" class="torender" id="mt" alt="Email" />
  </div>
</div>
<div delay="2500" class="footer torender">
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
  await new Promise((resolve) => setTimeout(resolve, 1000))
  console.log("--- LOAD ---");
  document.getElementById("content").innerHTML += content;
  await fetched;
  console.log(fetches);
  fetches.forEach((value, key) => {
    console.log(key);
    document.getElementById(key).src = value;
  });

  render();
  await new Promise((resolve) => setTimeout(resolve, 1000))
  document.getElementById('loader').remove();
});

function render() {
  for (let element of document.getElementsByClassName("torender")) {
    setTimeout(() => element.classList.replace('torender', 'rendered'), element.getAttribute('delay'))
  }
}