import React, {Component, PropTypes} from 'react';

class HtmlComponent extends Component {
    render () {
        let {markup, state} = this.props;
        return (
            <html>
                <head>
                    <meta charSet='utf-8' />
                    <meta name='viewport' content='width=device-width, user-scalable=no' />
                </head>
                <body>
                    <div id='app' dangerouslySetInnerHTML={{__html: markup}}></div>
                    <script dangerouslySetInnerHTML={{__html: state}}></script>
                    <script src='/public/js/client.js' defer></script>
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
