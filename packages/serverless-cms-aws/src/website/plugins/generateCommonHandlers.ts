import * as fs from "fs";
import * as path from "path";
import { getHandlerPath } from "~/utils";
import { HANDLERS_PATHS } from "./handlersPaths";

export const generateCommonHandlers = {
    type: "hook-before-build",
    name: "hook-before-build-generate-common-handlers",
    async hook(params: Record<string, any>) {
        const { projectApplication } = params;

        for (let i = 0; i < HANDLERS_PATHS.length; i++) {
            const current = HANDLERS_PATHS[i];

            const from = getHandlerPath("common", "website", ...current, "handler.js");
            const to = path.join(
                projectApplication.paths.workspace,
                ...current,
                "build",
                "handler.js"
            );

            if (!fs.existsSync(path.dirname(to))) {
                fs.mkdirSync(path.dirname(to), { recursive: true });
            }

            fs.copyFileSync(from, to);
        }
    }
};
