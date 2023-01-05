import { Link, Breadcrumbs as MuiBreadcrumbs, Typography } from '@mui/material';
import { Stack } from '@mui/system';

interface IBreadCrumb {
  items: Array<{ title: string; link: string }>;
}

export const BreadCrumbs = ({ items }: IBreadCrumb) => {
  return (
    <Stack>
      <MuiBreadcrumbs aria-label='breadcrumb'>
        {items.map((item, index) => {
          return (
            <Link
              key={index}
              underline={index === items.length - 1 ? 'none' : 'hover'}
              color={index === items.length - 1 ? 'black' : 'inherit'}
              href={item.link}>
              {item.title}
            </Link>
          );
        })}
      </MuiBreadcrumbs>
    </Stack>
  );
};
