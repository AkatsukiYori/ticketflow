export default function Header() {
    return (
        <header style={{
            height: "70px",
            borderBottom: "1px solid #f1f1f1",
            display: "flex",
            flexDirection: "column",
            alignItems: "end",
            justifyContent: "center",
            padding: "0 0 0 0",
            backgroundColor: "white",
            color: "#1b1b1b" }}>
            <div style={{ backgroundColor: "#1b499d", width: "13%", padding: "16px 32px", color: "white", borderRadius: "50px 0 0 50px" }}>
                <h3 style={{ margin: 0 }}>Alexander</h3>
                <p style={{ margin: 0 }}>Pontianak</p>
            </div>
        </header>
    );
}