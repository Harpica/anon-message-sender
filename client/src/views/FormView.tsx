import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';

const FormView = () => {
    return (
        <form className='flex flex-col gap-5 h-full'>
            <div className='flex flex-col-reverse gap-3 sm:flex-row justify-between'>
                <Autocomplete
                    className='sm:w-72'
                    id='free-solo-demo'
                    freeSolo
                    options={[
                        '1',
                        '2',
                        '3',
                        '44444444444444444444 444444444 4444',
                    ]}
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label='Receiver'
                            InputProps={{
                                ...params.InputProps,
                            }}
                        />
                    )}
                />
                {/* <button
                    type={'submit'}
                    className=' p-2 pr-8 pl-8 self-stretch bg-gradient-to-r from-sky-500 to-indigo-500
                                 text-white shadow-md rounded outline-none hover:opacity-80 transition-all active:scale-90 uppercase'
                >
                    Send message
                </button> */}
                <div className='rounded bg-gradient-to-r from-sky-500 to-indigo-500 p-1 hover:opacity-80 transition-all active:scale-90 self-start sm:self-center'>
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
                name='message-title'
                id='message-title'
                placeholder='Enter message title...'
                className='p-2 pl-[15px] pr-[15px] bg-inherit focus:outline-none'
            ></input>
            <textarea
                name='message-body'
                id='message-body'
                placeholder='Start typing your message...'
                className='p-2 pl-[15px] pr-[15px] resize-none bg-inherit h-full focus:outline-none'
            ></textarea>
        </form>
    );
};

export default FormView;
