import { useEffect, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { MainVM } from '../viewModels/Main.VM';
import FormView from './FormView';
import TabView from './TabView';
import TabPanel from '../components/TabPanel';
import Notification from '../components/Notification';
import { useTheme } from '@mui/material';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import { api } from '../utils/API';
import { UserData } from '../utils/types';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

interface MainViewProps {
    currentUser: UserData;
    setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
}

const MainView: React.FC<MainViewProps> = observer(
    ({ currentUser, setIsAuth }) => {
        const theme = useTheme();

        const vm = useMemo(() => new MainVM(currentUser, setIsAuth, api), []);

        useEffect(() => {
            vm.setWSConnection();
            return () => {
                console.log('disconnected');
                vm.closeWSConnection();
            };
        }, []);

        return (
            <div className='w-full h-screen flex justify-center bg-gradient-to-r from-slate-300 to-slate-100 overflow-x-hidden'>
                <div className=' w-full lg:max-w-screen-lg grid grid-rows-[100px,_calc(100vh-160px)] lg:grid-rows-[100px,_calc(100vh-150px)]  lg:pt-7 gap-5 box-border  '>
                    <header className='pr-2 pl-2 lg:p-0 w-full flex items-center justify-center sm:justify-start uppercase text-indigo-500'>
                        <h1 className='font-bold text-3xl bg-gradient-to-r from-sky-500 to-indigo-500 text-transparent bg-clip-text'>
                            Anonymous messenger
                        </h1>
                    </header>
                    <main className={'h-full box-border text-slate-900'}>
                        <nav className='bg-gradient-to-r from-sky-500 to-indigo-500 shadow text-white flex flex-col-reverse sm:flex-row items-center justify-between  mr-[-50vw] pr-[50vw] ml-[-50vw] pl-[50vw]'>
                            <Tabs
                                value={vm.tabsValue}
                                onChange={(e, newValue) => {
                                    vm.setTabsValue = newValue;
                                }}
                                indicatorColor='secondary'
                                textColor='inherit'
                                variant='standard'
                                aria-label='full width tabs example'
                            >
                                <Tab label='New Message' {...vm.a11yProps(0)} />
                                <Tab label='Inbox' {...vm.a11yProps(1)} />
                                <Tab label='Outbox' {...vm.a11yProps(2)} />
                            </Tabs>
                            <div className='flex flex-row p-2 pr-4 pl-4 items-center'>
                                <p className='capitalize'>{`Welcome, ${currentUser.name}!`}</p>
                                <a
                                    href='/sign-in'
                                    aria-label='change user'
                                    className='ml-3 text-center hover:opacity-60'
                                    onClick={() => {
                                        vm.logOut();
                                    }}
                                >
                                    <ExitToAppIcon />
                                </a>
                            </div>
                        </nav>
                        <TabPanel
                            value={vm.tabsValue}
                            index={0}
                            dir={theme.direction}
                        >
                            <FormView
                                sendMessage={vm.sendMessage}
                                currentUser={currentUser}
                                users={vm.users}
                            />
                        </TabPanel>
                        <TabPanel
                            value={vm.tabsValue}
                            index={1}
                            dir={theme.direction}
                        >
                            <TabView
                                type='inbox'
                                key='inbox'
                                messages={vm.messages.received}
                            />
                        </TabPanel>
                        <TabPanel
                            value={vm.tabsValue}
                            index={2}
                            dir={theme.direction}
                        >
                            <TabView
                                type='outbox'
                                key='outbox'
                                messages={vm.messages.sent}
                            />
                        </TabPanel>
                    </main>
                </div>
                <Notification vm={vm} />
            </div>
        );
    }
);

export default MainView;
