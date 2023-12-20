const DOMAIN = "http://localhost:3002"

export const get = async (api: string) => {
    try {
        const response = await fetch(DOMAIN + api)
        if (!response.ok) {
            return response 
        }
        const result = await response.json()
        return result;
    } catch (error: any) {
        throw new Error(error.statusText)
    }
}

export const post = async (data: object) => {
    const response = await fetch(DOMAIN + "/answers", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })
    const result = await response.json();
    return result
}