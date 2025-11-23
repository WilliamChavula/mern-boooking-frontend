import { useLogoutApiHandler } from "@/api/users.api";
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { User, LogOut } from "lucide-react"
import { Link } from "react-router"

export function SignInMobileNavMenu() {
  const logOutUserHandler = useLogoutApiHandler();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="lg:hidden" asChild>
        <Button variant="ghost" size="icon" className="size-8 rounded-full flex items-center justify-center">
          <User className="mr-2 size-6 text-white" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="start">
        <DropdownMenuLabel className="sr-only">My Bookings</DropdownMenuLabel>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <Link to="/my-bookings">My Bookings</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Link to="/my-hotels">My Hotels</Link>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Button
              variant="ghost"
              onClick={() => logOutUserHandler()}
              className="flex has-[>svg]:px-0 gap-2 px-0 bg-white/80 rounded-none hover:bg-gray-100 text-slate-900 text-sm md:text-base cursor-pointer"
            >
              Sign out <LogOut className="size-4" />
            </Button>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
