
import Label, { releases } from "@components/label";

const Home = () => (
  <div>
    <Label releases={releases} showAllLink={"/label"}/>
  </div>
);

export default Home;
