import "reflect-metadata";
import { RequestHandler, Request, Response, NextFunction } from "express";
import { Keys } from "./enums";

export function use<ReqHandler = RequestHandler>(middleware: ReqHandler) {
    return (target: any, key: string, desc: PropertyDescriptor) => {
        const middlewares: ReqHandler[] = Reflect.getMetadata(Keys.middleware, target, key) || [];
        middlewares.push(middleware);
        Reflect.defineMetadata(Keys.middleware, middlewares, target, key);
    }
}