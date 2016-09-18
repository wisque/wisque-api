import * as service from './parties.service';

export async function getAll(ctx) {
    ctx.body = await service.getAll();
}

export async function create(ctx) {
    ctx.body = await service.create();
}

export async function update(ctx) {
    ctx.body = await service.update();
}

export async function remove(ctx) {
    ctx.body = await service.remove();
}

export function getById(ctx) {
    ctx.body = ctx.state.party;
}


