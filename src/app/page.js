import About from "@/components/About";
import Banner from "@/components/Banner";
import Categories from "@/components/Categories";
import Newsletter from "@/components/Newsletter";
import Trending from "@/components/Trending";

export default function Home() {
  return (
   <>
   <Banner></Banner>
   <About></About>
   <Trending></Trending>
   <Categories></Categories>
   <Newsletter></Newsletter>
   </>
  );
}
