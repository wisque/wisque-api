import account from './model';

export async function getAll() {
    return await account.find();
}

export async function create(event) {
    return await account.create(event);
}

export async function update() {
    return await account.update();
}

export async function remove(id) {
    return await account.remove({id: id});
}

export function getById(id) {
    return account.findOne({id: id});
}

export function findOne(query) {
    return account.findOne(query);
}