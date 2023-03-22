import * as React from 'react';
import { observer } from 'mobx-react-lite';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { MainVM } from '../viewModels/Main.VM';

const Notification: React.FC<{ vm: MainVM }> = observer(({ vm }) => {
    const action = (
        <React.Fragment>
            <IconButton
                size='small'
                aria-label='close'
                color='inherit'
                onClick={() => {
                    vm.setIsNotificationOpen = false;
                }}
            >
                <CloseIcon fontSize='small' />
            </IconButton>
        </React.Fragment>
    );

    return (
        <Snackbar
            open={vm.isNotificationOpen}
            autoHideDuration={6000}
            onClose={() => {
                vm.setIsNotificationOpen = false;
            }}
            message={vm.notificationMessage}
            action={action}
        />
    );
});

export default Notification;
