import propTypes from 'prop-types';
import './IconButton.scss';
import classNames from 'classnames';

function IconButton ({children, onClick, className, ...allysProps}) {
    return (
        <button type="button" className={classNames("IconButton", className)} onClick={onClick} {...allysProps}>{children}</button>
    )
}

IconButton.defaultProps = {
    children: null,
    onClick: () => null,
}

IconButton.propTypes = {
    children: propTypes.node,
    onClick: propTypes.func,
    'aria-label': propTypes.string.isRequired,
}

export default IconButton;

