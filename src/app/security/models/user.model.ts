import { GenericReturnModel } from 'src/app/shared/models/generic-return.model';

export interface User {
    name: string;
    type: string;
    access_token: string;
    token_type: string;
    expires_in: number;
}
