import React, {Component, PropTypes} from 'react';

import assetsMapping from '../build/assets.json';

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
            <html id='atomic'>
                <head>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='width=device-width,minimum-scale=1,initial-scale=1' />

                    <title>Roderick Hsiao</title>
                    <meta name='description' content='Nothing important' />
                    <meta property='og:type' content='website' />
                    <meta property='og:image' content='//c2.staticflickr.com/2/1585/25832501265_89b28a6aa5_b.jpg' />

                    <link rel='preload' href={this.getHashAssets('/public/css/normalize.css')} data-as='style' onLoad='this.rel="stylesheet"' />
                    <link rel='preload' href={this.getHashAssets('/public/css/atomic.css')} data-as='style' onLoad='this.rel="stylesheet"' />
                    <link rel='preload' href={this.getHashAssets('/public/css/theme.css')} data-as='style' onLoad='this.rel="stylesheet"' />

                    <style dangerouslySetInnerHTML={{__html: inlineStyle}}/>
                    <script dangerouslySetInnerHTML={{__html: inlineScript}} />

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
                    <script src={this.getHashAssets('/public/js/client.js')} defer async />
                </head>
                <body className='Bgc($c-grey-50)'>
                    <div
                        id='app'
                        dangerouslySetInnerHTML={{__html: markup}}
                    />
                    <script dangerouslySetInnerHTML={{__html: state}} />
                </body>
            </html>
        );
    }
}

HtmlComponent.propTypes = {
    context: PropTypes.object.isRequired,
    markup: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired
};

export default HtmlComponent;
