import { Header, type HeaderProps } from "@/components/Header";
import { Icons } from "../icons/icons";
import { NavBar } from "../Navigation";

export default function RepoPageLayout({
  children,
  headerData,
}: {
  headerData: HeaderProps;
  children: React.ReactNode;
}) {
  return (
    <>
      <header className="bg-gray-100">
        <NavBar/>
        <Header {...headerData} />
      </header>
      <main className="max-w-full">{children}</main>
      <footer className="px-4 py-16">
        <div className="flex-col-reverse flex lg:flex-row flex-wrap lg:flex-nowrap items-center justify-center gap-2">
          <div className="flex items-center gap-2 justify-center">
            <a href="https://www.github.com" aria-label="github">
              {/* @ts-ignore */}
              <Icons.gitHub title="github" height={"24"} width={"24"} />
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
              href="https://support.github.com/?tags=dotcom-footer"
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
    </>
  );
}
