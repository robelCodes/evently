

export const eventLoader = async ({ params }) => {

    const response = await fetch(`http://localhost:3001/events/${params.id}`)

    if (!response.ok) {
        throw new Error('Failed to fetch event details')
    }
    const event = await response.json()
    return event
}