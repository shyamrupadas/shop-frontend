import { Box, ButtonGroup, IconButton, Typography } from "@mui/material";
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export  function AddToCart() {
    return (
        <ButtonGroup  aria-label="outlined primary button group">
            <IconButton color="primary">
                <RemoveCircleOutlineIcon />
            </IconButton>

            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                minWidth: '2ch'
            }}>
                <Typography sx={{ fontSize: 'default' }} color="text.secondary" component='span'>
                    0
                </Typography>
            </Box>

            <IconButton color="primary">
                <AddCircleOutlineIcon />
            </IconButton>

        </ButtonGroup>
    );
}
