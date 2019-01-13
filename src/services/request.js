export const GET = async(url) => {
    const response = await fetch(url, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        }
    });
    const result = await response.json();
    return result;
}