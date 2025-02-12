import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

type Contributor = {
  html_url: string;
  avatar_url: string;
  login: string;
};

type ContributorsProps = {
  contributors: Contributor[];
  repoName: string;
  orgName: string;
};

export function Contributors({
  contributors,
  repoName,
  orgName,
}: ContributorsProps) {
  const isMoreThanFourteeenContributors = contributors.length > 14;
  return (
    <>
      <div className="flex flex-wrap items-center gap-2">
        {contributors.map((contributor, index) => {
          const { login, avatar_url, html_url } = contributor;
          if (index <= 14) {
            return (
              <a href={html_url} key={index}>
                <Avatar className="w-8 h-8 rounded-full">
                  <AvatarImage src={avatar_url} alt={"profileImage"} />
                  <AvatarFallback>{login[0]}</AvatarFallback>
                </Avatar>
              </a>
            );
          } else {
            <></>;
          }
        })}
      </div>
      {isMoreThanFourteeenContributors && (
        <a
          className="text-[#0969DA] underline text-sm font-medium"
          href={`/${orgName}/${repoName}/graphs/contributors`}
        >{`+ ${contributors.length - 14} contributors`}</a>
      )}
    </>
  );
}
