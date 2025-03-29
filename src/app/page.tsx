// import { Button } from "@/components/ui/button";

import { GlobeDemo } from "@/components/GithubGlobe";
import { Icons } from "@/components/icons/icons";
import { NavBar } from "@/components/Navigation";
import { Button } from "@/components/ui/button";
import { TypewriterEffectSmooth } from "@/components/ui/typewriter-effect";

export default function Home() {
  return (
    <div className="min-h-screen bg-[#111341]">
      <header className="bg-gray-900 text-white">
        <NavBar className="bg-[#111341]" />
      </header>
      <main className="container mx-auto px-4 py-8">
        <section>
          <h1 className="text-6xl font-bold mb-4 text-white text-center">
            Welcome to GitHub Clone
          </h1>
          <div className="flex justify-center items-center">
            <p className="text-white  text-center  lg:max-w-[600px]">
              We’ve built a clone of the repository homepage for public
              repositories. Simply enter the repository name and organization in
              the browser search bar.
            </p>
          </div>
          <div className="flex justify-center items-center flex-wrap">
            <TypewriterEffectSmooth
              cursorClassName="xl:h-4"
              className="items-center justify-center"
              words={[
                {
                  text: `(e.g., ${process.env.HOST}/facebook/react)`,
                  className: "text-[#79C0FF]",
                },
              ]}
            />
            <a href="/facebook/react">
              <Button
                variant={"outline"}
                className="hover:bg-inherit hover:text-gray-200 bg-inherit text-white ml-4"
                size={"xsm"}
              >
                Click here
              </Button>
            </a>
          </div>
          <GlobeDemo />
        </section>
      </main>
      <footer className="px-4 py-16 text-white">
        <div className="flex-col-reverse flex lg:flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-2">
          <div className="flex items-center gap-2 justify-center">
            <a href="https://www.github.com" aria-label="github">
              <Icons.gitHub
                title="github"
                // @ts-expect-error
                height={"24"}
                width={"24"}
                fill="white"
              />
            </a>
            <span className="text-xs">© 2025 GitHub, Inc.</span>
          </div>
          <div className="flex items-center gap-2 flex-wrap justify-center">
            <a
              href="https://docs.github.com/site-policy/github-terms/github-terms-of-service"
              aria-label="github"
              className="text-xs hover:underline hover:text-blue-600"
            >
              Terms
            </a>
            <a
              href="https://docs.github.com/site-policy/privacy-policies/github-privacy-statement"
              aria-label="github"
              className="text-xs hover:underline hover:text-blue-600"
            >
              Privacy
            </a>
            <a
              href="https://github.com/security"
              aria-label="github"
              className="text-xs hover:underline hover:text-blue-600"
            >
              Security
            </a>
            <a
              href="https://www.githubstatus.com/"
              aria-label="github"
              className="text-xs hover:underline hover:text-blue-600"
            >
              Status
            </a>
            <a
              href="https://docs.github.com/"
              aria-label="github"
              className="text-xs hover:underline hover:text-blue-600"
            >
              Docs
            </a>
            <a
              href="https://mukesh-mohanty.vercel.app"
              aria-label="github"
              className="text-xs hover:underline hover:text-blue-600"
            >
              Contact
            </a>
            {/*TODO: Implemet Dialog box for cookies and  Do not share my personal information*/}
            <a
              href="#"
              aria-label="github"
              className="text-xs hover:underline hover:text-blue-600"
            >
              Manage cookies
            </a>
            <a
              href="#"
              aria-label="github"
              className="text-xs hover:underline hover:text-blue-600"
            >
              Do not share my personal information
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
