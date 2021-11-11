import { PermissionModel } from 'src/app/security/models/permission.model';

export interface User {
    name: string;
    email: string;
    permissions: PermissionModel[];
    lastlogin: Date;
    idprofile: number;
    iduser: number;
    access_token: string;
    token_type: string;
    expires_in: number;
}
