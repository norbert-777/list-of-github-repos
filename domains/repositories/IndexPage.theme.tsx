import Grid from '@mui/material/Grid';
import { styled } from '@mui/material/styles';

export const StyledIndexPageContent = styled('main')`
  align-items: center;
  display: flex;
  justify-content: center;
  min-height: calc(100vh - 40px - 56px); /* - header - footer */
  padding-bottom: ${({ theme }) => theme.spacing(3)};
  padding-top: ${({ theme }) => theme.spacing(3)};
`;

export const StyledCaptionGrid = styled(Grid)`
  text-align: center;
`;
