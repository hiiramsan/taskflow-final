import AxiosMockAdapter from "axios-mock-adapter";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { httpClient } from "./httpClient";
import { TOKEN_KEY } from "../types";

describe("httpClient authentication interceptor", () => {
  let mock: AxiosMockAdapter;

  beforeEach(() => {
    mock = new AxiosMockAdapter(httpClient);
    localStorage.clear();
  });

  afterEach(() => {
    mock.restore();
    vi.restoreAllMocks();
    localStorage.clear();
  });

  it("adds the stored token to outgoing requests", async () => {
    localStorage.setItem(TOKEN_KEY, "test-token");
    mock.onGet("/projects").reply((config) => [200, config.headers?.Authorization]);

    const response = await httpClient.get<string>("/projects");

    expect(response.data).toBe("Bearer test-token");
  });

  it("removes the token and emits auth-expired after a 401", async () => {
    const authExpired = vi.fn();
    localStorage.setItem(TOKEN_KEY, "expired-token");
    window.addEventListener("auth-expired", authExpired);
    mock.onGet("/projects").reply(401);

    await expect(httpClient.get("/projects")).rejects.toBeDefined();

    expect(localStorage.getItem(TOKEN_KEY)).toBeNull();
    expect(authExpired).toHaveBeenCalledTimes(1);
    window.removeEventListener("auth-expired", authExpired);
  });

  it("keeps the token for non-401 errors", async () => {
    localStorage.setItem(TOKEN_KEY, "still-valid-token");
    mock.onGet("/projects").reply(500);

    await expect(httpClient.get("/projects")).rejects.toBeDefined();

    expect(localStorage.getItem(TOKEN_KEY)).toBe("still-valid-token");
  });
});