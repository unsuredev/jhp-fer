import * as React from 'react';
import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import Iconify from './Iconify';

interface IMenuItemDef {
  icon?: string;
  label?: string;
  onClick?: Function;
  type?: 'item' | 'divider';
}

export interface IActionMenu {
  menuItems: Array<IMenuItemDef>;
  id?: string;
}

export const ActionMenu = ({ menuItems }: IActionMenu) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <IconButton
        aria-label='basic-menu'
        id='long-button'
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}>
        <Iconify
          icon={'akar-icons:more-vertical-fill'}
          sx={{ width: 16, height: 16, ml: 1 }}
        />
      </IconButton>
      <Menu
        id='basic-menu'
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}>
        {menuItems.map((item, index) => {
          if (item.type === 'divider') {
            return <Divider key={index} sx={{ my: 0.5 }} />;
          }
          return (
            <MenuItem
              key={index}
              onClick={() => {
                item.onClick && item.onClick();
                handleClose();
              }}
              disableRipple>
              {item.icon && (
                <Iconify
                  icon={item.icon}
                  sx={{ width: 16, height: 16, mr: 1 }}
                />
              )}
              {item.label}
            </MenuItem>
          );
        })}
      </Menu>
    </div>
  );
};
