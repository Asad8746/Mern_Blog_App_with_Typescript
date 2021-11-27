import "reflect-metadata";
import { Keys, Methods } from "./enums";
import { Request as ExpressRequest } from "express";
// using curying for defining multiple Rest Methods
function bindRoute(method: Methods) {
    return (path: string) => {
        return (target: any, key: string, desc: PropertyDescriptor): void => {
            Reflect.defineMetadata(Keys.path, path, target, key)
            Reflect.defineMetadata(Keys.method, method, target, key);
        }
    }
}

export interface Request<T> extends ExpressRequest {
    body: T
}

export const get = bindRoute(Methods.get);
export const post = bindRoute(Methods.post);
export const remove = bindRoute(Methods.delete);
export const put = bindRoute(Methods.put);
