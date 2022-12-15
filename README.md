<h1 align="center">&nbsp;<br>✨ The next version of <a href="https://oleksii.xyz">oleksii.xyz</a><br>&nbsp;</h1>

<br>
<p style="padding-bottom: 8em !important" align="center"><i>The code is in an ⚡ <code>active</code> development and <code>haven't</code> been deployed yet.</i></p>
<p align="center"><b>🌿 Check out the <a href="https://github.com/oleksiibesida/oleksii.xyz/tree/production"><code>production</code> branch</a></b></p>
<br>

## — 🧭 The source code guide

• 🪨 <a href="./compute/">`compute`</a> – WebWorker files which vectorize visual entry before morphing it <br>

• 🩻 <a href="./skeleton/">`skeleton`</a> – a set of *isolated* files working in separate dependency tree and *inlined* during build process into every `.html` file to provide instant animation. <br>

• 🖼️ <a href="./index/">`[pageName]`</a> – includes skeleton structure, page assets, and usually `.html` file to enable multi-pageness to significantly improve loading time.  <br>

• 🧱 <a href="./render/">`render`</a> – after page assets are loaded, construct and animate them. <br>

• 🔁 <a href="./common/">`common`</a> – common styles and scripts between pages. <br>

• <img align="center" height="16" width="22" src="https://cdn.simpleicons.org/typescript" /> <a href="./interfaces.ts/">`interfaces.ts`</a> – contains all types and interfaces of the project <br>

<br>

<p align="center"><i>Copyright (c) 2022 Oleksii Besida</i> • <a href="./LICENSE.md">License</a></p>
