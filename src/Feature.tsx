import { useSharedRoles } from "@baditaflorin/mesh-common";
import type { MeshConfig, YRoom } from "@baditaflorin/mesh-common";
const roles = ["Host", "Timekeeper", "Scribe"];

export function Feature({ room, config }: { room: YRoom | null; config: MeshConfig }) {
  const shared = useSharedRoles(room);
  const myClaims = shared.claims.filter((claim) => claim.peerId === room?.peerId);

  return (
    <main className="role-board">
      <h1>{config.appName}</h1>
      <p className="lede">Claim a lightweight role before the conversation starts.</p>
      <p className="role-count" aria-live="polite">
        {myClaims.length
          ? `You hold ${myClaims.length} role${myClaims.length === 1 ? "" : "s"}`
          : "Choose a role"}
      </p>
      <div className="role-list">
        {roles.map((role) => {
          const claim = shared.claims.find((entry) => entry.role === role);
          const mine = Boolean(room && claim?.peerId === room.peerId);
          return (
            <section className={mine ? "role-card mine" : "role-card"} key={role}>
              <div>
                <h2>{role}</h2>
                <p>{claim ? (mine ? "Yours" : "Claimed by another peer") : "Available"}</p>
              </div>
              {mine ? (
                <button type="button" onClick={() => shared.release(role)}>
                  Release
                </button>
              ) : (
                <button
                  type="button"
                  disabled={!room || Boolean(claim)}
                  onClick={() => shared.claim(role)}
                >
                  Claim
                </button>
              )}
            </section>
          );
        })}
      </div>
    </main>
  );
}
