import React, { memo } from 'react';
import { Partytown } from '@builder.io/partytown/react';

import assetsMapping from '../build/assets.json';

const inlineJSDetect = '(function(html){var c = html.className;c += " JsEnabled";c = c.replace("NoJs","");html.className = c;})(document.documentElement)';

const pathPrefix = '/';

const inlineGA = `
  (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
  new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
  j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
  'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
  })(window,document,'script','dataLayer','UA-76603120-1');

  dataLayer.push('js', new Date());
  dataLayer.push('config', 'UA-76603120-1');
`;

const getHashAssets = (assetsPath) => {
  const key = assetsPath.replace(pathPrefix, '');
  const match = assetsMapping[key];
  return match ? pathPrefix + assetsMapping[key] : assetsPath;
};

const HtmlComponent = memo((props) => {
  const { markup, state } = props;

  return (
    <body className="Bgc($c-grey-50)">
      <Partytown forward={['dataLayer.push']} />
      <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
      <script dangerouslySetInnerHTML={{ __html: state }} />
      <script src="//cdn.polyfill.io/v3/polyfill.min.js" defer async />
      <script src={getHashAssets('/js/client.js')} defer async />
      <script type="text/partytown" dangerouslySetInnerHTML={{ __html: inlineGA }} />
    </body>
  );
});

export const headerStringStart = [
  '<head>',
  '<meta charset="utf-8" />',
  '<meta name="viewport" content="width=device-width,minimum-scale=1,initial-scale=1" />',
  '<meta name="apple-mobile-web-app-title" content="Roderick Hsiao" />',
  '<meta name="apple-mobile-web-app-capable" content="yes" />',
  '<meta name="apple-mobile-web-app-status-bar-style" content="#4caf50" />',
  '<meta name="theme-color" content="#4caf50" />',
  '<link rel="apple-touch-icon" href="taz-1x.png" />',
  '<link rel="apple-touch-icon" sizes="144x144" href="taz-2x.png" />',
  '<link rel="apple-touch-icon" sizes="192x192" href="taz-3x.png" />',

  '<link rel="dns-prefetch" href="https://fonts.googleapis.com" />',
  '<link rel="dns-prefetch" href="https://cdn.polyfill.io" />',
  '<link rel="preconnect" href="https://fonts.googleapis.com" />',
  '<link rel="preconnect" href="https://cdn.polyfill.io" />',
  '<link rel="preconnect" href="https://roderickhsiao.imgix.net" />',
  '<link rel="manifest" href="/manifest.json" />',

  '<title>Roderick Hsiao | Dog Dad, Software Engineer and Front-End Consultant</title>',
  '<meta name="description" content="Open for tech talks invitations, project architecture consulting (web performance, large scale web app, team mentoring and more)." />',
  '<meta property="og:type" content="website" />',
  '<meta property="og:image" content="https://c2.staticflickr.com/2/1585/25832501265_89b28a6aa5_b.jpg" />',
].join('');

export const headerStringEnd = [
  `<link rel="stylesheet" 
    href="https://fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,600,700,400italic&font-display=swap" media="print" onload="this.media='all'" />`,
  `<link rel="preload" href="${getHashAssets(
    '/css/normalize.css'
  )}" as="style" />`,
  `<link rel="stylesheet" href="${getHashAssets(
    '/css/normalize.css'
  )}" media="print" onload="this.media='all'" />`,

  `<link rel="preload" href="${getHashAssets(
    '/css/atomic.css'
  )}" as="style" />`,
  `<link rel="stylesheet" href="${getHashAssets(
    '/css/atomic.css'
  )}" media="print" onload="this.media='all'" />`,

  `<link rel="preload" href="${getHashAssets('/css/theme.css')}" as="style" />`,
  `<link rel="stylesheet" href="${getHashAssets(
    '/css/theme.css'
  )}" media="print" onload="this.media='all'" />`,

  `<link rel="preload" href="${getHashAssets(
    '/css/transition.css'
  )}" as="style" />`,
  `<link rel="stylesheet" href="${getHashAssets(
    '/css/transition.css'
  )}" media="print" onload="this.media='all'" />`,

  `<link rel="preload" href="${getHashAssets('/js/client.js')}" as="script" />`,
  `<script>${inlineJSDetect}</script>`,

  '<noscript>',
  '<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,600,700,400italic&font-display=swap" />',
  '</noscript>',
  '<noscript>',
  `<link rel="stylesheet" href="${getHashAssets('/css/normalize.css')}" />`,
  '</noscript>',
  '<noscript>',
  `<link rel="stylesheet" href="${getHashAssets('/css/atomic.css')}" />`,
  '</noscript>',
  '<noscript>',
  `<link rel="stylesheet" href="${getHashAssets('/css/theme.css')}" />`,
  '</noscript>',
  '<noscript>',
  `<link rel="stylesheet" href="${getHashAssets('/css/transition.css')}" />`,
  '</noscript>',
  '</head>',
].join('');

export const htmlStringStart = '<html lang="en" id="atomic" class="NoJs">';
export const htmlStringEnd = '</html>';

export default HtmlComponent;
