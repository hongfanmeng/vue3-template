import { defineStore } from "pinia";
import { ref, computed } from "vue";
import axios from "~/utils/axios";
interface Token {
  refresh: string;
  access: string;
}

interface Access {
  access: string;
}

export enum AuthStatus {
  UNAUTHED,
  AUTHED,
  TIMEOUT,
}

export const useAuthStore = defineStore(
  "auth-store",
  () => {
    /**
     * JWT token for authentication
     */
    const token = ref<Token | null>(null);

    /**
     * The time that the user logged in, time value in milliseconds
     */
    const loginTime = ref<number | null>(null);

    /**
     * attempt login to the api server
     * @param username
     * @param password
     */
    async function loginWith(username: string, password: string) {
      token.value = (
        await axios({
          method: "post",
          url: "token/",
          data: { username, password },
        })
      ).data as Token;

      // using now() as Date object cannot persist
      loginTime.value = Date.now();
    }

    /**
     * refresh the JWT token
     */
    async function refreshToken() {
      if (token.value == null) return;
      let resp = await axios({
        method: "post",
        url: "token/refresh/",
        data: { refresh: token.value!.refresh },
      });
      token.value!.access = resp.data.access;
      loginTime.value = Date.now();
    }

    /**
     * logout
     */
    function logout() {
      token.value = null;
      loginTime.value = null;
    }

    /**
     * The current authentication state
     */
    const authState = computed(() => {
      if (token.value == null) return AuthStatus.UNAUTHED;
      if (loginTime.value == null) return AuthStatus.UNAUTHED;

      const now = Date.now();

      // refresh token timeout for 24 hour
      if (getHourDiff(loginTime.value, now) >= 24) return AuthStatus.UNAUTHED;

      // access token timeout for 30 mins
      if (getMinDiff(loginTime.value, now) > 25) return AuthStatus.TIMEOUT;

      return AuthStatus.AUTHED;
    });

    return {
      token,
      loginTime,
      authState,
      loginWith,
      refreshToken,
      logout,
    };
  },
  {
    persist: true,
  }
);

export const getMinDiff = (s: number, e: number) => {
  const msInMinute = 60 * 1000;
  return Math.round(Math.abs(e - s) / msInMinute);
};

export const getHourDiff = (s: number, e: number) => {
  const msInHour = 60 * 60 * 1000;
  return Math.round(Math.abs(e - s) / msInHour);
};
