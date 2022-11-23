import CheckIcon from '@mui/icons-material/Check';
import { Button } from '@mui/material';

export default function ButtonSuccess(props) {
  return (
    <Button type="submit"
      style={{ background: '#24963E' }}
      startIcon={<CheckIcon />}
      variant="contained">
      {props.title}
    </Button>
  );
}