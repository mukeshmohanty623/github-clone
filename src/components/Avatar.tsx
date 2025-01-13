import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";


type WrappedAvatarProps = {
    imageSource: string;
    fallbackValue: string;
    imageAlt: string;
    className:string;
}

export function WrappedAvatar({
  imageSource,
  fallbackValue,
  imageAlt,
  className
}: WrappedAvatarProps) {
  return (
    <Avatar className={className}>
      <AvatarImage src={imageSource} alt={imageAlt}/>
      <AvatarFallback >{fallbackValue}</AvatarFallback>
    </Avatar>
  );
}
