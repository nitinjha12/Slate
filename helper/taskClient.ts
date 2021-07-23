export const fetcher = async function (body: any, setId?: any) {
  const res = await fetch("/api/task", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();

  data.id && setId(data.id);
};
