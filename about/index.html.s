<!doctype html>
<html lang="en">

<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style> @import '../index/skeleton.css'; </style>
  <link rel="stylesheet" media="(min-width: 920px)" href="../index/desktop.skeleton.css">
</head>

<body>
  <script type="module">
    import init from '../skeleton/init';
    import aboutDom from './dom';

    init(aboutDom);

    window['worker'] = new Worker(new URL('../compute/compute.ts', import.meta.url), { type: 'module' });
  </script>

  <noscript>the page is powered by js :(</noscript>
  <script src="./page.ts" async type="module"></script>
</body>

</html>