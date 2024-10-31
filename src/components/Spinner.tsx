import { FC } from "react";

interface SpinnerProps {}

const Spinner: FC<SpinnerProps> = ({}) => (
    <>
        <div className="border-gray-300 h-8 w-8 animate-spin rounded-full border-8 border-t-blue-600" />
    </>
)
export default Spinner