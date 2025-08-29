export async function fetchVideoCategoryCount() {

    try {

        const response = await fetch(`/api/videos/getCategoryVideosCount`,
            {
                method: 'GET', // Use GET instead of POST
                headers: {
                    'Content-Type': 'application/json',
                },
            });

        const result = await response.json();


        return result.data
        // setData(result);

    } catch (err) {
        console.error("Error fetching document:", err);
    }
}; 


export function timeAgo_Format(timestamp) {
    const now = new Date();
    const date = new Date(timestamp);
    const secondsAgo = Math.floor((now - date) / 1000);

    const units = [
        { label: 'year', seconds: 31536000 },
        { label: 'month', seconds: 2592000 },
        { label: 'week', seconds: 604800 },
        { label: 'day', seconds: 86400 },
        { label: 'hour', seconds: 3600 },
        { label: 'minute', seconds: 60 }
    ];

    for (let unit of units) {
        const interval = Math.floor(secondsAgo / unit.seconds);
        if (interval >= 1) {
            return interval === 1
                ? `1 ${unit.label} ago`
                : `${interval} ${unit.label}s ago`;
        }
    }
    
    return 'just now';
}