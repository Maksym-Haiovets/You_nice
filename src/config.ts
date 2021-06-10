const NAME_ADMIN = 'You_nice';
const NAME_DB = 'You_Nice';
export const URI = `mongodb+srv://admin:${NAME_ADMIN}@cluster0.bkkel.mongodb.net/${NAME_DB}?retryWrites=true&w=majority`;

export const SALTROUNDS = 10;
export const jwttoken = {
    secret: 'sec&)(*k4eYhi`!~',
    tokens: {
        access: {
            type : 'access',
            expiresIn: '30m'
        },
        refresh: {
            type : 'refresh',
            expiresIn: '2h'
        }
    }
};
export const DEFAULT_ROLE = 'USER';
export const TYPEUSER = ['USER', 'ADMIN']  