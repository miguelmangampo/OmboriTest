import { GET } from './request';

export const getUsers = async(pageNo, perPage = 5) => {
    let users = await GET(`https://reqres.in/api/users?page=${pageNo}&per_page=${perPage}`);
    return users;
}