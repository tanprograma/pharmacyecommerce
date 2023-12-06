import React from "react";
interface Props {
  params: { name: string };
}
const page = async ({ params: { name } }: Props) => {
  return <div>page name:{name}</div>;
};

export default page;
