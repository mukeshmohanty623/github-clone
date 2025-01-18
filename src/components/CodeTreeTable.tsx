import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { File, Folder, History } from "lucide-react";
import { WrappedAvatar } from "./Avatar";
import { Button } from "./ui/button";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);
export type CodeTreeRow = {
  type: "file" | "folder";
  fileName: string;
  commitMessage: string;
  commitMessageUrl: string;
  prId: string;
  lastModified: string;
};

export type CodeTreeTableProps = {
  rows: CodeTreeRow[];
  branchName: string;
  repoUrl: string;
  lastCommitMessage: string;
  lastCommitMessageUrl: string;
  lastCommitid: string;
  lastCommitModifiedTime: string;
  totalCommits: string;
  lastCommitAuthorName: string;
  lastCommitAuthorImageSrcUrl: string;
  lastCommitPrId: string;
};

export function CodeTreeTable({
  rows,
  branchName,
  repoUrl,
  lastCommitMessage,
  lastCommitMessageUrl,
  lastCommitPrId,
  lastCommitid,
  lastCommitModifiedTime,
  totalCommits,
  lastCommitAuthorName,
  lastCommitAuthorImageSrcUrl,
}: CodeTreeTableProps) {
  return (
    <div className="rounded-md border-2 w-full">
      <Table>
        <TableHeader className="bg-gray-100">
          <TableRow className="border-none rounded-md">
            <TableHead className="w-[150px] sm:w-[150px] md:w-[180px] lg:w-[255px] xl:w-[355px] h-0"></TableHead>
            <TableHead className="w-136px lg:w-[245px] xl:w-[400px] md:w-[140px] h-0 hidden md:table-cell"></TableHead>
            <TableHead className="text-right sm:w-[136px] w-[136px] h-0"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow className="bg-gray-100 hover:bg-gray-100 border-none rounded-md">
            <TableCell colSpan={3}>
              <div className="flex justify-between items-center w-full">
                {/* <div className="flex items-center w-full"> */}
                  <WrappedAvatar
                    imageSource={lastCommitAuthorImageSrcUrl}
                    imageAlt={"profile_image"}
                    className="w-10 h-10 rounded-full"
                    fallbackValue={lastCommitAuthorName[0]}
                  />
                  <h5 className="font-bold mx-2">{lastCommitAuthorName}</h5>
                  <h5 title={lastCommitMessage} className="text-ellipsis truncate max-w-fit hidden md:inline hover:underline hover:text-[#0969DA]">
                    <a href={lastCommitMessageUrl}>
                      {lastCommitMessage}
                      {"("}
                      <a href={`${repoUrl}/pull/${lastCommitPrId}`}>
                        #{lastCommitPrId}
                      </a>
                      {")"}
                    </a>
                  </h5>

                {/* </div> */}
                <div className="flex items-center w-full justify-end gap-1">
                  <a href={lastCommitMessageUrl} className="hidden md:inline hover:underline hover:text-[#0969DA]">{lastCommitid}</a>
                  <span className="hidden md:inline mx-1">.</span>
                  <h5
                    title={dayjs(lastCommitModifiedTime).format(
                      "MMM DD, YYYY, hh:mm A [GMT]Z"
                    )}
                    className="hidden md:inline"
                  >
                    {dayjs().to(dayjs(lastCommitModifiedTime))}
                  </h5>
                  <a href={`${repoUrl}/commit/${branchName}`}>
                    <Button variant={"ghost"} className="hover:bg-gray-200">
                      <History size={1} />
                      <span className="hidden md:inline">{totalCommits} Commits</span>
                    </Button>
                  </a>
                </div>
              </div>
            </TableCell>
          </TableRow>
          {rows.map((row) => {
            return (
              <TableRow>
                <TableCell>
                  <div className="flex items-center gap-1">
                    {row.type == "file" ? (
                      <File size={20} />
                    ) : (
                      <Folder size={20} fill="rgb(84, 174, 255)" color="rgb(84, 174, 255)"/>
                    )}
                    <a
                      href={
                        row.type == "file"
                          ? `${repoUrl}/tree/blob/${branchName}/${row.fileName}`
                          : `${repoUrl}/tree/${branchName}/${row.fileName}`
                      }
                    >
                      <h5
                        title={row.fileName}
                        className="truncate w-[120px] sm:w-[135px] md:w-[165px] lg:w-[240px] xl:w-[340px]  hover:underline hover:text-[#0969DA]"
                      >
                        {row.fileName}
                      </h5>
                    </a>
                  </div>
                </TableCell>
                <TableCell className="md:table-cell hidden">
                  <h5
                    title={row.commitMessage}
                    className="truncate w-140px md:w-[140px] lg:w-[245px] xl:w-[400px]"
                  >
                    <a href={row.commitMessageUrl} className="hover:underline hover:text-[#0969DA]">
                    {row.commitMessage}
                      {"("}
                      <a href={`${repoUrl}/pull/${row.prId}`} className="hover:underline text-[#0969DA]">#{row.prId}</a>
                      {")"}
                    </a>
                  </h5>
                </TableCell>
                <TableCell>
                  <h5
                    title={dayjs(row.lastModified).format(
                      "MMM DD, YYYY, hh:mm A Z"
                    )}
                    className="text-right w-[135px]"
                  >
                    {dayjs().to(dayjs(row.lastModified))}
                  </h5>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
