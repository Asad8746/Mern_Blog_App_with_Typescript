import { BlogState } from "./Types";

export const initState: BlogState = {
    blog: {
        _id: "",
        description: "",
        createdAt: new Date(),
        title: "",
        updatedAt: new Date(),
        user_id: ""
    },
    loading: true,
    error: ""
}

