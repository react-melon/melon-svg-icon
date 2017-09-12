/**
 * @file Icon
 * @author leon <ludafa@outlook.com>
 */

import React, {PureComponent} from 'react';
import PropTypes from 'prop-types';
import styles from './Icon.css';
import CopyToClipboard from 'react-copy-to-clipboard';

export default class Icon extends PureComponent {
    static propTypes = {
        icon: PropTypes.string.isRequired,
        Icon: PropTypes.func.isRequired,
        onClick: PropTypes.func.isRequired
    };
    render() {
        let {icon, Icon, onClick} = this.props;
        return (
            <CopyToClipboard
                key={icon}
                text={icon}
                onCopy={() => onClick(icon)}>
                <div className={styles.main}>
                    <div className={styles.iconWrapper}>
                        <Icon
                            className={styles.icon}
                            width={48}
                            height={48} />
                    </div>
                    <p className={styles.label}>
                        {icon}
                    </p>
                </div>
            </CopyToClipboard>
        );
    }
}
