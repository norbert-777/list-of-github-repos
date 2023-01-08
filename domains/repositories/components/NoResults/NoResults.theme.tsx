import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const StyledTypography = styled(Typography)`
  padding: ${({ theme: { spacing } }) => `${spacing(2)}`} 0;
  text-align: center;
`;
