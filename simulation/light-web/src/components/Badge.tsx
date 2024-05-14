export default function StatusBadge({ status, message }: { status: string, message: string | null }) {
    let badgeClass = "";
    let badgeText = "";

    switch (status.toLowerCase()) {
        case "error":
            badgeClass = "bg-red-100 text-red-700";
            badgeText = message ? `Error: ${message}` : "Error";
            break;
        case "success" || "finished":
            badgeClass = "bg-green-100 text-green-700";
            badgeText = status;
            break;
        case "pending":
            badgeClass = "bg-yellow-100 text-yellow-800";
            badgeText = "Pending";
            break;
        default:
            badgeClass = "bg-orange-100 text-orange-600";
            badgeText = message ? `${status}: ${message}` : status;
    }

    return (
        <span className={`inline-flex items-center rounded-md px-2 py-1 text-xs font-medium ${badgeClass}`}>
            {badgeText}
        </span>
    );
}
