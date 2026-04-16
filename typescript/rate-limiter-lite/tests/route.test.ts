import request from "supertest";
import { describe, it, expect } from "vitest";
import { createApp } from "../src/infrastructure/http/app.js";

describe("GET /health", () => {
  it("returns ok", async () => {
    const app = createApp();

    const response = await request(app).get("/api/health");

    expect(response.status).toBe(200);
    expect(response.body).toEqual({ ok: true });
  });
});
