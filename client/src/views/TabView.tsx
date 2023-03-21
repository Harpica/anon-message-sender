import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const TabView = () => {
    const [open, setOpen] = useState(true);

    const handleClick = () => {
        setOpen(!open);
    };

    return (
        <List sx={{ width: '100%' }} component='ul'>
            <ListItemButton onClick={handleClick}>
                <ListItemText
                    className='flex justify-between'
                    primary={
                        <div>
                            <h3 className='text-indigo-600 font-bold'>Title</h3>
                            <p>From: Name</p>
                        </div>
                    }
                />
                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItemText sx={{ pl: 4 }}>
                        Body of the message
                    </ListItemText>
                </List>
            </Collapse>
            <ListItemButton onClick={handleClick}>
                <ListItemText
                    className='flex justify-between'
                    primary={
                        <div>
                            <h3>Title</h3>
                            <p>From: Name</p>
                        </div>
                    }
                />

                {open ? <ExpandLess /> : <ExpandMore />}
            </ListItemButton>
            <Collapse in={open} timeout='auto' unmountOnExit>
                <List component='div' disablePadding>
                    <ListItemText sx={{ pl: 4 }}>
                        Body of the message
                    </ListItemText>
                </List>
            </Collapse>
        </List>
    );
};

export default TabView;
