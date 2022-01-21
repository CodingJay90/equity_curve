export async function postApi(url, method, body, headerToken) {
  try {
    const data = await (
      await fetch(url, {
        method,
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

export async function getApi(url, headerToken) {
  try {
    const data = await (
      await fetch(url, {
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
