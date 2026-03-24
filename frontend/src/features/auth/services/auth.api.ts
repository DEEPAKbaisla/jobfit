import { api } from "@/api/axios";

//register function

interface Register {
  username: string;
  email: string;
  password: string;
}

export async function register({ username, email, password }: Register) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });

    return response.data;
  } catch (error: any) {
    console.log("BACKEND ERROR:", error.response?.data); // 🔥
    throw error;
  }
}

//login function

interface Login {
  email: string;
  password: string;
}

export async function login({ email, password }: Login) {
  try {
    const response = await api.post("/api/auth/login", {
      email,
      password,
    });
    return response.data;
  } catch (error: any) {
    console.log("BACKEND ERROR:", error.response?.data); // 🔥
    throw error;
  }
}

//logout functon

export async function logout() {
  try {
    const response = await api.get("/api/auth/logout");

    return response.data;
  } catch (error: any) {
    console.log("BACKEND ERROR:", error.response?.data); // 🔥
    throw error;
  }
}

// get user deatils

export async function getme() {
  try {
    const response = await api.get("/api/auth/get-me");
    return response.data;
  } catch (error: any) {
    console.log("BACKEND ERROR:", error.response?.data); // 🔥
    throw error;
  }
}
