import { Router as ExpressRouter } from "express";


export class Router {
    private static instance: ExpressRouter;
    static getRouter(): ExpressRouter {
        if (!Router.instance) {
            Router.instance = ExpressRouter();
        }
        return Router.instance
    }
}