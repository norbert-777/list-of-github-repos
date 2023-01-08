import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

export const StyledSearchContainer = styled(Container)`
  margin-bottom: ${({ theme }) => theme.spacing(4)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;

export const StyledHeading = styled(Typography)`
  font-size: 1.5rem;
  margin-bottom: ${({ theme }) => theme.spacing(2)};
`;
