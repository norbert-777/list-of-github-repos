import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Container)`
  min-height: calc(100vh - 40px - 56px - 96px); /* - header - footer - search form */
`;
