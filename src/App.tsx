import { Button } from '@/components/atoms/button';

function App() {
  return (
    <section className="bg-background h-screen">
      <div className="container mx-auto bg-resd-400 h-full">
        <h1 className="text-3xl font-bold text-center py-4">Data Structures & Algorithms</h1>
        <div className="flex justify-center gap-4">
          <Button type="button">Load Algorithms</Button>
          <Button type="button" variant="secondary">
            Load Data Structures
          </Button>
        </div>
      </div>
    </section>
  );
}

export default App;
