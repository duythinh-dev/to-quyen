interface LoginResponse {
  _id: string;
  name: string;
  email: string;
  token: string;
}

interface RegisterResponse extends LoginResponse {}

export const auth = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/users/login`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      }
    );

    if (!response.ok) {
      throw new Error("Đăng nhập thất bại");
    }

    const data = await response.json();
    localStorage.setItem("adminToken", data.token);
    return data;
  },

  register: async (
    name: string,
    email: string,
    password: string
  ): Promise<RegisterResponse> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/users`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, email, password }),
    });

    if (!response.ok) {
      throw new Error("Đăng ký thất bại");
    }

    const data = await response.json();
    localStorage.setItem("adminToken", data.token);
    return data;
  },

  getToken: (): string | null => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("adminToken");
    }
    return null;
  },

  logout: (): void => {
    localStorage.removeItem("adminToken");
  },
};
