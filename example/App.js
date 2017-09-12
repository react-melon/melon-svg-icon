/**
 * @file App
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import * as icons from 'melon-svg-icon';
import Icon from './Icon';
import SnackBar from 'react-material-snackbar';
import Readme from './readme.md';
import styles from './App.css';

import 'normalize.css/normalize.css';

export default class App extends PureComponent {

    constructor(...args) {
        super(...args);
        this.state = {open: false};
        this.onIconClick = this.onIconClick.bind(this);
    }

    onIconClick(icon) {
        if (this.timer) {
            clearTimeout(this.timer);
        }
        this.setState({open: true, content: icon});
        this.timer = setTimeout(() => this.setState({open: false}), 3001);
    }

    render() {
        let {open, content} = this.state;
        return (
            <div className={styles.main}>
                <Readme />
                <section className={styles.content}>
                    {Object.keys(icons).map(icon => (
                        <Icon
                            key={icon}
                            icon={icon}
                            Icon={icons[icon]}
                            onClick={this.onIconClick}
                        />
                    ))}
                    <SnackBar show={this.state.open} timer={3000}>
                        <p><em className={styles.snackbarIcon}>{content}</em> copied</p>
                    </SnackBar>
                </section>
            </div>
        );
    }

}
