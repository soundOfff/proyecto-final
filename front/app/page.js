import Navbar from "./components/navbar";

export default function Home() {
  return (
    <main>
      <Navbar />
      <section className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-3xl">Hello World</h1>
      </section>
    </main>
  );
}
