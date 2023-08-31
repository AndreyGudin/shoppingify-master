type User = {
  id: number;
  name: string;
  email: string;
};

export default async function Profile() {
  return (
    <main style={{ maxWidth: 1200, marginInline: "auto", padding: 20 }}>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr 1fr",
          gap: 20,
        }}
      >
        Profile
      </div>
    </main>
  );
}
