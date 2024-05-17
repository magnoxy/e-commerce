import FormSubmitButton from "@/components/FormSubmitButton";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "../api/auth/[...nextauth]/route";

export const metadata = {
  title: "Add Product - KodigosStore",
};

async function addProduct(formData: FormData) {
  "use server";

  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  const name = formData.get("name")?.toString();
  const description = formData.get("description")?.toString();
  const imageUrl = formData.get("imageUrl")?.toString();
  const price = Number(formData.get("price") || 0);
  const stock = Number(formData.get("stock") || 0);

  if (!name || !description || !imageUrl || !price || !stock || stock < 0) {
    throw new Error("Invalid input");
  }

  await fetch("http://localhost:3000/products", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, description, imageUrl, price, stock }),
  });

  redirect("/");

}

export default async function AddProductPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin?callbackUrl=/add-product");
  }

  return (
    <div>
      <h1 className="mb-3 text-lg font-bold">Adicionar Produto</h1>
      <form action={addProduct}>
        <input
          required
          name="name"
          placeholder="Name"
          className="input-bordered input mb-3 w-full"
        />
        <textarea
          required
          name="description"
          placeholder="Description"
          className="textarea-bordered textarea mb-3 w-full"
        />
        <input
          required
          name="imageUrl"
          placeholder="Image URL"
          type="url"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="stock"
          placeholder="Qtd in stock"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <input
          required
          name="price"
          placeholder="Price"
          type="number"
          className="input-bordered input mb-3 w-full"
        />
        <FormSubmitButton className="btn-block">Add Product</FormSubmitButton>
      </form>
    </div>
  );
}