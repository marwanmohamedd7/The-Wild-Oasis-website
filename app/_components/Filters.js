"use client";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filters() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const activeFilter = searchParams?.get("capacity") ?? "all";

  function handleFilter(filter) {
    if (filter === activeFilter) return;
    const params = new URLSearchParams(searchParams);
    params.set("capacity", filter);
    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  }

  return (
    <div className="flex border border-primary-800">
      <Button
        filter={"all"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        All cabins
      </Button>
      <Button
        filter={"small"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter={"medium"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter={"large"}
        handleFilter={handleFilter}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ children, filter, handleFilter, activeFilter }) {
  return (
    <button
      onClick={() => handleFilter(filter)}
      className={`px-5 py-2 hover:bg-primary-700 ${
        filter === activeFilter && "bg-primary-700 text-primary-50"
      }`}
    >
      {children}
    </button>
  );
}

export default Filters;
