import IconButton from '@mui/material/IconButton';
import InputBase from '@mui/material/InputBase';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';

export const StyledContainer = styled(Paper)`
  align-items: center;
  display: flex;
  padding: 2px 4px;
`;

export const StyledInputBase = styled(InputBase)`
  flex: 1;
  margin-left: ${({ theme }) => theme.spacing(1)};
`;

export const StyledSearchButton = styled(IconButton)`
  padding: 10px;
`;
