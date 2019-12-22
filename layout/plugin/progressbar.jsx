'use strict';

const { Component, Fragment } = require('inferno');
const { cacheComponent } = require('../util/cache');

class ProgressBar extends Component {
    render() {
        const { url_for, cdn } = this.props;

        return <Fragment>
            <link rel="stylesheet" href={url_for('/css/progressbar.css')} />
            <script src={cdn('pace-js', '1.0.2', 'pace.min.js')}></script>
        </Fragment>;
    }
}

module.exports = cacheComponent(ProgressBar, 'plugin.progressbar', props => {
    if (!props.head) {
        return null;
    }
    return {
        url_for: props.url_for,
        cdn: props.cdn,
        // for cache purpose only
        _providers: props.providers.cdn
    };
});