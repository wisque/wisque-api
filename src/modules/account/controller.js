import { generateToken } from "src/modules/account/service";

export function signin(ctx) {
    ctx.body = { token: generateToken(ctx.state.user) };
} 