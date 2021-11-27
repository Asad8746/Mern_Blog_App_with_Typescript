import { Router } from "../../Router";
import { Keys, Methods } from "./enums";
export const controller = (basePath: string) => {
    return (target: Function): void => {
        const router = Router.getRouter();
        for (let key in target.prototype) {
            const handler = target.prototype[key];
            const path = Reflect.getMetadata(Keys.path, target.prototype, key);
            const method: Methods = Reflect.getMetadata(Keys.method, target.prototype, key);
            if (path && method) {
                router[method](`${basePath}${path}`, handler);
            }
        }
    }
}