import dynamic from "next/dynamic";
import { FC } from "react";

type Props = {
  children: React.ReactNode;
};
const NoSsr: FC<Props> = ({ children }) => <>{children}</>;

export default dynamic(() => Promise.resolve(NoSsr), {
  ssr: false,
});
