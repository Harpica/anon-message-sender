import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { useCallback } from 'react';
import { MessageData, UserData } from '../utils/types';
import { FormVM } from '../viewModels/Form.VM';
import { observer } from 'mobx-react-lite';
import { useMemo } from 'react';

interface FormViewProps {
    sendMessage: (message: MessageData) => void;
    currentUser: UserData;
    users: Array<UserData>;
}

const FormView: React.FC<FormViewProps> = observer(
    ({ sendMessage, currentUser, users }) => {
        const onFormSubmit = useCallback(
            (message: MessageData) => {
                sendMessage(message);
            },
            [sendMessage]
        );
        const vm = useMemo(
            () => new FormVM(onFormSubmit, currentUser, users),
            [users]
        );
        return (
            <form
                className='flex flex-col gap-5 h-full'
                onSubmit={(e) => {
                    vm.handleSubmitForm(e);
                }}
            >
                <div className='flex flex-col-reverse gap-3  sm:flex-row  justify-between items-center'>
                    <Autocomplete
                        className='sm:w-72 shrink-0 self-stretch sm:self-center'
                        id='free-solo-demo'
                        freeSolo
                        onChange={() => {
                            vm.setIsMessageShown = false;
                        }}
                        options={users.map((user) => user.name)}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label='Receiver'
                                InputProps={{
                                    ...params.InputProps,
                                    onChange: (e) => {
                                        if (
                                            !users.find(
                                                (user) =>
                                                    user.name ===
                                                    e.currentTarget.value
                                            )
                                        ) {
                                            vm.setIsMessageShown = true;
                                            return;
                                        }
                                        vm.setIsMessageShown = false;
                                    },
                                    name: 'repicient',
                                    required: true,
                                }}
                            />
                        )}
                    />
                    {vm.isMessageShown && (
                        <p className='text-indigo-500 text-xs max-w-sm text-center'>
                            This user doesn't exist yet, but if somebody logs in
                            under this name, he/she will be able to read your
                            message
                        </p>
                    )}

                    <div className='rounded bg-gradient-to-r from-sky-500 to-indigo-500 p-1 hover:opacity-80 transition-all active:scale-90 shrink-0'>
                        <button
                            type={'submit'}
                            className=' box-border p-1 pr-8 pl-8 self-center bg-white text-indigo-500
         shadow-md rounded outline-none transition-all hover:opacity-80 uppercase'
                        >
                            Send message
                        </button>
                    </div>
                </div>
                <input
                    type={'text'}
                    name='title'
                    id='message-title'
                    placeholder='Enter message title...'
                    required
                    className='p-2 pl-[15px] pr-[15px] bg-inherit focus:outline-none'
                ></input>
                <textarea
                    name='body'
                    id='message-body'
                    placeholder='Start typing your message...'
                    required
                    className='p-2 pl-[15px] pr-[15px] scrollbar resize-none bg-inherit h-full focus:outline-none'
                ></textarea>
            </form>
        );
    }
);

export default FormView;
