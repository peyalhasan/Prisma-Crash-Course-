import { getPins } from "./actions";
import PinClient from "./PinClient";

export default async function Home() {
  const pins = await getPins();
  return <PinClient pins={pins} />;
}
