import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@mui/material';

import moment from "moment";


export const AccountProfile = (props: any) => (


  < Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={props.user.profile_url}
          sx={{
            height: 64,
            mb: 2,
            width: 64
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h5"
        >
          {props.user.name}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          {props.user.city}
        </Typography>
        <Typography
          color="textSecondary"
          variant="body2"
        >
          Last login: {moment(props.user.last_login_timestamp).format('LLL')}

        </Typography>
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card >
);