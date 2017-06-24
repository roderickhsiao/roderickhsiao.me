import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import assetsMapping from '../build/assets.json';

const inlineJSDetect =
  '(function(html){var c = html.className;c += " JsEnabled";c = c.replace("NoJs","");html.className = c;})(document.documentElement)';
const pathPrefix = '/';

class HtmlComponent extends PureComponent {
  getHashAssets(assetsPath) {
    let key = assetsPath.replace(pathPrefix, '');
    let match = assetsMapping[key];
    return match ? pathPrefix + assetsMapping[key] : assetsPath;
  }
  render() {
    let { markup, state, inlineScript, inlineStyle } = this.props;
    return (
      <html lang="en" id="atomic" className="NoJs">
        <head>
          <meta charSet="utf-8" />
          <meta
            name="viewport"
            content="width=device-width,minimum-scale=1,initial-scale=1"
          />
          <meta name="apple-mobile-web-app-title" content="Roderick Hsiao" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#4caf50"
          />
          <meta name="theme-color" content="#4caf50" />
          <link rel="apple-touch-icon" href="taz-1x.png" />
          <link rel="apple-touch-icon" sizes="144x144" href="taz-2x.png" />
          <link rel="apple-touch-icon" sizes="192x192" href="taz-3x.png" />

          <link rel="dns-prefetch" href="https://www.gstatic.com/" />
          <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="dns-prefetch" href="https://cdn.polyfill.io" />
          <link rel="preconnect" href="https://cdn.polyfill.io" />
          <link rel="manifest" href="/manifest.json" />

          <title>Roderick Hsiao</title>
          <meta name="description" content="Nothing important" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content="https://c2.staticflickr.com/2/1585/25832501265_89b28a6aa5_b.jpg"
          />

          <link
            rel="preload"
            href={this.getHashAssets('/css/normalize.css')}
            as="style"
            onLoad="this.rel=&quot;stylesheet&quot;"
          />
          <link
            rel="preload"
            href={this.getHashAssets('/css/atomic.css')}
            as="style"
            onLoad="this.rel=&quot;stylesheet&quot;"
          />
          <link
            rel="preload"
            href={this.getHashAssets('/css/theme.css')}
            as="style"
            onLoad="this.rel=&quot;stylesheet&quot;"
          />
          <link
            rel="preload"
            href={this.getHashAssets('/css/transition.css')}
            as="style"
            onLoad="this.rel=&quot;stylesheet&quot;"
          />
          <link
            rel="preload"
            href={this.getHashAssets('/js/client.js')}
            as="script"
          />
          <link
            rel="preload"
            href={this.getHashAssets('/js/modernizr.js')}
            as="script"
          />

          <style dangerouslySetInnerHTML={{ __html: inlineStyle }} />
          <script dangerouslySetInnerHTML={{ __html: inlineScript }} />
          <script dangerouslySetInnerHTML={{ __html: inlineJSDetect }} />

          <noscript>
            <link
              rel="stylesheet"
              href="https://fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,600,700,400italic"
            />
          </noscript>
          <noscript>
            <link
              rel="stylesheet"
              href={this.getHashAssets('/css/normalize.css')}
            />
          </noscript>
          <noscript>
            <link
              rel="stylesheet"
              href={this.getHashAssets('/css/atomic.css')}
            />
          </noscript>
          <noscript>
            <link
              rel="stylesheet"
              href={this.getHashAssets('/css/theme.css')}
            />
          </noscript>
          <noscript>
            <link
              rel="stylesheet"
              href={this.getHashAssets('/css/transition.css')}
            />
          </noscript>
        </head>
        <body className="Bgc($c-grey-50)">
          <div id="app" dangerouslySetInnerHTML={{ __html: markup }} />
          <script dangerouslySetInnerHTML={{ __html: state }} />
          <script src="//cdn.polyfill.io/v2/polyfill.min.js" defer async />
          <script src={this.getHashAssets('/js/client.js')} defer async />
          <script src={this.getHashAssets('/js/modernizr.js')} defer async />
        </body>
      </html>
    );
  }
}
HtmlComponent.displayName = 'HtmlComponent';

HtmlComponent.propTypes = {
  context: PropTypes.object.isRequired,
  markup: PropTypes.string.isRequired,
  state: PropTypes.string.isRequired
};

export default HtmlComponent;
