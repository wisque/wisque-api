import party from './parties.model';

export async function getAll() {
    return await party.find();
}

export async function create() {
    return await party.create();
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