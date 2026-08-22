import { describe, expect, it } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { createMockRoom } from "@baditaflorin/mesh-common/testing";
import { Feature } from "../../src/Feature";
import { config } from "../../src/config";

describe("Feature (component)", () => {
  it("renders the app name when connected", () => {
    const room = createMockRoom();
    render(<Feature room={room} config={config} />);
    expect(screen.getByRole("heading", { name: config.appName })).toBeInTheDocument();
    expect(screen.getByText("Choose a role")).toBeInTheDocument();
  });

  it("shows a connecting state when room is null", () => {
    render(<Feature room={null} config={config} />);
    for (const claimButton of screen.getAllByRole("button", { name: "Claim" })) {
      expect(claimButton).toBeDisabled();
    }
  });

  it("lets this peer claim and release a role", () => {
    const room = createMockRoom({ peerId: "alex" });
    render(<Feature room={room} config={config} />);
    const [firstClaim] = screen.getAllByRole("button", { name: "Claim" });
    if (!firstClaim) throw new Error("Expected a role claim button");
    fireEvent.click(firstClaim);
    expect(screen.getByText("You hold 1 role")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Release" }));
    expect(screen.getByText("Choose a role")).toBeInTheDocument();
  });
});
