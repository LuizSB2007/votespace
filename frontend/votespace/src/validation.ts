import api from "./api";

export default async function validation(token: string) {
    const tokenIsValid: any = await api.post(
        "/auth/valid",
        {},
        {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        },
    );
    if (tokenIsValid.data !== "isValid") return false;
    return true
};