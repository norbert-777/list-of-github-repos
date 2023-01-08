import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

export const StyledSkeleton = styled(Skeleton)`
  height: 88px;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    height: 56px;
  }
`;
