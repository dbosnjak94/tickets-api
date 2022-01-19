const paths = {
    "/auth/signUp": {
        post: {
            summary: "New author registration",
            tags: ["Auth"],
            parameters: [
                {
                    name: "Author sign up",
                    in: "body",
                    description: "User sign up model",
                    required: true,
                    schema: {
                        $ref: "#/definitions/signUp",
                    },
                },
            ],
            responses: {
                "200": {
                    description: "User Registered and Auth Token granted",
                    schema: {
                        $ref: "#/responses/signUp",
                    },
                },
            },
            produces: ["application/json"],
        },
    },
    "/auth/signIn": {
        post: {
            summary: "Email and password based login",
            tags: ["Auth"],
            parameters: [
                {
                    name: "User login",
                    in: "body",
                    description: "User sign in model",
                    required: true,
                    schema: {
                        $ref: "#/definitions/signIn",
                    },
                },
            ],
            responses: {
                "200": {
                    description: "Auth Token granted",
                    schema: {
                        $ref: "#/responses/signIn",
                    },
                },
            },
            produces: ["application/json"],
        },
    },
};

const definitions = {
    signUp: {
        example: {
            first_name: "Dominik",
            last_name: "Bosnjak",
            email: "dominik.bosnjak94@gmail.com",
            password: "Password1",
        },
    },
    signIn: {
        example: {
            email: "dominik.bosnjak94@gmail.com",
            password: "Password1",
        },
    }
};

const responses = {

};

const port = process.env.PORT || 3000;
const ip = process.env.IP || "localhost";

export function generateDocumentation() {
    return {
        _swagger: "2.0",
        get swagger() {
            return this["_swagger"];
        },
        set swagger(value) {
            this["_swagger"] = value;
        },
        schemes: ["http", "https"],
        info: {
            contact: {
                name: "Dominik Bosnjak",
                email: "dominik.bosnjak94@gmail.com",
            },
        },
        host: `${ip}:${port}`,
        basePath: "/api",
        paths,
        definitions,
        responses,
        parameters: {},
    };
}
