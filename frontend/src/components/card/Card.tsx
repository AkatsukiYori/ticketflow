import "./card.css";

type Props = {
    data: any
}

export default function Card({ data }: Props) {
    return (
        <div className="card" style={{ width: "100%" }}>
            <div className="card-content">
                <div className="card-header">
                    <p style={{ fontSize: 14, margin: 0 }}>#{data.ticket_no} - {new Date(data.report_date).toLocaleString()} - {data.user}</p>
                </div>
                <div className="card-body">
                    <div className="card-body-top">
                        <div>
                            <h3 style={{ marginBottom: 0, marginTop: 0 }}>{data.ticket_title} </h3>
                            <span style={{ backgroundColor: data.status === "pending" ? "yellow" : data.status === "on_progress" ? "orange" : data.status === "completed" ? "lightgreen" : "red", padding: "4px 16px", borderRadius: "16px", fontSize: 12 }}>{data.status.charAt(0).toUpperCase() + data.status.replace("_", " ").slice(1)}</span>
                        </div>
                        <div>
                            <div className="circle" style={{ backgroundColor: data.priority === "low" ? "green" : "red" }}></div><span>{data.priority.charAt(0).toUpperCase() + data.priority.slice(1)}</span>
                        </div>
                    </div>
                    <p style={{ margin: 0 }}>{data.problem}</p>
                </div>
            </div>
        </div>
    );
}