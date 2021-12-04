import { LoaderSizes } from "../Enums"

interface ILoaderProps {
    isInline?: boolean;
    size?: LoaderSizes;
}

export const Loader = ({ isInline = false, size = LoaderSizes.medium }: ILoaderProps) => {
    return (
        <div className={`ui ${isInline ? "inline" : ""} ${size} active loader`}></div>

    )
}
