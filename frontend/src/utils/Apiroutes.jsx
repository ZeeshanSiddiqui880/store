const ApiRoutes = {
  LOGIN: "/api/auth/login",
  REGISTER: "/api/auth/register",
  CHANGE_PASSWORD: "/api/auth/change-password",

  ADMIN: {
    GET_ALL: "/api/admin/dashboard",

    GET_USERS: "/api/admin/users",
    GET_USER_BY_ID: (id) => `/api/admin/user/${id}`,
    CREATE_USER: `/api/admin/create-user`,

    GET_STORES: "/api/admin/stores",
    CREATE_STORE: "/api/admin/create-store",
  },

  OWNER: {
    GET: "/api/owner/dashboard",
    CREATE_STORE: "/api/owner/create-store",
  },

  USER: {
    GET: "/api/stores/",
    RATING: (storeId) => `/api/stores/${storeId}/rating`,
  },
};

export default ApiRoutes;
