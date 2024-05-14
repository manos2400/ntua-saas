import Image from "next/image";
import styles from "./page.module.css";
import LandingComponent from "@/Components/LandingComponent";
import Status from "@/Components/Status";
import { raleway } from '@/app/layout'


export default function Home() {
  return (
    <>
      <Status />
      <LandingComponent classname={raleway.className}/>
    </>
  );
}
