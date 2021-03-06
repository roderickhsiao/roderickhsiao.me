import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import assetsMapping from '../build/assets.json';

const inlineJSDetect =
  '(function(html){var c = html.className;c += " JsEnabled";c = c.replace("NoJs","");html.className = c;})(document.documentElement)';

const pathPrefix = '/';

const inlineGA = `
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-76603120-1');
`;

const getHashAssets = assetsPath => {
  let key = assetsPath.replace(pathPrefix, '');
  let match = assetsMapping[key];
  return match ? pathPrefix + assetsMapping[key] : assetsPath;
};

class HtmlComponent extends PureComponent {
  static propTypes = {
    context: PropTypes.object.isRequired,
    markup: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
  };

  render() {
    let { markup, state } = this.props;
    return (
      <body className="Bgc($c-grey-50)">
        <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
        <script dangerouslySetInnerHTML={{ __html: state }} />
        <script src="//cdn.polyfill.io/v3/polyfill.min.js" defer async />
        <script src={getHashAssets('/js/client.js')} defer async />
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=UA-76603120-1"
        />
        <script dangerouslySetInnerHTML={{ __html: inlineGA }} />
      </body>
    );
  }
}

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

  '<link rel="dns-prefetch" href="https://www.gstatic.com/" />',
  '<link rel="dns-prefetch" href="https://fonts.googleapis.com" />',
  '<link rel="dns-prefetch" href="https://www.googletagmanager.com" />',
  '<link rel="preconnect" href="https://fonts.googleapis.com" />',
  '<link rel="dns-prefetch" href="https://cdn.polyfill.io" />',
  '<link rel="preconnect" href="https://cdn.polyfill.io" />',
  '<link rel="manifest" href="/manifest.json" />',

  '<title>Roderick Hsiao</title>',
  '<meta name="description" content="Nothing important" />',
  '<meta property="og:type" content="website" />',
  '<meta property="og:image" content="https://c2.staticflickr.com/2/1585/25832501265_89b28a6aa5_b.jpg" />'
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
  '</head>'
].join('');

export const htmlStringStart = '<html lang="en" id="atomic" class="NoJs">';
export const htmlStringEnd = '</html>';

export default HtmlComponent;
