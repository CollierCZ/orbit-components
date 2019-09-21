// @flow
import React from "react";
import styled, { css } from "styled-components";

import defaultTheme from "../../defaultTheme";
import Stack from "../../Stack";
import Text from "../../Text";
import Radio from "../../Radio";
import Badge from "../../Badge";
import media from "../../utils/mediaQuery";
import type { Props } from "./index.js.flow";

const StyledPricingTableItem = styled.div`
  display: flex;
  flex-grow: 1;
  position: relative;
  background: ${({ theme }) => theme.orbit.paletteWhite};
  box-shadow: 0 0 2px 0 rgba(37, 42, 49, 0.16), 0 1px 4px 0 rgba(37, 42, 49, 0.12); /* TODO: Add elevation token */
  transition: ${({ theme }) => theme.orbit.durationNormal};
  border-radius: ${({ theme }) => theme.orbit.borderRadiusNormal}; /* TODO: Add token */
  padding: ${({ theme }) => theme.orbit.spaceMedium}; /* TODO: Add token */
  cursor: pointer;

  &:hover {
    box-shadow: 0 1px 4px 0 rgba(37, 42, 49, 0.16), 0 4px 8px 0 rgba(37, 42, 49, 0.12);
  }

  ${({ basis }) =>
    basis &&
    css`
      flex-basis: ${basis};
    `}

  ${({ featureIcon }) =>
    featureIcon &&
    css`
      ${media.tablet(css`
        padding-top: ${({ theme }) => theme.orbit.spaceLarge}; /* TODO: Add token */
        padding-bottom: ${({ theme }) => theme.orbit.spaceLarge}; /* TODO: Add token */
      `)}
    `}
`;

StyledPricingTableItem.defaultProps = {
  theme: defaultTheme,
};

const StyledBadge = styled.div`
  position: absolute;
  top: -${({ theme }) => theme.orbit.spaceMedium}; /* TODO: Add token */
  left: 50%;
  transform: translate(-50%, 3px);
`;

StyledBadge.defaultProps = {
  theme: defaultTheme,
};

const Item = styled.div``;

const PricingTableItem = ({
  name,
  price,
  priceBadge,
  featureIcon,
  badge,
  action,
  active = false,
  compact = false,
  children,
  onClick,
  basis,
}: Props) => {
  const onClickHandler = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <StyledPricingTableItem onClick={onClickHandler} basis={basis} featureIcon={!!featureIcon}>
      {badge && (
        <StyledBadge>
          {typeof badge === "string" ? <Badge type="infoInverted">{badge}</Badge> : badge}
        </StyledBadge>
      )}
      <Stack flex direction="column" spacing="condensed" tablet={{ spacing: "natural" }}>
        {featureIcon && <Stack justify="center">{featureIcon}</Stack>}
        <Stack justify="between" direction="column">
          <Stack spacing="tight">
            {name && (
              <Text type="primary" align="center" weight={featureIcon ? "normal" : "bold"}>
                {name}
              </Text>
            )}
            {price && (
              <Text size="large" weight="bold" type="primary" align="center">
                {price}
              </Text>
            )}
            {priceBadge && <Stack justify="center"> {priceBadge} </Stack>}
          </Stack>
          {!compact ? (
            <Stack justify="between" direction="column">
              {children && children}
              {action && (
                <Stack justify="center" grow={false}>
                  {action}
                </Stack>
              )}
            </Stack>
          ) : (
            <Stack justify="center" align="center" grow={false}>
              <Item>
                <Radio checked={active} onChange={onClickHandler} />
              </Item>
            </Stack>
          )}
        </Stack>
      </Stack>
    </StyledPricingTableItem>
  );
};

export default PricingTableItem;