
import { Button } from "@/components/ui/button";

const Home = () => {
  return (
    <>
      <div className="flex gap-4">
        <Button variant={"outline"} className="hover:cursor-pointer">
          Login
        </Button>
        <Button variant={"outline"} className="hover:cursor-pointer">
          Register
        </Button>
      </div>
    </>
  );
};

export default Home;
