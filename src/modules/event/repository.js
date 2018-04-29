import party from './model';

export async function getAll() {
    return await party.find();
}

export async function create(event) {
    return await party.create(event);
}

export async function update() {
    return await party.update();
}

export async function remove(id) {
    return await party.remove({id: id});
}

export function getById(id) {
    return party.findOne({id: id});
}