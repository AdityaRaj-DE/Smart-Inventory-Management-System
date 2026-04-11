"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  Row,
} from "@tanstack/react-table";

interface Props<T> {
  columns: ColumnDef<T>[];
  data: T[];
  onRowClick?: (row: Row<T>) => void;
}

export default function DataTable<T>({
  columns,
  data,
  onRowClick,
}: Props<T>) {
  const table = useReactTable({
    columns,
    data,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <table className="w-full border rounded-lg bg-white">
      <thead className="bg-gray-100">
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th
                key={header.id}
                className="p-3 text-left text-sm font-semibold"
              >
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>

      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr 
            key={row.id} 
            className={`border-t ${onRowClick ? 'cursor-pointer hover:bg-gray-50' : ''}`}
            onClick={() => onRowClick?.(row)}
          >
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id} className="p-3 text-sm">
                {flexRender(
                  cell.column.columnDef.cell,
                  cell.getContext()
                )}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}