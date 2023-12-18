const DOMAIN = "http://localhost:3002"

export const get = async (api: string) => {
    const response = await fetch(DOMAIN + api)
    const result = await response.json()
    return result;
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