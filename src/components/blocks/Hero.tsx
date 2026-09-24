import { Button } from "@ui/button"

export function Hero() {
  return (
    <section className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-background">
      <div className="container px-4 md:px-6">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-foreground">
              Welcome to Shadcnblocks on Astro
            </h1>
            <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
              This is a React component built with Shadcn UI, running perfectly on Astro with Tailwind v4!
            </p>
          </div>
          <div className="space-x-4">
            <Button onClick={() => alert("Hydration works!")}>Get Started</Button>
            <Button variant="outline">Learn More</Button>
          </div>
        </div>
      </div>
    </section>
  )
}
