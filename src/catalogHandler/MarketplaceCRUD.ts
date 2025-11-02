const API_URL = "https://constructionconfunction-b2angsb5gfd4byew.brazilsouth-01.azurewebsites.net/api/CatalogoFunction";

export async function listProducts() {
  const res = await fetch(API_URL, { method: "GET" });
  return res.json();
}

export async function createProduct(product: any) {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function updateProduct(product: any) {
  const res = await fetch(API_URL, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(product),
  });
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${API_URL}?id=${id}`, { method: "DELETE" });
  return res.status;
}