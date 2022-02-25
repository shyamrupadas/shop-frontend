import { Button, Menu, MenuItem, Typography } from '@mui/material';
import Fade from '@mui/material/Fade';
import Link from 'next/link';
import { categoryModel } from 'entities/category';
import React, { useCallback } from 'react';
import { useSelector } from 'react-redux';

export const NavMenu = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const categories = useSelector(categoryModel.selectors.categories);

  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  }, []);

  const handleClose = useCallback(() => {
    setAnchorEl(null);
  }, []);

  return (
    <div>
      <Button
        id="fade-button"
        aria-controls={open ? 'fade-menu' : undefined}
        aria-haspopup="true"
        aria-expanded={open ? 'true' : undefined}
        sx={{ color: '#FFFFFF', marginLeft: '20%' }}
        onClick={handleClick}
      >
        <Typography variant="h6" component="span">
          Каталог
        </Typography>
      </Button>
      <Menu
        id="fade-menu"
        MenuListProps={{
          'aria-labelledby': 'fade-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        TransitionComponent={Fade}
      >
        <div onMouseLeave={handleClose}>
          {categories.map((category) => {
            const pathname = `/catalog/${category._id}`;
            return (
              <MenuItem key={category._id} onClick={handleClose}>
                <Link href={{ pathname }}>{category.name}</Link>
              </MenuItem>
            );
          })}
        </div>
      </Menu>
    </div>
  );
};
