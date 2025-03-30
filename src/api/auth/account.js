import { API_BASE_URL } from "../keys.conf";

const signup = async (formData) => {


    try {
        const response = await fetch(`${API_BASE_URL}api/auth/signup`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
                name: formData.fullName,
                stage_name: formData.stageName,
                email: formData.email,
                phone: formData.contactNumber,
                password: formData.password
            }),
        });

        const res = await response.json();

        if (!res.success) {
            throw new Error(res.message || "Failed to Signup");
        }

        return res;
    } catch (error) {
        throw new Error(error.message || "Failed to Signup");
    }
};

const login = async (email, password) => {
    try {
        const response = await fetch(`${API_BASE_URL}api/auth/login`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({ email, password }),
        });

        const res = await response.json();

        if (!res.success) {
            throw new Error(res.message || "Invalid Credentials");
        }

        return res;
    } catch (error) {
        throw new Error(error.message || "Failed to Login");
    }
};


export { signup, login };