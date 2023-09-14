import "server-only";
import { getItems } from "@/lib/firebase-admin-helper";
import DeleteItemButton from "@/components/DeleteItemButton";
import { formatIsoDate } from "@/utils";
import ItemForm from "@/components/ItemForm";

async function ItemsPage() {
  const items = await getItems();
  return (
    <div className="container mx-auto">
      <ItemForm />

      <div className="w-full flex flex-col mt-10">
        {items.map((data) => {
          const item = data as Item;
          return (
            <div
              className={`flex items-center border border-gray-300 p-4 rounded-lg ${
                item.enabled ? "bg-gray-100" : "bg-white"
              } my-2 shadow-sm`}
              key={item.id}
            >
              <div className="flex-1">
                <div>
                  <strong className="text-sm font-semibold mr-2">
                    Title:{" "}
                  </strong>
                  <span className="text-sm">{item.title}</span>
                </div>
                <div>
                  <strong className="text-sm font-semibold mr-2">
                    Description:{" "}
                  </strong>
                  <span className="text-sm">{item.description}</span>
                </div>
                <div className="mb-1">
                  <span className="text-sm">
                    {formatIsoDate(item.updatedAt)}
                  </span>
                </div>
              </div>
              <DeleteItemButton item={item} />
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default ItemsPage;
