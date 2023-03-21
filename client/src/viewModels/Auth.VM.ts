import { Api } from '../utils/API';
import { UserData } from '../utils/types';
import { NavigateFunction } from 'react-router-dom';

export class AuthVM {
    private setIsAuth: React.Dispatch<React.SetStateAction<boolean>>;
    private setCurrentUser: React.Dispatch<React.SetStateAction<UserData>>;
    private api: Api;
    private navigate: NavigateFunction;
    constructor(
        setIsAuth: React.Dispatch<React.SetStateAction<boolean>>,
        setCurrentUser: React.Dispatch<React.SetStateAction<UserData>>,
        api: Api,
        navigate: NavigateFunction
    ) {
        this.setIsAuth = setIsAuth;
        this.setCurrentUser = setCurrentUser;
        this.api = api;
        this.navigate = navigate;
    }
    loginUser(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const name = (
            e.currentTarget.elements.namedItem('name') as HTMLInputElement
        ).value;
        this.api
            .loginUser(name)
            .then((data) => {
                const user = data.data.user as UserData;
                this.setCurrentUser(user);
                this.setIsAuth(true);
                this.navigate('/', { replace: true });
            })
            .catch((err) => console.log(err));
    }
}
