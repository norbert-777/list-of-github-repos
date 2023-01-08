import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/material/styles';

export const StyledAppBar = styled(AppBar)`
  padding: ${({ theme: { spacing } }) => `${spacing(0.5)} ${spacing(2)}`};
`;
