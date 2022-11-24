<h1 align="center"><code>next.oleksii.xyz</code></h1>
<br>

This branch contains the next version of `oleksii.xyz` webpage. The current successful deployment can be observed here: [next.oleksii.xyz](next.oleksii.xyz)

<br>

---

<br>

- 🪨 `./compute/` - webworker files which respond to vectorize visual entry before morphing it

- 🩻 `./skeleton/` - a set of *isolated* files working in separate dependency tree and *inlined* during build process into every `.html` file to provide instant animation.

- 🖼️ `./[pageName]/` - includes skeleton structure, page assets, and usually `.html` file to enable multi-pageness to significantly improve loading time. 

- 📜 `./scripts/` - common script files which are required for most files and aren't tied to pages

- 🎨 `./common/` - styles and after-render modules for pages.


<br>

---

<br>
<p align="center">🛰️ <i><a href="https://github.com/oleksiibesida/oleksii.xyz/tree/production">Production</a> is <code>deployed</code> to <a href="https://oleksii.xyz"><b>oleksii.xyz</b></a></i></p>