import React from 'react';
import { Badge } from '@mantine/core';
import { useHover } from '@mantine/hooks';
import PropTypes from 'prop-types';

const ActionBadge = ({
  onClick,
  disabled,
  hoverVariant,
  children,
  ...rest
}) => {
  const { hovered, ref } = useHover();
  const defaultVariant = rest.variant || 'outline';
  const shownHoverVariant = hoverVariant || 'filled';
  const isDisabled = disabled || !onClick;

  return (
    <Badge
      onClick={e => {
        if (!isDisabled) {
          onClick(e);
        }
      }}
      ref={ref}
      {...rest}
      style={{ ...rest.style, cursor: !isDisabled ? 'pointer' : 'normal' }}
      variant={!isDisabled && hovered ? shownHoverVariant : defaultVariant}
    >
      {children}
    </Badge>
  );
};

ActionBadge.propTypes = {
  children: PropTypes.any,
  disabled: PropTypes.bool,
  hoverVariant: PropTypes.string,
  onClick: PropTypes.func
};

export default ActionBadge;
