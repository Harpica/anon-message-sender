import { AuthVM } from '../viewModels/Auth.VM';

interface AuthFormProps {
    vm: AuthVM;
}

const AuthForm: React.FC<AuthFormProps> = ({ vm }) => {
    return (
        <form
            action=''
            className=' bg-white shadow-md rounded px-8 py-8 pt-8 flex flex-col gap-4'
            onSubmit={(e: React.FormEvent<HTMLFormElement>) => {
                vm.loginUser(e);
            }}
        >
            <div className=''>
                <label
                    htmlFor='name'
                    className='text-sm block font-bold  pb-2 uppercase'
                >
                    Name
                </label>
                <input
                    type='text'
                    name='name'
                    required
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline border-blue-300 '
                    placeholder='Your name'
                />
            </div>

            <div className='pt-7 flex flex-col gap-3'>
                <button
                    className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
                    type='submit'
                >
                    Sign in
                </button>
            </div>
        </form>
    );
};

export default AuthForm;
