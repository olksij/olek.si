var content = `
<p id="top" class="torender" delay="275">oleksii<span>besida</span></p>
<div id="container" delay="800" class="torender">
  <div delay="500" id="title" class="torender">
    <img id="pf" alt="Profile picture"></img>
    <p>Oleksii</p>
  </div>
  <p delay="800" id="description" class="torender"></p>
  <div delay="2700" id="profiles" class="torender">
    <img delay="2700" class="torender" id="tg" alt="Telegram" />
    <img delay="2750" class="torender" id="ig" alt="Instagram" />
    <img delay="2800" class="torender" id="gh" alt="GitHub" />
    <img delay="2850" class="torender" id="tw" alt="Twitter" />
    <img delay="2900" class="torender" id="mt" alt="Email" />
  </div>
</div>
<div delay="2500" id="footer" class="torender">
  <img id="cr" alt="(c)" />
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