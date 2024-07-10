import { cn } from "../../utils/utils";

export default function GridWrapper({ children, className }) {
      return (<>
            <div className={cn("grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 lg:gap-x-12 lg:gap-y-12 gap-x-10 gap-y-10", className)}>{children}</div>
      </>)
}