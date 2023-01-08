import { styled } from '@mui/material/styles';

export const StyledUl = styled('ul')`
  list-style: none;
  margin: 0;
  padding: 0;

  li {
    margin-bottom: ${({ theme }) => theme.spacing(1)};

    &:last-child {
      margin-bottom: 0;
    }
  }
`;
