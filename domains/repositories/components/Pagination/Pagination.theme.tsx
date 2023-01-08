import Skeleton from '@mui/material/Skeleton';
import { styled } from '@mui/material/styles';

export const Wrapper = styled('div')`
  display: flex;
  justify-content: center;
  margin-top: 1rem;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    justify-content: flex-end;
  }
`;

export const PaginationSkeleton = styled(Skeleton)`
  height: 32px;
  max-width: 340px;
  ${({ theme }) => theme.breakpoints.up('sm')} {
    max-width: 420px;
  }
`;
