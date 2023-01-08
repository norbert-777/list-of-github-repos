import Container from '@mui/material/Container';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Container)`
  margin-bottom: ${({ theme }) => theme.spacing(2)};
  margin-top: ${({ theme }) => theme.spacing(2)};
`;
