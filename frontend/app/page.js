import Image from "next/image";
import styles from "./page.module.css";
import LandingComponent from "@/Components/LandingComponent";
import Status from "@/Components/Status";

export default function Home() {
  return (
    <>
      <Status />
      <LandingComponent />
    </>
  );
}
