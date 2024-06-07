import { CreditsProvider } from "@/Components/CreditsProvider";
import LandingComponent from "@/Components/LandingComponent";
import Status from "@/Components/Status";
import { raleway } from '@/app/layout'


export default function Home() {

  return (
    <>
      <CreditsProvider>
        <Status />
      </CreditsProvider>
      <LandingComponent classname={raleway.className}/>
    </>
  );
}
