import * as repository from './repository';

export async function getAll(ctx) {
    ctx.body = await repository.getAll();
}

export async function create(ctx) {
    ctx.body = await repository.create(ctx.request.body);
}

export async function update(ctx) {
    ctx.body = await repository.update();
}

export async function remove(ctx) {
    ctx.body = await repository.remove();
}

export function getById(ctx) {
    ctx.body = ctx.state.event;
}