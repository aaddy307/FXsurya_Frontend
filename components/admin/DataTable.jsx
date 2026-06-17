"use client";

import { useState, Fragment } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export default function DataTable({
  columns,
  data,
  expandable = false,
  expandableContent,
  onDelete,
  onToggle,
  onEdit,
}) {
  const [expandedRow, setExpandedRow] = useState(null);

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="border-b border-[#1A1A1A]">
            {columns.map((col) => (
              <th
                key={col.key}
                className="text-left text-gray-400 font-inter text-xs uppercase tracking-wider py-4 px-4"
              >
                {col.label}
              </th>
            ))}
            {(onDelete || onToggle) && (
              <th className="text-right text-gray-400 font-inter text-xs uppercase tracking-wider py-4 px-4">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {(Array.isArray(data) ? data : []).map((row, i) => (
            <Fragment key={row._id || row.id || i}>
              <tr
                className="border-b border-[#1A1A1A] hover:bg-[#1A1A1A]/50 transition-colors"
              >
                {columns.map((col) => (
                  <td key={col.key} className="py-4 px-4">
                    {col.render ? col.render(row[col.key], row) : row[col.key]}
                  </td>
                ))}
                <td className="py-4 px-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    {expandable && (
                      <button
                        onClick={() =>
                          setExpandedRow(expandedRow === i ? null : i)
                        }
                        className="p-2 text-gray-400 hover:text-white transition-colors"
                      >
                        {expandedRow === i ? (
                          <ChevronUp className="w-4 h-4" />
                        ) : (
                          <ChevronDown className="w-4 h-4" />
                        )}
                      </button>
                    )}
                    {onToggle && (
                      <button
                        onClick={() => onToggle(row)}
                        className={cn(
                          "px-3 py-1 rounded-full text-xs font-semibold transition-colors",
                          row.isPublished
                            ? "bg-success/20 text-success"
                            : "bg-gray-600/20 text-gray-400"
                        )}
                      >
                        {row.isPublished ? "Published" : "Draft"}
                      </button>
                    )}
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        className="px-3 py-1 bg-accent-gold/10 hover:bg-accent-gold/20 text-accent-gold rounded-full text-xs font-semibold transition-colors"
                      >
                        Edit
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        className="p-2 text-danger hover:bg-danger/10 rounded-lg transition-colors"
                      >
                        Delete
                      </button>
                    )}
                  </div>
                </td>
              </tr>
              {expandable && expandedRow === i && expandableContent && (
                <tr className="border-b border-[#1A1A1A]">
                  <td colSpan={columns.length + 1} className="p-4 bg-[#0A0A0A]">
                    {expandableContent(row)}
                  </td>
                </tr>
              )}
            </Fragment>
          ))}
        </tbody>
      </table>
      {Array.isArray(data) && data.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          No data available
        </div>
      )}
    </div>
  );
}
