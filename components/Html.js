import React, {Component, PropTypes} from 'react';

import assetsMapping from '../build/assets.json';

const ga = '(function(i,s,o,g,r,a,m){i[\'GoogleAnalyticsObject\']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,\'script\',\'https://www.google-analytics.com/analytics.js\',\'ga\');ga(\'create\', \'UA-76603120-1\', \'auto\');ga(\'send\', \'pageview\');'
const inlineJSDetect = '(function(html){var c = html.className;c += " JsEnabled";c = c.replace("NoJs","");html.className = c;})(document.documentElement)';
const pathPrefix = '/public/';

class HtmlComponent extends Component {
    getHashAssets (assetsPath) {
        let key =  assetsPath.replace(pathPrefix, '');
        let match = assetsMapping[key];
        return match ? (pathPrefix + assetsMapping[key]) : assetsPath;
    }
    render () {
        let {markup, state, inlineScript, inlineStyle} = this.props;
        return (
            <html lang='en' id='atomic' className='NoJs'>
                <head>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='width=device-width,minimum-scale=1,initial-scale=1' />
                    <meta name='render-optimize-policy' content='first-screen-advance;enable' />
                    <meta httpEquiv='x-dns-prefetch-control' content='on' />
                    <link rel='dns-prefetch' href='//i.imgsafe.org' />
                    <link rel='preconnect' href='//i.imgsafe.org' />
                    <title>Roderick Hsiao</title>
                    <meta name='description' content='Nothing important' />
                    <meta property='og:type' content='website' />
                    <meta property='og:image' content='//c2.staticflickr.com/2/1585/25832501265_89b28a6aa5_b.jpg' />

                    <link rel='preload' href={this.getHashAssets('/public/css/normalize.css')} as='style' onLoad='this.rel="stylesheet"' />
                    <link rel='preload' href={this.getHashAssets('/public/css/atomic.css')} as='style' onLoad='this.rel="stylesheet"' />
                    <link rel='preload' href={this.getHashAssets('/public/css/theme.css')} as='style' onLoad='this.rel="stylesheet"' />
                    <link rel='preload' href={this.getHashAssets('/public/css/transition.css')} as='style' onLoad='this.rel="stylesheet"' />

                    <style dangerouslySetInnerHTML={{__html: inlineStyle}}/>
                    <script dangerouslySetInnerHTML={{__html: inlineScript}} />
                    <script dangerouslySetInnerHTML={{__html: inlineJSDetect}} />

                    <noscript>
                        <link rel='stylesheet' href='//fonts.googleapis.com/css?family=Roboto:100,200,300,400,500,600,700,400italic' />
                    </noscript>
                    <noscript>
                        <link rel='stylesheet' href={this.getHashAssets('/public/css/normalize.css')} />
                    </noscript>
                    <noscript>
                        <link rel='stylesheet' href={this.getHashAssets('/public/css/atomic.css')} />
                    </noscript>
                    <noscript>
                        <link rel='stylesheet' href={this.getHashAssets('/public/css/theme.css')} />
                    </noscript>
                    <noscript>
                        <link rel='stylesheet' href={this.getHashAssets('/public/css/transition.css')} />
                    </noscript>
                </head>
                <body className='Bgc($c-grey-50)'>
                    <div
                        id='app'
                        dangerouslySetInnerHTML={{__html: markup}}
                    />
                    <script dangerouslySetInnerHTML={{__html: state}} />
                    <script dangerouslySetInnerHTML={{__html: ga}} />
                    <script src={this.getHashAssets('/public/js/client.js')} defer async />
                    <script src={this.getHashAssets('/public/js/modernizr.js')} defer async />
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
