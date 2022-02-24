import {
  Box,
  Card,
  CardContent,
  Popover,
  Stack,
  Typography,
} from '@mui/material';
import { cartModel } from 'entities/cart';
import React, { useEffect } from 'react';
import { useAppDispatch } from 'store';

type CartNotificationType = {
  children: React.ReactNode;
  isOpen: boolean;
  anchorElement: HTMLElement;
  onClose: () => void;
};

export const CartNotification = ({
  children,
  isOpen,
  anchorElement,
  onClose,
}: CartNotificationType) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timerId = setTimeout(() => {
      dispatch(cartModel.actions.resetNotification());
    }, 2000);
    return () => {
      if (timerId) {
        clearTimeout(timerId);
      }
    };
  }, [dispatch]);

  return (
    <Popover
      open={isOpen}
      anchorEl={anchorElement}
      onClose={onClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Popover>
  );
};

type CartNotificationTitleProps = {
  children: React.ReactNode;
};

const CartNotificationTitle = ({ children }: CartNotificationTitleProps) => {
  return (
    <Typography variant="h6" component="div" gutterBottom>
      {children}
    </Typography>
  );
};

type CartNotificationMessagesListProps = {
  children: React.ReactNode;
};

const CartNotificationMessagesList = ({
  children,
}: CartNotificationMessagesListProps) => {
  return <Stack spacing={2}>{children}</Stack>;
};

type CartNotificationMessageProps = {
  children: React.ReactNode;
};

const CartNotificationMessage = ({
  children,
}: CartNotificationMessageProps) => {
  return <Box>{children}</Box>;
};

CartNotification.Title = CartNotificationTitle;
CartNotification.MessagesList = CartNotificationMessagesList;
CartNotification.Message = CartNotificationMessage;
