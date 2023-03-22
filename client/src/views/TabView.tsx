import { useState } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import { observer } from 'mobx-react-lite';
import { Message } from '../utils/types';
import Typography from '@mui/material/Typography/Typography';

interface TabViewProps {
    type: 'inbox' | 'outbox';
    messages: Array<Message>;
}

const TabView: React.FC<TabViewProps> = observer(({ type, messages }) => {
    const [opened, setOpened] = useState<Array<number>>([]);

    const handleClick = (id: number) => {
        if (opened.includes(id)) {
            setOpened(opened.filter((i) => i !== id));
            return;
        }
        setOpened([...opened, id]);
    };

    return (
        <>
            {messages.length === 0 && <p>No messages</p>}
            <List sx={{ width: '100%' }} component='div'>
                {messages
                    .slice()
                    .sort((a, b) => {
                        return b.id - a.id;
                    })
                    .map((message, i) => (
                        <div key={type + i}>
                            <ListItemButton onClick={() => handleClick(i)}>
                                <ListItemText
                                    className='flex justify-between'
                                    primary={
                                        <div>
                                            <h3 className='text-indigo-600 font-bold'>
                                                {message.title}
                                            </h3>
                                            <p>
                                                {type === 'inbox' &&
                                                    `From: ${message.senderName}`}
                                            </p>
                                            <p>
                                                {type === 'outbox' &&
                                                    `To: ${message.recipientName}`}
                                            </p>
                                            {message.date && (
                                                <p>{`Date: ${new Date(
                                                    message.date
                                                ).toLocaleString()}`}</p>
                                            )}
                                        </div>
                                    }
                                />
                                {opened.includes(i) ? (
                                    <ExpandLess />
                                ) : (
                                    <ExpandMore />
                                )}
                            </ListItemButton>
                            <Collapse
                                in={opened.includes(i)}
                                timeout='auto'
                                unmountOnExit
                            >
                                <List component='div' disablePadding>
                                    <Typography
                                        sx={{ pl: 4, whiteSpace: 'pre-line' }}
                                    >
                                        {message.body}
                                    </Typography>
                                </List>
                            </Collapse>
                        </div>
                    ))}
            </List>
        </>
    );
});

export default TabView;
