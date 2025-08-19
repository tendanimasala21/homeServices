import { LoaderCircleIcon } from "lucide-react";

export default function Loading() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full space-y-5">
           <LoaderCircleIcon className="size-5 animate-spin" />
           <p>Loading Dashboard</p> 
        </div>
    )
}