import statusCodes from "../constants/httpStatusCodes.js";
import { failed_response } from "./response.js";
import * as yup from "yup";

const schemaValidator = async (schema, data, res) => {
    try {
        await schema.validate(data, { abortEarly: false });
        return false;
    } catch (error) {
        if (error instanceof yup.ValidationError) {
            console.log("Yup validation error:", error);
            res.status(statusCodes.BAD_REQUEST).json(
                failed_response(
                    statusCodes.BAD_REQUEST,
                    "Validation failed. Please fix and try again.",
                    {
                        status: "Please check the highlighted fields.",
                        message: error?.errors?.[0] || error?.message,
                        errors: error?.errors || []
                    },
                    false
                )
            );
        }
        return true;
    }
    // return false;
};

export default schemaValidator;