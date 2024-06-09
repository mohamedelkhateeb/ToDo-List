"use client";
import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";
import Link from "next/link";
import { PiCarProfileDuotone, PiPersonSimpleBikeBold } from "react-icons/pi";
import { FaUsersGear } from "react-icons/fa6";
export interface ITask {
  id: string;
  title: string;
  isCompleted: boolean;
  createdAt: Date;
}

export const columns: ColumnDef<ITask>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        className="text-black"
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
  },
  {
    accessorKey: "#",
    header: ({ table }) => <div className="">#</div>,
    enableHiding: false,
    cell: ({ row }) => {
      return <div className="">{row.index + 1}</div>;
    },
  },
  {
    accessorKey: "title",
    header: "title",
    enableHiding: false,
    cell: ({ row }) => {
      return <div className="">{row.original.title}</div>;
    },
  },
  {
    accessorKey: "isCompleted",
    header: "isCompleted",
    enableHiding: false,
    cell: ({ row }) => {
      return <div className="">{row.original.isCompleted ? "Yes" : "No"}</div>;
    },
  },
  {
    accessorKey: "createdAt",
    header: "createdAt",
    enableHiding: false,
    cell: ({ row }) => {
      return <div className="">{new Date(row.original.createdAt).toLocaleString()}</div>;
    },
  },
];
