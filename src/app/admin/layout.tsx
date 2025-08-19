import { NavLink } from "@/components/nav-link"
import { BookAIcon, BrushCleaningIcon, LayoutDashboardIcon, ListOrderedIcon, LogOutIcon, PlusIcon, ScanLineIcon, ShoppingBasketIcon, SquarePlusIcon } from "lucide-react"
import { unauthorized } from "next/navigation"
import { PropsWithChildren } from "react"

export default async function AdminLayout(props: PropsWithChildren) {

    // if (session.role != 'admin') unauthorized()

    return (
        <div className="flex w-screen h-screen overflow-hidden divide-x">
            <div className="flex flex-col flex-none w-70 h-full divide-y">
                <header></header>
                <main className="flex-auto space-y-2">
                    <NavLink href="/admin" exact>
                        <LayoutDashboardIcon className="stroke-1 size-6" />
                        <span>Admin Dashboard</span>
                    </NavLink>
                    <NavLink href="/admin/products">
                        <ScanLineIcon className="stroke-1 size-6"/>
                        <span>Products</span>
                    </NavLink>
                    <NavLink href="/admin/services">
                        <BrushCleaningIcon className="stroke-1 size-6" />
                        <span>Services</span>
                    </NavLink>
                    <NavLink href="/admin/orders">
                        <ListOrderedIcon className="stroke-1 size-6" />
                        <span>Orders</span>
                    </NavLink>
                    <NavLink href="/admin/bookings">
                        <BookAIcon className="stroke-1 size-6" />
                        <span>Bookings</span>                    
                    </NavLink>
                </main>
                <footer>
                    <NavLink href="/sign-out">
                        <LogOutIcon className="stroke-1 size-6"/>
                        <span>Sign Out</span>
                    </NavLink>
                </footer>
            </div>
            <div className="flex flex-col flex-auto h-full overflow-hidden divide-y">
                <div className="flex items-center justify-end flex-none w-full h-12 px-3">

                </div>
                <main className="flex-auto w-full overflow-hidden">
					{props.children}
				</main>
            </div>
        </div>
    )
}