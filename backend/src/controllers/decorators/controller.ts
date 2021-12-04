import "reflect-metadata";
import { RequestHandler } from "express";
import { Router } from "../../Router";
import { Keys, Methods } from "./enums";
import { asyncMiddleware } from "../../middlewares"
export const controller = (basePath: string) => {
    return (target: Function): void => {
        const router = Router.getRouter();
        for (let key in target.prototype) {
            const handler = target.prototype[key];
            const path = Reflect.getMetadata(Keys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(Keys.method, target.prototype, key);
            const middlewares: RequestHandler[] = Reflect.getMetadata(Keys.middleware, target.prototype, key) || [];
            if (path && method) {
                router[method](`${basePath}${path}`, middlewares, asyncMiddleware(handler));
            }
        }
    }
}