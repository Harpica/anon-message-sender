import { useTheme } from '@mui/material';
import AppBar from '@mui/material/AppBar';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { Box } from '@mui/system';
import { useState } from 'react';
import TabPanel from '../components/TabPanel';
import FormView from './FormView';
import TabView from './TabView';

function a11yProps(index: number) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const MainView = () => {
    const theme = useTheme();
    const [value, setValue] = useState(0);

    const handleChange = (event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index: number) => {
        setValue(index);
    };

    return (
        <div className='w-full h-fit min-h-screen flex justify-center bg-gradient-to-r from-slate-300 to-slate-100 overflow-x-hidden'>
            <div className=' w-full lg:max-w-screen-lg grid grid-rows-[100px,_1fr] lg:p-7 gap-5 box-border  '>
                <header className='pr-2 pl-2 lg:p-0 w-full flex items-center justify-center sm:justify-start uppercase text-indigo-500'>
                    <h1 className='font-bold text-3xl bg-gradient-to-r from-sky-500 to-indigo-500 text-transparent bg-clip-text'>
                        Anonymous messenger
                    </h1>
                </header>
                <main className={'h-full box-border text-slate-900'}>
                    <nav className='bg-gradient-to-r from-sky-500 to-indigo-500 shadow text-white flex flex-col-reverse sm:flex-row items-center justify-between  mr-[-50%] pr-[50%] ml-[-50%] pl-[50%]'>
                        <Tabs
                            value={value}
                            onChange={handleChange}
                            indicatorColor='secondary'
                            textColor='inherit'
                            variant='standard'
                            aria-label='full width tabs example'
                        >
                            <Tab label='New Message' {...a11yProps(0)} />
                            <Tab label='Inbox' {...a11yProps(1)} />
                            <Tab label='Outbox' {...a11yProps(2)} />
                        </Tabs>
                        <div className='flex flex-row p-2 pr-4 pl-4'>
                            <p className='capitalize'>Welcome, Name!</p>
                            <a
                                href='#'
                                className='ml-3 text-center hover:opacity-60'
                            >
                                Change user
                            </a>
                        </div>
                    </nav>
                    <TabPanel value={value} index={0} dir={theme.direction}>
                        <FormView />
                    </TabPanel>
                    <TabPanel value={value} index={1} dir={theme.direction}>
                        <TabView />
                    </TabPanel>
                    <TabPanel value={value} index={2} dir={theme.direction}>
                        Item Three
                    </TabPanel>
                </main>
            </div>
        </div>
    );
};

export default MainView;
