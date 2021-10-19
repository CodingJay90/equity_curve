export async function callApi(url, type, body, headerToken) {
  try {
    const data = await (
      await fetch(url, {
        type,
        body: JSON.stringify(body),
        headers: {
          "Content-type": "Application/json",
          Authorization: headerToken ? headerToken : "",
        },
      })
    ).json();
    return data;
  } catch (error) {
    return error;
  }
}
