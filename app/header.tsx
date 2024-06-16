import { ModeToggle } from "@/components/ui/mode-toggle"
import Image from "next/image"
import HeaderActions from "./header-actions"

const Header = () => {
  return (
    <div className="py-4 bg-slate-900">
      <div className="container flex items-center justify-between mx-auto">
        <div className="flex items-center gap-4 text-2xl">
          <Image src="/logo.png" width={40} height={40} alt="BigBrain" className="rounded" />
          BigBrain
        </div>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <HeaderActions />
        </div>
      </div>
    </div>
  )
}

export default Header