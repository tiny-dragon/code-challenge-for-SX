import { css } from 'styled-components';

//media-query
const size = {
  phone: 600,
  portrait: 900,
  landscape: 1200
};

export const below = Object.keys(size).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (max-width: ${size[label] / 16}em) {
      ${css(...args)}
    }
  `;
  return acc;
}, {});
//////////////////////////////////////////////////////////////////
//position
export const fixed = ({
  x = 0,
  y = 0,
  yProp = 'top',
  xProp = 'left'
} = {}) => css`
  position: fixed;
  ${yProp}: ${y};
  ${xProp}: ${x};
`;

export const absolute = ({
  x = 0,
  y = 0,
  yProp = 'top',
  xProp = 'left'
} = {}) => css`
  position: absolute;
  ${yProp}: ${y};
  ${xProp}: ${x};
`;

export const centerEl = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;
/////////////////////////////////
export const removeOutline = css`
  &:focus {
    outline: none;
  }
`;

export const maxMinWidth = (max, min) => css`
  max-width: ${max};
  min-width: ${min};
`;
