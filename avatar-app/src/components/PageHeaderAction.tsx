import { Button, Grid, Link, Typography } from '@mui/material';
import { BreadCrumbs } from './BreadCrumbs';
import Iconify from './Iconify';

interface IBreadCrumb {
  title: string;
  link: string;
}
interface IPageHeaderAction {
  title?: string;
  btnLabel?: string;
  onBtnClick: Function;
  breadCrumbs?: Array<IBreadCrumb>;
}

export const PageHeaderAction = ({
  onBtnClick,
  title,
  btnLabel,
  breadCrumbs,
}: IPageHeaderAction) => {
  return (
    <>
      {breadCrumbs?.length ? (
        <BreadCrumbs items={breadCrumbs} />
      ) : (
        <Typography variant='h5' color='text.primary'>
          {title}
        </Typography>
      )}
      <Grid container justifyContent={'flex-end'} marginBottom={4}>
        <Grid item>
          <Button
            startIcon={
              <Iconify icon={'bx:plus'} sx={{ width: 16, height: 16 }} />
            }
            variant='contained'
            onClick={() => {
              onBtnClick();
            }}>
            {btnLabel || 'Add ' + title}
          </Button>
        </Grid>
      </Grid>
    </>
  );
};
