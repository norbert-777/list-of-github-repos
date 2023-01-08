import ForkRightOutlinedIcon from '@mui/icons-material/ForkRightOutlined';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import StarOutlineIcon from '@mui/icons-material/StarOutline';
import { css, styled } from '@mui/material/styles';

const BASE_ICON_STYLE = css`
  font-size: inherit;
  margin: 0 2px -2px 0;
`;

export const StyledStarOutlineIcon = styled(StarOutlineIcon)`
  ${BASE_ICON_STYLE};
`;

export const StyledForkRightOutlinedIcon = styled(ForkRightOutlinedIcon)`
  ${BASE_ICON_STYLE};
`;

export const StyledOpenInNewIcon = styled(OpenInNewIcon)`
  font-size: inherit;
  margin: 0 0 -2px 2px;
`;
